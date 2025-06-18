import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

const ProfileName = ({ updateProfile, setUpdateProfile, user }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      setUpdateProfile((prev) => ({ ...prev, name }));
    }
    setEdit(false);
    setName("");
  };

  const handleEditStart = () => {
    setEdit(true);
    setName(user?.name || "");
  };

  return (
    <div className="px-6 py-3 bg-gray-200">
      <label className="text-sm text-gray-500 mb-1 block">Your name</label>

      <div className="flex justify-between items-center">
        {edit ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <AiOutlineCheck
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={handleSave}
              title="Save name"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center w-full px-1">
            <p className="text-sm text-black break-words">{updateProfile?.name || user?.name || 'User' }</p>
            <FiEdit2
              className="text-gray-500 cursor-pointer"
              onClick={handleEditStart}
              title="Edit name"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileName;
