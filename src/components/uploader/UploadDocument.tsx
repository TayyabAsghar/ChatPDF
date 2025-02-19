"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2, PlusCircleIcon, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => !isUploading && setOpen(state)}
      >
        <DialogTrigger asChild>
          {props.buttonType === "text" ? (
            <Button
              title="Upload"
              variant="outline"
              className="flex flex-col items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400
               hover:bg-gray-700 hover:text-white"
            >
              <PlusCircleIcon className="!size-12" />
              <p>{props.buttonText}</p>
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
    </>
  );
};

export default UploadDocument;
