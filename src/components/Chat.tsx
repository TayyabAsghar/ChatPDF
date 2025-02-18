"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { askQuestion } from "@/actions/askQuestions";
import { type FieldValue } from "firebase-admin/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import {
  collection,
  orderBy,
  query,
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

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    if (!snapshot) return;
  }, [snapshot]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = input;

    setInput("");

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
    <div className="flex flex-col h-full overflow-y-scroll">
      <div className="w-full flex-1"></div>
      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
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
