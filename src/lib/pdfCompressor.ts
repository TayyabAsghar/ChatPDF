import { PDFDocument } from "pdf-lib";

export const compressPDF = async (file: File): Promise<File> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const pdfDoc = await PDFDocument.load(reader.result as ArrayBuffer);
        
        pdfDoc.setTitle(file.name);
        pdfDoc.setProducer("pdf-lib Compressor");
        
        const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

        const compressedFile = new File([compressedPdfBytes], file.name, {
          type: "application/pdf",
        });

        resolve(compressedFile);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
  });
};
