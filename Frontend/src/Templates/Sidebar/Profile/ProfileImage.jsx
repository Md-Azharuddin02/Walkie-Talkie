// client/src/components/ProfileImage.jsx
import React, { useRef, useState, useEffect } from "react";

/**
 * Props:
 *   • profileFile: File | null       ← the actual File object (to append to FormData)
 *   • setProfileFile: (file: File)   ← setter for the File object
 * 
 * We also keep a “previewUrl” for displaying the chosen image.
 */
const ProfileImage = ({ profileFile, setProfileFile }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(
    "/default_user_dummy.png" // replace with your dummy asset path
  );

  // Whenever `profileFile` changes, generate a preview URL:
  useEffect(() => {
    if (!profileFile) {
      // Reset to default if no file
      setPreviewUrl("/default_user_dummy.png");
      return;
    }
    // Create an object URL for preview
    const objectUrl = URL.createObjectURL(profileFile);
    setPreviewUrl(objectUrl);

    // Revoke on cleanup (avoid memory leaks)
    return () => URL.revokeObjectURL(objectUrl);
  }, [profileFile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Store the actual File object in state
      setProfileFile(file);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <img
        src={previewUrl}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover cursor-pointer"
        onClick={handleImageClick}
        title="Click to upload a new photo"
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImage;
