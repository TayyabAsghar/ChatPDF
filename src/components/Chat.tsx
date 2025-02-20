"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ChatMessage";
import { askQuestion } from "@/actions/askQuestions";
import { type FieldValue } from "firebase-admin/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import {
  query,
  orderBy,
  collection,
  serverTimestamp,
} from "firebase/firestore";

interface ChatProps {
  id: string;
}

export type Message = {
  id?: string;
  message: string;
  createdAt: FieldValue;
  role: "human" | "ai" | "placeholder";
};

const Chat = ({ id }: ChatProps) => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const [snapshot, loading] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    bottomOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!snapshot) return;

    const lastMessage = messages.pop();

    if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...")
      return;

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data();

      return { id: doc.id, role, message, createdAt: createdAt.toDate() };
    });

    if (JSON.stringify(newMessages) !== JSON.stringify(messages))
      setMessages(newMessages);
  }, [snapshot]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = input;

    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "human", message: q, createdAt: serverTimestamp() },
      { role: "ai", message: "Thinking...", createdAt: serverTimestamp() },
    ]);

    startTransition(async () => {
      const { success, message } = await askQuestion(id, q);

      if (!success) {
        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat([
            {
              role: "ai",
              message: `Whoops... ${message}`,
              createdAt: serverTimestamp(),
            },
          ])
        );
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="w-full flex-1">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin size-20 text-indigo-600 mt-20" />
          </div>
        ) : (
          <div className="p-5">
            {!messages.length && (
              <ChatMessage
                key="placeholder"
                message={{
                  role: "ai",
                  message: "Ask me anything about the document!",
                  createdAt: serverTimestamp(),
                }}
              />
            )}

            {messages.map((message) => (
              <ChatMessage
                message={message}
                key={message.id ?? Math.random()}
              />
            ))}

            <div ref={bottomOfChatRef}></div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-400"
      >
        <Input
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white"
        />

        <Button type="submit" disabled={!input || isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin text-indigo-600" />
          ) : (
            "Ask"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chat;
