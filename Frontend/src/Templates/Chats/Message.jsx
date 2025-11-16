import React from "react";

const Message = ({ message }) => {
  const isSender = message.direction === "out";

  return (
    <div
      className={`w-full px-3 sm:px-4 mb-2 flex ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          relative 
          px-3 py-2 sm:px-4 sm:py-3
          max-w-[75%] sm:max-w-[70%] lg:max-w-[60%]
          rounded-2xl text-sm sm:text-base leading-relaxed
          ${isSender 
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-900 rounded-bl-none shadow-md"
          }
        `}
      >
        {/* Sender name */}
        {!isSender && (
          <div className="text-xs font-medium text-blue-600 mb-1">
            {message.receiverName}
          </div>
        )}

        {/* Text */}
        <div className="whitespace-pre-wrap break-words">
          {message.message}
        </div>

        {/* Timestamp */}
        <div
          className={`
            text-[10px] sm:text-xs mt-1 text-right 
            ${isSender ? "text-blue-100" : "text-gray-500"}
          `}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default Message;
