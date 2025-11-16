import React, { useState, useEffect } from "react";
import { FiPlus, FiSmile, FiMic } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";

const Footer = ({ SendMessage, setSendTyping }) => {
  const [message, setMessage] = useState("");

  // Handle typing indicator safely
  useEffect(() => {
    setSendTyping(message.length > 0);

    // optional: debounce to avoid spamming socket
    const timeout = setTimeout(() => {
      if (message.length === 0) setSendTyping(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [message, setSendTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    SendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  return (
    <div className="flex items-center p-2 sm:p-3 md:p-4 bg-gray-100 border-t border-gray-200 bottom-0 w-full min-h-16">
      
      {/* Plus Icon (Attachments) */}
      <label className="text-gray-600 hover:text-gray-800 mr-2 sm:mr-3 cursor-pointer p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 inline-flex items-center flex-shrink-0">
        <FiPlus size={20} className="sm:w-6 sm:h-6" />
        <input type="file" className="hidden" />
      </label>

      {/* Emoji Icon */}
      <button className="text-gray-600 hover:text-gray-800 mr-2 sm:mr-3 cursor-pointer p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 flex-shrink-0">
        <FiSmile size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Input Field */}
      <div className="flex-1 flex items-center bg-white rounded-full px-3 sm:px-4 py-2 shadow-sm min-w-0">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm sm:text-base min-w-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      {/* Mic / Send Button */}
      <button className="text-gray-600 hover:text-gray-800 ml-2 sm:ml-3 cursor-pointer p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 flex-shrink-0">
        {message.length > 0 ? (
          <IoMdSend onClick={handleSendMessage} size={20} className="sm:w-6 sm:h-6" />
        ) : (
          <FiMic size={20} className="sm:w-6 sm:h-6" />
        )}
      </button>
    </div>
  );
};

export default Footer;
