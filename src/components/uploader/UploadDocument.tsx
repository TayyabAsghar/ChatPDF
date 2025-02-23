"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/useSubscription";
import { FilePlus2, FrownIcon, PlusCircleIcon, X } from "lucide-react";
import DocumentUploader from "@/components/uploader/DocumentUploader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type UploadDocumentProps =
  | {
      buttonType: "text";
      buttonText: string;
    }
  | {
      buttonType: "icon";
    };

const UploadDocument = (props: UploadDocumentProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isOverFileLimit } = useSubscription();
  const [isUploading, setIsUploading] = useState(false);

  const handleDialogState = (state: boolean) =>
    !isUploading && !isOverFileLimit && setOpen(state);

  return (
    <Dialog open={open} onOpenChange={handleDialogState}>
      <DialogTrigger asChild>
        {props.buttonType === "text" ? (
          <Button
            variant="outline"
            title={isOverFileLimit ? "Upgrade" : "Upload"}
            onClick={() => isOverFileLimit && router.push("/upgrade")}
            className="flex flex-col items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400
               hover:bg-gray-700 hover:text-white"
          >
            {isOverFileLimit ? (
              <FrownIcon className="!size-12" />
            ) : (
              <PlusCircleIcon className="!size-12" />
            )}

            <p>
              {isOverFileLimit
                ? "Upgrade to add more documents."
                : props.buttonText}
            </p>
          </Button>
        ) : (
          <Button
            title="Upload"
            variant="outline"
            className="border-indigo-600"
          >
            <FilePlus2 className="text-indigo-600" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        hideClose
        autoFocus={false}
        className="max-w-xl"
        onInteractOutside={(e) => isUploading && e.preventDefault()}
      >
        <DialogClose
          asChild
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
        >
          <Button
            variant="ghost"
            disabled={isUploading}
            className="p-2 w-10 h-10 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Upload a PDF</DialogTitle>
          <DialogDescription>
            Upload a PDF file for processing.
          </DialogDescription>{" "}
        </DialogHeader>

        <DocumentUploader setIsUploading={setIsUploading} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocument;
