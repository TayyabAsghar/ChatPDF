import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { PineconeStore } from "@langchain/pinecone";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { getFileDownloadUrl } from "@/lib/firebase/firebaseFunctions";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
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

export default model;
