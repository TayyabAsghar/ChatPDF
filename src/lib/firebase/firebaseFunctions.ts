import { adminDb } from "@/lib/firebase/firebaseAdmin";

export const getFileDownloadUrl = async (userId: string, fileId: string) => {
  const firebaseDocRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(fileId)
    .get();

  return firebaseDocRef.data()?.url;
};

export const getAllFilesSnapshot = async (userId: string) => {
  const filesSnapshot = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();

  return filesSnapshot;
};
