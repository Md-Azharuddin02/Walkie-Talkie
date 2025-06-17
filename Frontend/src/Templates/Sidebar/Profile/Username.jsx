import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

const ProfileName = ({updateProfile, setUpdateProfile}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");


const handleSave= ()=>{

  setUpdateProfile(prev=> ({...prev, name: name}));
  setEdit(false);
  setName("");
}



// This is not your username or PIN. This name will be visible to your WhatsApp contacts.



return (
  <div className="px-6 bg-gray-200 py-3">
    <p className="text-gray-500 text-sm mb-1">Your name</p>
    <div className="flex justify-between">
      {edit ? (
        <div className="flex items-center justify-around w-full px-1 gap-1">
          <input
            type="text"
            className=" border-gray-300 rounded-md h-8 w-full border-b-2 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <AiOutlineCheck
            className="text-gray-500 text-2xl cursor-pointer"
            onClick={(e) =>  handleSave(e)}
        
          />
        </div>
      ) : (
        <div className="flex items-left overflow-hidden justify-between w-full p-2">
          <p className="text-sm font-normal text-wrap text-black">{updateProfile.name}</p>
          <FiEdit2
            className="text-gray-500 cursor-pointer"
            onClick={() => setEdit(true)}
          />
        </div>
      )}
    </div>
  </div>
);
};

export default ProfileName;

