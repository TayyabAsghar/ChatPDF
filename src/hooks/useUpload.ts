"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/router";
import { db } from "@/lib/firebase/firebase";
import { compressPDF } from "@/lib/pdfCompressor";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import generateEmbeddings from "@/actions/generateEmbeddings";

export enum StatusText {
  UPLOADING = "Uploading file...",
  COMPRESSING = "Compressing PDF...",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI Embeddings, This will only take a few seconds...",
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
  // const router = useRouter();
  const { user } = useUser();
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const handleUpload = async (file: File) => {
    if (!file || !user) return;

    const uniqueFileName = `${uuidv4()}.pdf`;
    const renamedFile = new File([file], uniqueFileName, { type: file.type });

    setStatus(StatusText.COMPRESSING);
    const compressedFile = await compressPDF(renamedFile);

    setStatus(StatusText.UPLOADING);
    try {
      const downloadUrl = await uploadToCloudinary(compressedFile);
      setStatus(StatusText.SAVING);

      await saveFileUrl(compressedFile, file.name, downloadUrl, user.id);
      setStatus(StatusText.GENERATING);
      await generateEmbeddings(uniqueFileName);
      setProgress(0);
    } catch (error) {
      console.error("Upload failed", error);
      setStatus(null);
    }
  };

  const saveFileUrl = async (
    file: File,
    originalName: string,
    downloadUrl: string,
    userid: string
  ) => {
    try {
      const fileRef = doc(db, "users", userid, "files", file.name || "");
      await setDoc(fileRef, {
        name: file.name,
        size: file.size,
        type: file.type,
        url: downloadUrl,
        originalName: originalName,
        createdAt: serverTimestamp(),
      });

      setFileId(file.name);
    } catch (error) {
      console.error("Error saving file to Firestore", error);
      setStatus(null);
    }
  };

  return {
    status,
    fileId,
    progress,
    handleUpload,
  };
}

export default useUpload;
