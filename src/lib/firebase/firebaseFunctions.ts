import { Message } from "@/components/Chat";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { WhereFilterOp } from "firebase-admin/firestore";

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

export const getUserByProperty = async (
  userId: string,
  property: string,
  operator: WhereFilterOp
) => {
  const userSnapshot = await adminDb
    .collection("users")
    .where(property, operator, userId)
    .limit(1)
    .get();

  if (!userSnapshot.empty) return userSnapshot.docs[0];
};

export const setUserData = async (
  userId: string,
  data: Record<string, string>
) => {
  await adminDb.collection("users").doc(userId).set(data);
};

export const updateUserData = async (
  userId: string,
  data: Record<string, string | boolean>
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
