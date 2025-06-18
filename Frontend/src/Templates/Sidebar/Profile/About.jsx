import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

const ProfileAbout = ({ updateProfile, setUpdateProfile, user }) => {
  const [edit, setEdit] = useState(false);
  const [aboutText, setAboutText] = useState("");

  const handleSave = () => {
    if (aboutText.trim()) {
      setUpdateProfile(prev => ({ ...prev, about: aboutText }));
    }
    setEdit(false);
    setAboutText("");
  };

  const handleEditStart = () => {
    const current = updateProfile?.about || user?.aboutStatus || '';
    setAboutText(current);
    setEdit(true);
  };

  return (
    <div className="px-6 py-3 bg-gray-200">
      <label className="text-sm text-gray-500 mb-1 block">About</label>
      <div className="flex justify-between items-center">
        {edit ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              autoFocus
            />
            <AiOutlineCheck
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={handleSave}
              title="Save"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center w-full px-1">
            <p className="text-sm text-black break-words">
              {updateProfile?.about || user?.aboutStatus || "Hey there! I am using Walkie-Talkie"}
            </p>
            <FiEdit2
              className="text-gray-500 cursor-pointer"
              onClick={handleEditStart}
              title="Edit"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAbout;
