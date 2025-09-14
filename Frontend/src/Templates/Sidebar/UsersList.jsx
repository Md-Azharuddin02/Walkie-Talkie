import React, { useContext,useState } from "react";
import { Store } from "../../Store/Store";
import {FiSearch} from 'react-icons/fi';
import {FaPlus, FaEllipsisV, FaUser} from 'react-icons/fa';


const UsersList = () => {
  const { isCardOpen, setIsCardOpen, user, setCurrentFriend,setIsChatOpen } = useContext(Store);
  const filterOptions = ["ALL", "Unread", "Favourite", "Groups"];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-xl lg:text-2xl font-bold">Chats</h1>
        <div className="flex space-x-3">
          <FaPlus className="text-gray-600 cursor-pointer text-lg" onClick={() => setIsCardOpen(!isCardOpen)} />
          <FaEllipsisV className="text-gray-600 cursor-pointer text-lg" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 px-4 mb-4 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              option === "ALL" ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4">
        {user.friendList.map((i) => (
          <div  key={i.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={()=>{setCurrentFriend(i), setIsChatOpen(true)}}>
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" >
              <FaUser className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{i.name}</p>
              <p className="text-sm text-gray-500 truncate">{i.message}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{i.time}</span>
              {i.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                  {i.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UsersList;