"use server";

import { Message } from "@/components/Chat";
import { auth } from "@clerk/nextjs/server";
import { FieldValue } from "firebase-admin/firestore";
import { generateLangchainCompletion } from "@/lib/langchain";
import { CHAT_FREE_LIMIT, CHAT_PRO_LIMIT } from "@/lib/constants/limits";
import { getChatRef, getUserData } from "@/lib/firebase/firebaseFunctions";

const AskQuestion = async (fileId: string, question: string) => {
  auth.protect();

  const { userId } = await auth();

  const chatRef = getChatRef(userId!, fileId);

  const [userData, chatSnapShot] = await Promise.all([
    getUserData(userId!),
    getChatRef(userId!, fileId).get(),
  ]);

  const userMessages = chatSnapShot.docs.filter(
    (doc) => doc.data().role === "human"
  );

  if (!userData?.hasActiveMembership && userMessages.length >= CHAT_FREE_LIMIT)
    return {
      success: false,
      message: `You'll need to upgrade to PRO to ask more than ${CHAT_FREE_LIMIT} questions!`,
    };

  if (userData?.hasActiveMembership && userMessages.length >= CHAT_PRO_LIMIT)
    return {
      success: false,
      message: `You've reached the PRO limit of ${CHAT_FREE_LIMIT} questions per document!`,
    };

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: FieldValue.serverTimestamp(),
  };

  await chatRef.add(userMessage);

  const reply = await generateLangchainCompletion(fileId, question);

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: FieldValue.serverTimestamp(),
  };

  await chatRef.add(aiMessage);

  return { success: true, message: null };
};

export default AskQuestion;
