"use server";

import { Message } from "@/components/Chat";
import { auth } from "@clerk/nextjs/server";
import { FieldValue } from "firebase-admin/firestore";
import { generateLangchainCompletion } from "@/lib/langchain";
import { addMessageToChat } from "@/lib/firebase/firebaseFunctions";

// const FREE_LIMIT = 3;
// const PRO_LIMIT = 100;

export const askQuestion = async (id: string, question: string) => {
  auth.protect();

  const { userId } = await auth();

  //   const chatSnapShot = await chatRef.get();
  //   const userMessages = chatSnapShot.docs.filter(
  //     (doc) => (doc.data().role = "human")
  //   );

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: FieldValue.serverTimestamp(),
  };

  await addMessageToChat(userId!, id, userMessage);

  const reply = await generateLangchainCompletion(id, question);

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: FieldValue.serverTimestamp(),
  };

  await addMessageToChat(userId!, id, aiMessage);

  return { success: true, message: null };
};
