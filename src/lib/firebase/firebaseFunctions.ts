import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { SetOptions, WhereFilterOp } from "firebase-admin/firestore";

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
  data: Record<string, string>,
  options: SetOptions = {}
) => {
  await adminDb.collection("users").doc(userId).set(data, options);
};

export const updateUserData = async (
  userId: string,
  data: Record<string, string | boolean>,
  options: SetOptions = {}
) => {
  await adminDb.collection("users").doc(userId).set(data, options);
};

export const getChatRef = (userId: string, fileId: string) => {
  return adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(fileId)
    .collection("chat");
};

export const deleteDocument = async (userId: string, fileId: string) => {
  adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(fileId)
    .delete();
};
