import React, { useContext } from "react";
import img from "../../assets/images/dummy.avif";
import { Store } from "../../Store/Store";
import { FiVideo, FiSearch, FiMoreVertical } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";

const ChatHeader = ({
  isMobile,
  setIsChatOpen,
  setIsUserDetailOpen,
  setFriendDetailCardOpen,
  onlineUsers,
}) => {
  const { currentFriend } = useContext(Store);

  const profileUrl = currentFriend?.profileImage || img;
  const displayName = currentFriend?.name;

  const iconButtonClass =
    "text-gray-600 hover:text-gray-800 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-200";

  const iconButtons = [
    {
      icon: <FiVideo size={20} className="sm:w-6 sm:h-6" />,
      label: "Video Call",
    },
    { icon: <FiSearch size={20} className="sm:w-6 sm:h-6" />, label: "Search" },
    {
      icon: <FiMoreVertical size={20} className="sm:w-6 sm:h-6" />,
      label: "Options",
    },
  ];

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100 border-b border-gray-200 min-h-16">
      {/* Left Section */}
      {isMobile && (
        <IoArrowBackSharp
          className="mr-3 cursor-pointer"
          onClick={() => setIsChatOpen(false)}
        />
      )}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={profileUrl}
            alt={displayName}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover cursor-pointer shadow-sm hover:opacity-90 transition"
            onClick={() => setFriendDetailCardOpen(true)}
          />

          {/* Online Indicator */}
          <span
            className={`
        absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
        ${
          onlineUsers.includes(currentFriend?.phoneNumber)
            ? "bg-green-500"
            : "bg-gray-400"
        }
      `}
          />
        </div>

        {/* Name + Status */}
        <div
          className="flex flex-col min-w-0 cursor-pointer select-none"
          onClick={() => setFriendDetailCardOpen(true)}
        >
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {displayName}
          </h2>

          <p className="text-xs text-gray-500">
            {onlineUsers.includes(currentFriend?.phoneNumber) ? (
              <span className="text-green-600 font-medium">Online</span>
            ) : (
              <span className="text-gray-500">Offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
        {iconButtons.map(({ icon, label }, idx) => (
          <button
            key={idx}
            className={iconButtonClass}
            aria-label={label}
            onClick={() => setIsUserDetailOpen(true)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;
