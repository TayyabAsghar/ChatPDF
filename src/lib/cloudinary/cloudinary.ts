import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export const deleteFromCloudinary = async (publicId: string) => {
  if (!publicId) throw new Error("Public ID is required.");

  const response = await cloudinary.uploader.destroy(publicId, {
    type: "upload",
    resource_type: "image",
  });

  if (response.result !== "ok")
    throw new Error(
      `Failed to delete file from Cloudinary. Error: ${response}`
    );
};
