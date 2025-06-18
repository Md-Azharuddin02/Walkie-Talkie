import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Api_key,
  api_secret: process.env.Api_secret,
});

async function uploadOnCloudinary(img, name) {
  const timestamp = Date.now();
  const publicId = `${name}-${timestamp}`;
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(img,
      { public_id: publicId}
    );

    console.log("Upload result:", uploadResult);

    // Optimized image URL
    const optimizeUrl = cloudinary.url(publicId, {
      fetch_format: "auto",
      quality: "auto",
    });
    console.log("Optimized URL:", optimizeUrl);

    // Auto-cropped square transformation
    const autoCropUrl = cloudinary.url(publicId, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });
    console.log("Auto-Cropped URL:", autoCropUrl);

    return { uploadResult, optimizeUrl, autoCropUrl };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

export {uploadOnCloudinary };
