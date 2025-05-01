import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="mb-4">
      <div
        className="flex flex-col mb-1 text-sm text-gray-800 bg-gray-100 p-2 rounded-lg"
        style={{
          width: 'fit-content',
          maxWidth: '70%'
        }}
      >

        <div className="break-words"> <span className="text-gray-500">{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Message