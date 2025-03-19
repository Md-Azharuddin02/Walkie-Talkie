import React from 'react';
import {
  FaEnvelope,
  FaBell,
  FaComment,
  FaUsers,
  FaCircle,
  FaCog,
} from 'react-icons/fa';
import img from '../../assets/img.jpg';

// Reusable Icon Component with better prop types and defaults
const IconWithBadge = ({
  icon: Icon,
  badgeContent,
  badgeColor = 'bg-gray-500',
  iconColor = 'text-gray-600',
  badgePosition = 'top-0 right-0',
  badgeSize = 'w-4 h-4',
}) => (
  <div className="relative my-3">
    {typeof Icon === 'string' ? (
      <img
        src={Icon}
        alt="Profile"
        className="w-8 h-8 rounded-full object-cover cursor-pointer"
      />
    ) : (
      <Icon className={`${iconColor} text-2xl cursor-pointer`} />
    )}
    {badgeContent && (
      <span
        className={`absolute ${badgePosition} ${badgeSize} ${badgeColor} text-white text-xs flex items-center justify-center rounded-full border-2 border-gray-100`}
      >
        {badgeContent}
      </span>
    )}
  </div>
);

// Reusable Icon Group Component
const IconGroup = ({ icons, className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    {icons.map((iconProps, index) => (
      <IconWithBadge key={index} {...iconProps} />
    ))}
  </div>
);

// Configuration object for icons
const ICON_CONFIG = {
  top: [
    {
      icon: FaEnvelope,
      badgeContent: '1',
      badgeColor: 'bg-blue-500',
      badgePosition: 'top-[-5px] right-[-5px]',
      badgeSize: 'w-6 h-6',
    },
    { icon: FaBell, badgeColor: 'bg-green-500' },
    { icon: FaComment, badgeColor: 'bg-green-500' },
    { icon: FaUsers },
    { icon: FaCircle, iconColor: 'text-blue-500' },
  ],
  bottom: [
    { icon: FaCog },
    { icon: img },
  ],
};

// Main Sidebar Component
const Sidebar = () => (
  <div className="fixed top-0 left-0 w-24 h-screen bg-gray-100 flex flex-col justify-between py-6">
    <IconGroup icons={ICON_CONFIG.top} className="space-y-1" />
    <IconGroup icons={ICON_CONFIG.bottom} className="space-y-1 mt-4" />
  </div>
);

export default Sidebar;