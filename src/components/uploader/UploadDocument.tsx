"use client";

import { useState } from "react";
import FileUploader from "./DocumentUploader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FilePlus2, PlusCircleIcon } from "lucide-react";

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
               hover:bg-gray-200 hover:border-indigo-600 hover:text-indigo-600"
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
          autoFocus={false}
          className="max-w-xl"
          onInteractOutside={(e) => isUploading && e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Upload a PDF</DialogTitle>
            <DialogDescription>
              Upload a PDF file for processing.
            </DialogDescription>{" "}
          </DialogHeader>

          <FileUploader setIsUploading={setIsUploading} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadDocument;
