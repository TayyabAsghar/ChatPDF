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
  return await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();
};

export const getUserData = async (userId: string) => {
  const userSnapshot = await adminDb.collection("users").doc(userId).get();
  return userSnapshot.data();
};

export const setUserData = async (
  userId: string,
  data: Record<string, string>
) => {
  await adminDb.collection("users").doc(userId).set(data);
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
