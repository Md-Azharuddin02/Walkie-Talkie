import React from 'react';
import img from '../../assets/img.jpg';

// Importing icons (you can use a library like react-icons for the icons)
import { FiVideo, FiSearch, FiMoreVertical } from 'react-icons/fi';

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
      {/* Left Section: Profile Picture and Name */}
      <div className="flex items-center space-x-3">
        <img
          src={img} // Replace with the actual profile picture URL
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold text-gray-800">Saurabh</h2>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <FiVideo size={24} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FiSearch size={24} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FiMoreVertical size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;