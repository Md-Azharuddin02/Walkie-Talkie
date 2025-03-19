import React from 'react';

const ChatItem = ({ chat }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{chat.name}</div>
        <div className="text-sm text-gray-500">{chat.time}</div>
      </div>
      <div className="text-sm text-gray-600">{chat.message || chat.type}</div>
    </div>
  );
};

export default ChatItem;