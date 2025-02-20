"use client";

import Image from "next/image";
import Markdown from "react-markdown";
import { useUser } from "@clerk/nextjs";
import { Message } from "@/components/Chat";
import { BotIcon, Loader2Icon } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { user } = useUser();
  const isHuman = message.role === "human";

  return (
    <div className={`chat ${isHuman ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="size-10 rounded-full">
          {isHuman ? (
            user?.imageUrl && (
              <Image
                src={user?.imageUrl}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            )
          ) : (
            <div className="size-10 bg-indigo-600 flex items-center justify-center">
              <BotIcon className="size-7 text-white" />
            </div>
          )}
        </div>
      </div>

      <div
        className={`chat-bubble prose ${isHuman && "bg-indigo-600 text-white"}`}
      >
        {message.message === "Thinking..." ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin h-5 w-5 text-white" />
          </div>
        ) : (
          <Markdown>{message.message}</Markdown>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
