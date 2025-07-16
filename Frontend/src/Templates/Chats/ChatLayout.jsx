import React, { useContext,useState } from "react";
import { Store } from "../../Store/Store";
import { FaUser } from "react-icons/fa";
const ChatLayout = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUser className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-gray-100 p-3 rounded-lg max-w-xs lg:max-w-md">
            <p className="text-sm">Hello! How are you doing?</p>
            <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs lg:max-w-md">
            <p className="text-sm">I'm doing great, thanks for asking!</p>
            <span className="text-xs text-blue-100 mt-1 block">10:32 AM</span>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-gray-100 p-3 rounded-lg max-w-xs lg:max-w-md">
            <p className="text-sm">That's wonderful to hear! What have you been up to lately?</p>
            <span className="text-xs text-gray-500 mt-1 block">10:35 AM</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatLayout;