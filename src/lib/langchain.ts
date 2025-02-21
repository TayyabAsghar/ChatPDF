import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "./firebase/firebaseAdmin";
import { PineconeStore } from "@langchain/pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { getFileDownloadUrl } from "@/lib/firebase/firebaseFunctions";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

export const indexName = "chat-pdf-google";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "gemini-1.5-flash",
});

const nameSpaceExists = async (
  index: Index<RecordMetadata>,
  namespace: string
) => {
  if (!namespace) throw new Error("No namespace value provided.");
  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
};

const generateSplitDocs = async (fileId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const downloadUrl = await getFileDownloadUrl(userId, fileId);
  if (!downloadUrl) throw new Error("PDF url not found.");

  const response = await fetch(downloadUrl);
  const blob = await response.blob();

  const docs = await new PDFLoader(blob).load();
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);
  return splitDocs;
};

const fetchMessagesFromDB = async (docId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const chatRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .collection("chat")
    .orderBy("createdAt", "asc")
    .get();

  const chatHistory = chatRef.docs.map((doc) => {
    return doc.data().role === "human"
      ? new HumanMessage(doc.data().message)
      : new AIMessage(doc.data().message);
  });

  return chatHistory;
};

export const generateEmbeddingsInPinecone = async (fileId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  let pineconeVectorStore;
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "models/text-embedding-004",
  });

  const index = pineconeClient.index(indexName);
  const nameSpaceAlreadyExists = await nameSpaceExists(index, fileId);

  if (nameSpaceAlreadyExists) {
    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: fileId,
    });
  } else {
    const splitDocs = await generateSplitDocs(fileId);

    pineconeVectorStore = await PineconeStore.fromDocuments(
      splitDocs,
      embeddings,
      { pineconeIndex: index, namespace: fileId }
    );
  }

  return pineconeVectorStore;
};

export const generateLangchainCompletion = async (
  docId: string,
  question: string
) => {
  const pineconeVectorStore = await generateEmbeddingsInPinecone(docId);

  if (!pineconeVectorStore) throw new Error("Pinecone vector store not found.");

  const retriever = pineconeVectorStore.asRetriever();
  const chatHistory = await fetchMessagesFromDB(docId);

  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ...chatHistory,
    ["user", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in the order to get information relevant to the conversation.",
    ],
  ]);
  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user's question based on the below context:\n\n {context} ",
    ],
    ...chatHistory,
    ["user", "{input}"],
  ]);
  const historyAwareCombineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: historyAwareRetrievalPrompt,
  });

  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrieverChain,
    combineDocsChain: historyAwareCombineDocsChain,
  });

  const reply = await conversationalRetrievalChain.invoke({
    chat_history: chatHistory,
    input: question,
  });

  return reply.answer;
};

export const deleteDocumentIndex = async (docId: string) => {
  const index = pineconeClient.index(indexName);
  await index.namespace(docId).deleteAll();
};

export default model;
