// client/src/components/ProfileImage.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import dummy from "../../../assets/images/dummy.avif";

const ProfileImage = ({ profileFile, setProfileFile, user }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(dummy);

  useEffect(() => {
    if (!profileFile) {
      setPreviewUrl(dummy);
      return;
    }

    const objectUrl = URL.createObjectURL(profileFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profileFile]);

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file?.type?.startsWith("image/")) {
      setProfileFile(file);
    }
  };

  const imageSrc = user?.profileImage || previewUrl;

  return (
    <div className="flex justify-center mt-4">
      <img
        src={imageSrc}
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
