"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/firebase/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import generateEmbeddings from "@/actions/generateEmbeddings";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export enum StatusText {
  UPLOADING = "Uploading file...",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI Embeddings, This will only take a few seconds...",
}

export type Status = StatusText[keyof StatusText];

const useUpload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState<number>(0);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const handleUpload = async (file: File) => {
    if (!file || !user) return;

    const uniqueFileName = `${uuidv4()}.pdf`;
    const renamedFile = new File([file], uniqueFileName, { type: file.type });

    try {
      setStatus(StatusText.UPLOADING);
      const downloadUrl = await uploadToCloudinary(renamedFile);

      setStatus(StatusText.SAVING);
      await saveFileUrl(renamedFile, file.name, downloadUrl, user.id);

      setStatus(StatusText.GENERATING);
      await generateEmbeddings(uniqueFileName);

      setProgress(100);
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
};

export default useUpload;
