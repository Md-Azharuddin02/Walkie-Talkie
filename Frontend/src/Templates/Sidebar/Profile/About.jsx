import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

const ProfileAbout = ({updateProfile, setUpdateProfile}) => {
  const [edit, setEdit] = useState(false);
  const [about, setAbout] = useState("");


const handleSave= ()=>{
  setUpdateProfile(prev=> ({...prev, about: about}));
  setEdit(false);
  setAbout("");
}


return (
  <div className="px-6 bg-gray-200 py-3 ">
    <p className="text-gray-500 text-sm mb-1">About</p>
    <div className="flex justify-between">
      {edit ? (
        <div className="flex items-center justify-around w-full px-1 gap-1">
          <input
            type="text"
            className=" border-gray-300 rounded-md h-8 w-full border-b-2 outline-none"
            onChange={(e) => setAbout(e.target.value)}
          />
          <AiOutlineCheck
            className="text-gray-500 text-2xl cursor-pointer"
            onClick={(e) =>  handleSave(e)}
        
          />
        </div>
      ) : (
        <div className="flex items-left overflow-hidden justify-between w-full">
          <p className="text-sm font-normal text-wrap text-black">{updateProfile.about}</p>
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

export default ProfileAbout;
