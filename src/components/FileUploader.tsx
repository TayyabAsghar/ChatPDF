"use client";

import { useRouter } from "next/router";
import useUpload from "@/hooks/useUpload";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect } from "react";
import { CircleArrowDown, RocketIcon } from "lucide-react";

const FileUploader = () => {
  const router = useRouter();
  const { progress, status, fileId, handleUpload } = useUpload();

  useEffect(() => {
    if (fileId) router.push(`dashboard/files/${fileId}`);
  }, [fileId, router]);

  const onDrop = useCallback(async (acceptFiles: File[]) => {
    const file = acceptFiles[0];

    if (file) {
      await handleUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: { "application/pdf": [".pdf"] },
    });

  const uploadInProgress = progress != null && progress >= 0 && progress < 100;

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-7xl mx-auto">
      {uploadInProgress ? <></> : <></>}
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 text-indigo-600 rounded-lg h-96 flex items-center 
            justify-center ${
              isFocused || isDragAccept ? "bg-indigo-300" : "bg-indigo-100"
            }`}
      >
        <input {...getInputProps()} />{" "}
        <div className="flex flex-col items-center justify-center">
          {isDragActive ? (
            <>
              <RocketIcon className="size-20 animate-ping" />
              <p>Drop File Here</p>
            </>
          ) : (
            <>
              <CircleArrowDown className="size-20 animate-bounce" />
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
