import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

if(!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error("Cloudinary configuration variables are missing.");
}

cloudinary.config({
  CLOUD_NAME: CLOUD_NAME,
  API_KEY: API_KEY,
  API_SECRET: API_SECRET,
});

async function uploadOnCloudinary(img, name) {
  const timestamp = Date.now();
  const publicId = `${name}-${timestamp}`;
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(img, {
      public_id: publicId,
    });

    // Optimized image URL
    const optimizeUrl = cloudinary.url(publicId, {
      fetch_format: "auto",
      quality: "auto",
    });

    // Auto-cropped square transformation
    const autoCropUrl = cloudinary.url(publicId, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    return { uploadResult, optimizeUrl, autoCropUrl };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

export { uploadOnCloudinary };
