"use client";

import Link from "next/link";
import byteSize from "byte-size";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/useSubscription";
import DeleteDocument from "@/actions/DeleteDocument";

interface DocumentProps {
  id: string;
  url: string;
  name: string;
  size: number;
}

const Document = ({ id, name, size, url }: DocumentProps) => {
  const router = useRouter();
  const { hasActiveMembership } = useSubscription();
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = () => {
    const prompt = window.confirm(
      "Are you sure you want to delete this document."
    );

    if (prompt) {
      startTransition(async () => {
        await DeleteDocument(id);
      });
    }
  };

  return (
    <div
      className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 
    hover:bg-indigo-600 hover:text-white cursor-pointer group"
      onClick={() => router.push(`/dashboard/files/${id}`)}
    >
      <div>
        <p className="font-semibold line-clamp-2 break-words" title={name}>
          {name}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-indigo-100">
          {byteSize(size).value} KB
        </p>
      </div>

      <div className="flex space-x-2 justify-end">
        <Button
          title="Delete"
          variant="outline"
          onClick={handleDelete}
          disabled={isDeleting || !hasActiveMembership}
        >
          <Trash2Icon className="size-6 text-red-500" />
          {!hasActiveMembership && (
            <span className="ml-2 text-red-500">PRO Feature</span>
          )}
        </Button>

        <Button variant="outline" asChild title="Download">
          <Link href={url} download>
            <DownloadCloud className="size-6 text-indigo-600" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Document;
