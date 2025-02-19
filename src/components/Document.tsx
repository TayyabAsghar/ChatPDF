"use client";

import byteSize from "byte-size";
import { useRouter } from "next/navigation";

interface DocumentProps {
  id: string;
  name: string;
  size: number;
}

const Document = ({ id, name, size }: DocumentProps) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 
    hover:bg-indigo-600 hover:text-white cursor-pointer group"
      onClick={() => router.push(`/dashboard/files/${id}`)}
    >
      <div>
        <p className="font-semibold line-clamp-2" title={name}>
          {name}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-indigo-100">
          {byteSize(size).value} KB
        </p>
      </div>
    </div>
  );
};

export default Document;
