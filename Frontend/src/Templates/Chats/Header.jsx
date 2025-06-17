import React,{useContext} from 'react';
import img from '../../assets/images/img.jpg';
import { Store } from '../../Store/Store';

// Importing icons (you can use a library like react-icons for the icons)
import { FiVideo, FiSearch, FiMoreVertical } from 'react-icons/fi';

const ChatHeader = () => {
  const { user } = useContext(Store); // Accessing user from context if needed
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
      {/* Left Section: Profile Picture and Name */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <img
          src={img || "/default-profile.png"} // Fallback to a default image if img is null
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          {user?.name || "Guest"}
        </h2>
      </div>
  
      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
          <FiVideo size={24} />
        </button>
        <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
          <FiSearch size={24} />
        </button>
        <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
          <FiMoreVertical size={24} />
        </button>
      </div>
    </div>
  );
  
};

export default ChatHeader;