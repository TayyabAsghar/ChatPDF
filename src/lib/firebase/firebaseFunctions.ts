import { Message } from "@/components/Chat";
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

export const addMessageToChat = async (
  userId: string,
  id: string,
  message: Message
) => {
  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .collection("chat")
    .add(message);
};
