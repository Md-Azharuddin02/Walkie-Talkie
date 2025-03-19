import React from 'react';
import { FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { chats } from '../Store/Data';

// Add this style block (you might want to move it to a separate CSS file)
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px; /* Thinner scrollbar */
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1; /* Light gray track */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888; /* Scrollbar thumb color */
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker on hover */
  }
`;

// Reusable Icon Button Component
const IconButton = ({ Icon, onClick }) => (
  <Icon className="text-gray-600 cursor-pointer" onClick={onClick} />
);

// Reusable Filter Button Component
const FilterButton = ({ label, isActive = false, onClick }) => {
  const baseStyles = 'px-4 py-1 rounded-full text-sm font-medium';
  const activeStyles = isActive ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100';
  return (
    <button className={`${baseStyles} ${activeStyles}`} onClick={onClick}>
      {label}
    </button>
  );
};

// Chat Item Component
const ChatItem = ({ chat }) => (
  <div className="flex items-center p-4">
    <img
      src={chat.avatar}
      alt={chat.name}
      className="w-12 h-12 rounded-full object-cover mr-3"
    />
    <div className="flex-1 flex justify-between items-center">
      <h2 className="text-sm font-semibold">{chat.name}</h2>
      <span className="text-xs text-gray-500">{chat.time}</span>
    </div>
  </div>
);

// Main ChatList Component
const ChatList = () => {
  const filterOptions = ['ALL', 'Unread', 'Favourite', 'Groups'];

  return (
    <>
      <style>{styles}</style>
      <div className="w-full h-full flex flex-col bg-white px-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">Chats</h1>
          <div className="flex space-x-3">
            <IconButton Icon={FaPlus} />
            <IconButton Icon={FaEllipsisV} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 px-4">
          {filterOptions.map((option) => (
            <FilterButton
              key={option}
              label={option}
              isActive={option === 'ALL'}
            />
          ))}
        </div>

        {/* Chat List with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;