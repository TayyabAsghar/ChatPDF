"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

const UploadDocument = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/upload");
  };

  return (
    <Button
      className="flex flex-col items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
      onClick={handleClick}
    >
      <PlusCircleIcon className="!size-12" />
      <p>App a Document</p>
    </Button>
  );
};

export default UploadDocument;
