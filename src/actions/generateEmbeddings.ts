"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateEmbeddingsInPinecone } from "@/lib/langchain";

const GenerateEmbeddings = async (fileId: string) => {
  auth.protect();

  await generateEmbeddingsInPinecone(fileId);

  revalidatePath("/dashboard");

  return { completed: true };
};

export default GenerateEmbeddings;
