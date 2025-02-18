"use client";

import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { JSX, useCallback, useEffect } from "react";
import useUpload, { StatusText } from "@/hooks/useUpload";
import {
  SaveIcon,
  HammerIcon,
  RocketIcon,
  CircleArrowDown,
} from "lucide-react";

const StatusIcons: { [key in StatusText]: JSX.Element } = {
  [StatusText.SAVING]: <SaveIcon className="size-20 text-indigo-600" />,
  [StatusText.UPLOADING]: <RocketIcon className="size-20 text-indigo-600" />,
  [StatusText.GENERATING]: <HammerIcon className="size-20 text-indigo-600" />,
};

const FileUploader = () => {
  const router = useRouter();
  const { progress, status, fileId, handleUpload } = useUpload();

  useEffect(() => {
    if (fileId) router.push(`dashboard/files/${fileId}`);
  }, [fileId, router]);

  const onDrop = useCallback(async (acceptFiles: File[]) => {
    const file = acceptFiles[0];

    if (file) await handleUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: { "application/pdf": [".pdf"] },
    });

  const uploadInProgress = progress != null && progress >= 0 && progress < 100;

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center max-w-7xl mx-auto cursor-pointer"
      title="Upload PDF"
    >
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
              {uploadInProgress && status ? (
                <>
                  <>{StatusIcons[status as StatusText]}</>
                  <p className="text-indigo-600 animate-pulse">
                    {status as StatusText}
                  </p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
