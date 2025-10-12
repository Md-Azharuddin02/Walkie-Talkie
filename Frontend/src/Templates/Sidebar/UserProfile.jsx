import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../Store/Store";
import { FaUser } from "react-icons/fa";

const UserProfile = () => {

  const { user } = useContext(Store);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateProfile, setUpdateProfile] = useState({
    name:user.name || "",
    about:user.aboutStatus ||   "",
    profileImage:  user.profileImage || "",
  });

  console.log("UserProfile render:", updateProfile );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected file:", selectedFile);
    if (selectedFile) {
      // Generate image preview URL for the selected image
      const fileUrl = URL.createObjectURL(selectedFile);

      // Update profile with the image file URL
      setUpdateProfile((prev) => ({ ...prev, profileImage: selectedFile }));

      // Update image preview state
      setImagePreview(fileUrl);

    }
  };

  const triggerFileInput = () => {
    document.getElementById("hidden-upload")?.click();
  };

  const handleChangeSubmit = async () => {
    setIsSubmitting(true);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/update-profile`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: (() => {
        const formData = new FormData();
        formData.append("name", updateProfile.name);  
        formData.append("about", updateProfile.about);
        formData.append("image", updateProfile.profileImage ); 

        return formData;
      })(),
    });
    


  if (response.ok) {
    const data = await response.json();
    // Update local state and localStorage with the new profile data
    setUpdateProfile(data);
  } else {
    alert("Failed to update profile. Please try again.");
  }

  setTimeout(() => {
    setIsSubmitting(false);
    setEditMode(false);
    // alert("Profile updated successfully!");
  }, 2000);
};

const saveProfileLocally = (Id, profileData) => {
  // Store the updated profile in localStorage
  localStorage.setItem(Id, JSON.stringify(profileData));
};

const getProfileFromLocal = (Id) => {
  if (!Id) return null;
  const profile = JSON.parse(localStorage.getItem(Id) || "null");
  return profile;
};

// useEffect(() => {
//   if (user) {
//     const profile = getProfileFromLocal(user._id);
//     if (profile) {
//       setUpdateProfile(profile);
//       setImagePreview(profile.profileImage);
//     } else {
//       setImagePreview(user.profileImage || null);

//     }
//   }
// }, [user]);

return (
  <div className="w-full h-full bg-white overflow-y-auto">
    <div className="p-6">
      <div className="w-full flex justify-between align-middle">
        <h2 className="text-xl lg:text-2xl font-semibold">Profile</h2>
        <button
          className={`p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 cursor-pointer ${editMode && "hidden"
            }`}
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      </div>

      <div className="w-full h-full mt-18">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-30 h-30 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            {/* Display profile image or default icon */}
            {imagePreview || updateProfile.profileImage || user.profileImage ? (
              <img
                src={imagePreview || updateProfile.profileImage || user.profileImage} // Display image preview
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                title="Click to upload a new photo"
              />
            ) : (
              <FaUser className="text-gray-600 text-6xl" />
            )}
          </div>

          <input
            type="file"
            id="hidden-upload"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button
            className={`text-blue-600 text-sm cursor-pointer ${!editMode && "hidden"}`}
            onClick={triggerFileInput}
          >
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            {editMode ? (
              <input
                type="text"
                defaultValue={updateProfile.name || user.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  setUpdateProfile((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            ) : (
              <div className="p-5 bg-gray-500 text-white rounded-md">{updateProfile.name || user.name}</div>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              About
            </label>
            {editMode ? (
              <textarea
                rows="3"
                defaultValue={updateProfile.about || user.aboutStatus}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  setUpdateProfile((prev) => ({ ...prev, about: e.target.value }));
                }}
              />
            ) : (
              <div className="p-5 bg-gray-500 text-white rounded-md">{updateProfile.about || user.aboutStatus}</div>
            )}
          </div>
          {editMode && (
            <div className="flex flex-row justify-between gap-5 mt-5">
              <button
                className="w-full py-3 bg-green-900 text-white rounded-md hover:bg-green-800 disabled:opacity-50 cursor-pointer"
                disabled={isSubmitting}
                onClick={handleChangeSubmit}
              >
                Save Changes
              </button>

              <button
                className="w-full py-3 bg-red-900 text-white rounded-md hover:bg-red-800 disabled:opacity-50 cursor-pointer"
                disabled={isSubmitting}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default UserProfile;
