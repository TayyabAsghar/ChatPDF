"use client";

import Link from "next/link";
import byteSize from "byte-size";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/useSubscription";
import DeleteDocument from "@/actions/DeleteDocument";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import ConfirmationDialog from "@/components/ConfirmationDialog";

interface DocumentProps {
  id: string;
  date: Date;
  url: string;
  name: string;
  size: number;
}

const Document = ({ id, date, url, name, size }: DocumentProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { hasActiveMembership } = useSubscription();
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await DeleteDocument(id);
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error While Deleting the Document!\nTry again later.",
        });
      }
    });
  };

  const TriggerButton = () => (
    <Button
      title="Delete"
      variant="outline"
      disabled={isDeleting || !hasActiveMembership}
    >
      <Trash2Icon className="size-6 text-red-500" />
      {!hasActiveMembership && (
        <span className="ml-2 text-red-500">PRO Feature</span>
      )}
    </Button>
  );

  const ConfirmationAction = () => (
    <Button title="Delete" variant="destructive" onClick={handleDelete}>
      <Trash2Icon className="size-6" />
      <span className="ml-2">Delete</span>
    </Button>
  );

  return (
    <div
      className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 
    hover:bg-indigo-600 hover:text-white cursor-pointer group"
      onClick={() => router.push(`/dashboard/files/${id}`)}
    >
      <div className="flex flex-col gap-3">
        <p className="font-semibold line-clamp-2 break-words" title={name}>
          {name}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-indigo-100">
          {date.toDateString()}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-indigo-100">
          {byteSize(size).value} KB
        </p>
      </div>

      <div className="flex space-x-2 justify-end">
        <ConfirmationDialog
          title="Delete Document"
          trigger={<TriggerButton />}
          confirmationActionType="custom"
          confirmationAction={<ConfirmationAction />}
          description="Are you sure you want to delete this document?"
        />

        <Button
          asChild
          title="Download"
          variant="outline"
          onClick={(event) => event.stopPropagation()}
        >
          <Link href={url} download>
            <DownloadCloud className="size-6 text-indigo-600" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Document;
