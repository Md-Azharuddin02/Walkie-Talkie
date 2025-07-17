import React, { useContext } from "react";
import { Store } from "../../Store/Store";

const Message = ({ message }) => {
  // const { user } = useContext(Store);
  // const isSender = user._id === message.userId;

  const isSender = message.userId === "current_user_id"; // Replace with actual user ID check
  
  return (
    <div
      className={`mb-3 sm:mb-4 w-full flex px-2 sm:px-4 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`text-sm rounded-xl p-2 sm:p-3 shadow-md break-words ${
          isSender 
            ? "bg-blue-600 text-white" 
            : "bg-white text-gray-800"
        }`}
        style={{ 
          width: "fit-content", 
          maxWidth: "85%",
          // Responsive max-width for different screen sizes
          ...(window.innerWidth >= 640 && { maxWidth: "75%" }),
          ...(window.innerWidth >= 768 && { maxWidth: "70%" }),
          ...(window.innerWidth >= 1024 && { maxWidth: "60%" }),
          ...(window.innerWidth >= 1280 && { maxWidth: "50%" })
        }}
      >
        {/* Sender Name */}
        <div className={`font-semibold mb-1 text-xs sm:text-sm ${
          isSender ? "text-blue-100" : "text-red-600"
        }`}>
          {message.userId}
        </div>

        {/* Message Text */}
        <div className="break-words">
          <span className={`text-sm sm:text-base leading-relaxed ${
            isSender ? "text-white" : "text-black"
          }`}>
            {message.message}
          </span>
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-right mt-1 sm:mt-2 ${
          isSender ? "text-blue-100" : "text-gray-500"
        }`}>
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default Message;