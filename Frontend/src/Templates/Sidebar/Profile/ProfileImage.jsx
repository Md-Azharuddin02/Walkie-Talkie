import React, { useRef, useState, useEffect } from "react";
import dummy from "../../../assets/images/dummy.avif";

const ProfileImage = ({ profileFile, setProfileFile, user }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(dummy);

  useEffect(() => {
    if (!profileFile || !(profileFile instanceof File)) {
      setPreviewUrl(user?.profileImage || dummy);
      return;
    }

    const objectUrl = URL.createObjectURL(profileFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profileFile, user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfileFile(file);
    } else {
      alert("Please select a valid image file.");
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
