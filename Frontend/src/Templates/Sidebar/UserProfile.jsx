// client/src/components/ProfileCard.jsx
import React, { useContext, useState } from "react";
import ProfileImage from "./Profile/ProfileImage";
import ProfileName from "./Profile/Username";
import ProfileAbout from "./Profile/About";
import { Store } from "../../Store/Store";

export default function ProfileCard() {
  const { user, setUser } = useContext(Store);
  const [profileFile, setProfileFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    about: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("name", updateProfile.name || user.name);
      formData.set("about", updateProfile.about || user.aboutStatus);
      if (profileFile) {
        formData.set("image", profileFile);
      }

      const response = await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      alert("Profile updated successfully!");
      setUser(data);
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Update failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ml-3 w-full h-full bg-gray-100 max-w-md mx-auto py-10 flex flex-col gap-7 border-l border-gray-300">
      <h2 className="text-2xl font-semibold text-left mb-4 ml-5">Profile</h2>

      <ProfileImage
        profileFile={profileFile}
        setProfileFile={setProfileFile}
        user={user}
      />

      <ProfileName
        updateProfile={updateProfile}
        setUpdateProfile={setUpdateProfile}
        user={user}
      />

      <ProfileAbout
        updateProfile={updateProfile}
        setUpdateProfile={setUpdateProfile}
        user={user}
      />

      <div className="w-full py-3 flex justify-center">
        <button
          type="button"
          className="w-1/2 py-3 bg-green-800 text-white rounded-md disabled:opacity-60 cursor-pointer"
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
