import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const buffer = Buffer.from(reader.result as ArrayBuffer);
        const stream = Readable.from(buffer);

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw", // Important for PDF uploads
            folder: "ChatPDF",
            public_id: file.name.split(".")[0],
          },
          (error, result) => {
            if (error || !result?.secure_url) return reject(error);
            resolve(result.secure_url);
          }
        );

        stream.pipe(uploadStream);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
  });
};
