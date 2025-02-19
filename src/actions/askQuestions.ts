"use server";

import { Message } from "@/components/Chat";
import { auth } from "@clerk/nextjs/server";
import { serverTimestamp } from "firebase/firestore";
import { generateLangchainCompletion } from "@/lib/langchain";
import { getChatRef } from "@/lib/firebase/firebaseFunctions";

// const FREE_LIMIT = 3;
// const PRO_LIMIT = 100;

export const askQuestion = async (id: string, question: string) => {
  auth.protect();

  const { userId } = await auth();
  const chatRef = getChatRef(userId!, id);

  //   const chatSnapShot = await chatRef.get();
  //   const userMessages = chatSnapShot.docs.filter(
  //     (doc) => (doc.data().role = "human")
  //   );

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: serverTimestamp(),
  };
  await chatRef.add(userMessage);

  const reply = await generateLangchainCompletion(id, question);

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: serverTimestamp(),
  };
  await chatRef.add(aiMessage);

  return { success: true, message: null };
};
