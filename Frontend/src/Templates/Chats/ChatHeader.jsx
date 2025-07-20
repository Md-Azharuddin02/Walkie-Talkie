import React, { useContext } from 'react';
import img from '../../assets/images/dummy.avif';
import { Store } from '../../Store/Store';
import { FiVideo, FiSearch, FiMoreVertical } from 'react-icons/fi';

const ChatHeader = () => {
  const { user, currentFriend } = useContext(Store);

  const profileUrl = user?.profileImage || img;
  const displayName = user?.name || 'Guest';

  const iconButtonClass = "text-gray-600 hover:text-gray-800 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-200";

  const iconButtons = [
    { icon: <FiVideo size={20} className="sm:w-6 sm:h-6" />, label: "Video Call" },
    { icon: <FiSearch size={20} className="sm:w-6 sm:h-6" />, label: "Search" },
    { icon: <FiMoreVertical size={20} className="sm:w-6 sm:h-6" />, label: "Options" },
  ];

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100 border-b border-gray-200 min-h-16">
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-1 min-w-0">
        <img
          src={profileUrl}
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
        />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {currentFriend.name}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
        {iconButtons.map(({ icon, label }, idx) => (
          <button 
            key={idx} 
            className={iconButtonClass} 
            aria-label={label}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;