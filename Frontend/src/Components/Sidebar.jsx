import React from 'react';
import {
  FaEnvelope,
  FaBell,
  FaComment,
  FaUsers,
  FaCircle,
  FaCog,
} from 'react-icons/fa';
import { FaRegCircleUser } from "react-icons/fa6";

// Reusable Icon Component
const IconWithBadge = ({ icon: Icon, badgeContent, badgeColor, iconColor = 'text-gray-600', badgePosition = 'top-0 right-0', badgeSize = 'w-4 h-4' }) => {
  return (
    <div className="relative my-2"> {/* Increased margin between icons */}
      <Icon className={`${iconColor} text-2xl cursor-pointer`} /> {/* Increased icon size */}
      {badgeContent && (
        <span
          className={`absolute ${badgePosition} ${badgeSize} ${badgeColor} text-white text-xs flex items-center justify-center rounded-full border-2 border-gray-100`}
        >
          {badgeContent}
        </span>
      )}
    </div>
  );
};

const Sidebar = () => {
  const topIcons = [
    { icon: FaEnvelope, badgeContent: '1', badgeColor: 'bg-blue-500', badgePosition: 'top-[-5px] right-[-5px]', badgeSize: 'w-8 h-6' }, // Increased badge size
    { icon: FaBell, badgeColor: 'bg-green-500' },
    { icon: FaComment, badgeColor: 'bg-green-500' },
    { icon: FaUsers },
    { icon: FaCircle, iconColor: 'text-blue-500' },
  ];

  const bottomIcons = [
    { icon: FaCog },
    { icon: FaRegCircleUser, iconColor: 'text-gray-600 bg-gray-200 rounded-full p-3' }, // Increased padding for profile icon
  ];

  return (
    <div className="fixed top-0 left-0 w-[100px] h-screen bg-gray-100 flex flex-col justify-between py-4 "> {/* Increased sidebar width and gap */}
      <div className='flex flex-col items-center justify-center'> {/* Increased gap between icons */}
        {topIcons.map((iconProps, index) => (
          <IconWithBadge key={index} {...iconProps} />
        ))}
      </div>

      <div className='flex flex-col items-center m-4'> {/* Increased gap between icons */}
        {bottomIcons.map((iconProps, index) => (
          <IconWithBadge key={index} {...iconProps} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;