"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { deleteDocumentIndex } from "@/lib/langchain";
import { deleteDocument } from "@/lib/firebase/firebaseFunctions";
import { deleteFromCloudinary } from "@/lib/cloudinary/cloudinary";

const DeleteDocument = async (fileId: string) => {
  auth.protect();

  const { userId } = await auth();

  await Promise.all([
    deleteDocumentIndex(fileId),
    deleteFromCloudinary(fileId),
    deleteDocument(userId!, fileId),
  ]);

  revalidatePath("/dashboard");
};

export default DeleteDocument;
