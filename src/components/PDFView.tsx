"use client";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2Icon, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();
interface PDFViewProps {
  url: string;
}

const PDFView = ({ url }: PDFViewProps) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      const response = await fetch(url);
      const file = await response.blob();
      setFile(file);
    };

    fetchPDF();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) =>
    setPageCount(numPages);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="sticky top-0 z-50 bg-gray-100 p-2 rounded-b-lg">
        <div className="max-w-6xl px-2 grid grid-col-6 gap-2">
          <Button
            variant="outline"
            disabled={pageNumber === 1}
            onClick={() => {
              if (pageNumber > 1) setPageNumber((num) => num - 1);
            }}
          >
            Prev
          </Button>

          <p className="flex items-center justify-center">
            {pageNumber} of {pageCount}
          </p>

          <Button
            variant="outline"
            disabled={pageCount < 1 || pageNumber === pageCount}
            onClick={() => {
              if (pageCount > 1 && pageNumber < pageCount)
                setPageNumber((num) => num + 1);
            }}
          >
            Next
          </Button>

          <Button
            variant="outline"
            onClick={() => setRotation((rotation + 90) % 360)}
          >
            <RotateCcw />
          </Button>

          <Button
            variant="outline"
            disabled={scale >= 1.5}
            onClick={() => setScale(scale * 1.2)}
          >
            <ZoomIn />
          </Button>

          <Button
            variant="outline"
            disabled={scale <= 0.75}
            onClick={() => setScale(scale / 1.2)}
          >
            <ZoomOut />
          </Button>
        </div>
      </div>
      {file ? (
        <Document
          file={file}
          loading={null}
          className="m-4 overflow-scroll"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page className="shadow-lg" scale={scale} pageNumber={pageNumber} />
        </Document>
      ) : (
        <Loader2Icon className="animate-spin size-20 text-indigo-600 mt-20" />
      )}
    </div>
  );
};

export default PDFView;
