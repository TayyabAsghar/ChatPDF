"use server"

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const generateEmbeddings = async (fileId: string) => {
    auth.protect();

    await generateEmbeddingsInPineconeVectorStore(fileId);

    revalidatePath("/dashboard");

    return {completed: true};
}

export default generateEmbeddings;