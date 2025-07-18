import React, { useContext } from 'react';
import { Store } from '../../Store/Store';
import { FaEnvelope, FaUsers, FaCog, FaUser } from 'react-icons/fa';
import { VscRobot } from "react-icons/vsc";

const ResponsiveSidebar = () => {
  const { user, setActiveTab, activeTab } = useContext(Store);

  const topIcons = [
    { icon: FaEnvelope, badge: { content: "1", color: "blue" }, onClick: () => setActiveTab("contacts"), id: "contacts" },
    { icon: FaUsers, id: "users" },
    { icon: VscRobot, color: "blue", onClick: () => setActiveTab("taskList"), id: "taskList" },
  ];

  const bottomIcons = [
    { icon: FaCog, onClick: () => setActiveTab("settings"), id: "settings" },
    { icon: 'profile', onClick: () => setActiveTab("profile"), id: "profile" },
  ];

  const badgeColorClass = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    gray: 'bg-gray-500',
  };

  const SidebarIcon = ({ icon: IconComponent, badge, color = "gray", onClick, id, isActive }) => (
    <div 
      className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
      }`} 
      onClick={onClick}
    >
      {IconComponent === 'profile' ? (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <FaUser className="text-gray-600" />
        </div>
      ) : (
        <IconComponent className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
      )}
      {badge?.color && (
        <span className={`absolute -top-1 -right-1 w-4 h-4 text-white text-xs flex items-center justify-center rounded-full ${badgeColorClass[badge.color]}`}>
          {badge.content || ''}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 w-20 h-screen bg-gray-100 flex-col justify-between py-6 z-40">
        <div className="flex flex-col items-center space-y-2">
          {topIcons.map((props, i) => (
            <SidebarIcon key={i} {...props} isActive={activeTab === props.id} />
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          {bottomIcons.map((props, i) => (
            <SidebarIcon key={i} {...props} isActive={activeTab === props.id} />
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          {[...topIcons, ...bottomIcons].map((props, i) => (
            <SidebarIcon key={i} {...props} isActive={activeTab === props.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;
