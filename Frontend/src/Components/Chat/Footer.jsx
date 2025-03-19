import React from 'react';
import { FiPlus, FiSmile, FiMic } from 'react-icons/fi'; // Using react-icons for the icons

const Footer = () => {
  return (
    <div className="flex items-center p-4 bg-gray-100 border-t border-gray-200 position-fixed bottom-0 w-full">
      {/* Plus Icon (Attachments) */}
      <button className="text-gray-600 hover:text-gray-800 mr-3">
        <FiPlus size={24} />
      </button>

      {/* Emoji Icon */}
      <button className="text-gray-600 hover:text-gray-800 mr-3">
        <FiSmile size={24} />
      </button>

      {/* Input Field */}
      <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
        />
        {/* Green Dot (Send Button) */}
        <button className="w-4 h-4 bg-green-500 rounded-full ml-2"></button>
      </div>

      {/* Microphone Icon */}
      <button className="text-gray-600 hover:text-gray-800 ml-3">
        <FiMic size={24} />
      </button>
    </div>
  );
};

export default Footer;