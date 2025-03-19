import React from 'react';
import Message from './Message';
import { messages } from '../Store/Data';
const ChatContent = () => {
console.log(messages)
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatContent;