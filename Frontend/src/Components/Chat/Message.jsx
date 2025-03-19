import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="font-semibold">{message.sender}</div>
        <div className="text-sm text-gray-500">{message.time}</div>
      </div>
      <div className="text-sm text-gray-800">
        {message.text} <span className="text-gray-500">{message.status}</span>
      </div>
    </div>
  );
};

export default Message;