import pineconeClient from "./pinecone";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "./firebase/firebaseAdmin";
import { PineconeStore } from "@langchain/pinecone";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o",
});

export const indexName = "chat-pdf";

const nameSpaceExists = async (
  index: Index<RecordMetadata>,
  namespace: string
) => {
  if (namespace === null) throw new Error("No name space value provided.");
  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
};

const generateSplitDocs = async (fileId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  const firebaseDocRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(fileId)
    .get();
  const downloadUrl = firebaseDocRef.data()?.url;

  if (!downloadUrl) throw new Error("PDF url not found.");

  const response = await fetch(downloadUrl);
  const blob = await response.blob();
  const docs = await new PDFLoader(blob).load();
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);

  return splitDocs;
};

export const generateEmbeddingsInPinecone = async (fileId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  let pineconeVectorStore;

  const embeddings = new OpenAIEmbeddings();
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

export default model;
