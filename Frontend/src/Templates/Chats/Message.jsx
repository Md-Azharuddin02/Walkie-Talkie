import React, { useContext } from "react";
import { Store } from "../../Store/Store";

const Message = ({ message }) => {
  const { user } = useContext(Store);
  const isSender = user._id === message.userId;


  return (
    <div
      className={`mb-4 w-full flex ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className="bg-white text-sm text-gray-800 rounded-xl p-3 shadow-md"
        style={{ width: "fit-content", maxWidth: "70%" }}
      >
        {/* Sender Name */}
        <div className="text-red-600 font-semibold mb-1">
          {message.userId}
        </div>

        {/* Message Text */}
        <div className="break-words">
          <span className="text-black">{message.message}</span>
        </div>

        {/* Timestamp */}
        <div className="text-gray-500 text-xs text-right mt-1">
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default Message;
