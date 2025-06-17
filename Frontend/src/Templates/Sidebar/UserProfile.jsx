// client/src/components/ProfileCard.jsx
import React, { useState } from "react";
import ProfileImage from "./Profile/ProfileImage";
import ProfileName from "./Profile/Username";
import ProfileAbout from "./Profile/About";

export default function ProfileCard() {
  // (1) Keep a File | null for the actual file
  const [profileFile, setProfileFile] = useState(null);

  // (2) Keep name + about in a single object
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    about: "Hey there! I am using Walkie-Talkie",
  });

  // (3) Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // 1. Must have selected a File before submitting
    if (!profileFile) {
      alert("Please select a profile image first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", updateProfile.name);
      formData.append("about", updateProfile.about);
      // append the actual File object, not a base64 string:
      formData.append("image", profileFile);

      const response = await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
        // NOTE: Do NOT set Content-Type manually! Let the browser set
        //      "multipart/form-data; boundary=----..."
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);

      // You could show a “Success” UI here if you want
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Update failed: " + err.message);
    } finally {
      // (4) Reset form if you want:
      setUpdateProfile({
        name: "",
        about: "Hey there! I am using Walkie-Talkie",
      });
      setProfileFile(null);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ml-3 w-full h-full bg-gray-100 max-w-md mx-auto py-10 flex flex-col gap-7 border-l-1 border-gray-300">
      <h2 className="text-2xl font-semibold text-left mb-4 ml-5">Profile</h2>

      {/* (1) ProfileImage receives and sets the actual File object */}
      <ProfileImage
        profileFile={profileFile}
        setProfileFile={setProfileFile}
      />

      {/* (2) Text fields */}
      <ProfileName
        updateProfile={updateProfile}
        setUpdateProfile={setUpdateProfile}
      />
      <ProfileAbout
        updateProfile={updateProfile}
        setUpdateProfile={setUpdateProfile}
      />

      <div className="w-full py-3 flex justify-center">
        <button
          className="w-1/2 py-3 bg-green-800 text-sky-50 rounded-md"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
