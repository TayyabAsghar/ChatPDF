"use client";

import { CircleArrowDown, RocketIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const onDrop = useCallback((acceptFiles: File[]) => {
    console.log(acceptFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({ onDrop });

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-7xl mx-auto">
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
