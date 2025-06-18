import React, { useContext } from 'react';
import img from '../../assets/images/dummy.avif';
import { Store } from '../../Store/Store';
import { FiVideo, FiSearch, FiMoreVertical } from 'react-icons/fi';

const ChatHeader = () => {
  const { user } = useContext(Store); 
  const profileUrl = user?.profileImage || img;
  const displayName = user?.name || 'Guest';

  const iconButtonClass = "text-gray-600 hover:text-gray-800 cursor-pointer";

  const iconButtons = [
    { icon: <FiVideo size={24} />, label: "Video Call" },
    { icon: <FiSearch size={24} />, label: "Search" },
    { icon: <FiMoreVertical size={24} />, label: "Options" },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <img
          src={profileUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold text-gray-800">{displayName}</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {iconButtons.map(({ icon, label }, idx) => (
          <button key={idx} className={iconButtonClass} aria-label={label}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;
