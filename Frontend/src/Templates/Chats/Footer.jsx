import React, { useContext, useState } from 'react';
import { FiPlus, FiSmile, FiMic } from 'react-icons/fi';
import { IoMdSend } from "react-icons/io";
import io from 'socket.io-client';
import { Store } from '../../Store/Store';

const socket = io('http://localhost:5804');

const Footer = () => {
  const [message, setMessage] = useState([]);
  const { user } = useContext(Store);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(event);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        socket.emit('sendMessage',  {
          userId: user._id,
          toUserId: 'ICs3wiC70dw6BwRvAAIV',
          fromUserId: socket.id,
          message,
        });
        setMessage('');
      }
      catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };


  return (
    <div className="flex items-center p-4 bg-gray-100 border-t border-gray-200 position-fixed bottom-0 w-full">
      {/* Plus Icon (Attachments) */}
      <label className="text-gray-600 hover:text-gray-800 mr-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 inline-flex items-center">
        <FiPlus size={24} />
        <input
          type="file"
          className="hidden"
          aria-label="Upload file"
        />
      </label>

      {/* Emoji Icon */}
      <button className="text-gray-600 hover:text-gray-800 mr-3 cursor-pointer">
        <FiSmile size={24} />
      </button>

      {/* Input Field */}
      <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Microphone Icon */}
      <button className="text-gray-600 hover:text-gray-800 ml-3 cursor-pointer">
        {message.length > 0 ? <IoMdSend onClick={handleSendMessage} size={24} /> : <FiMic size={24} />}
      </button>
    </div>
  );
};

export default Footer;