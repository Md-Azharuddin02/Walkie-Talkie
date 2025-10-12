import React, { useContext, useState, useEffect } from "react";
import { Store } from "../../Store/Store";
import { FaPlus, FaEllipsisV, FaUser } from 'react-icons/fa';
import Search from './Search'


const UsersList = () => {
  const { user, setCurrentFriend, setIsChatOpen } = useContext(Store);
  const [friendList, setFriendList] = useState([]);
  const filterOptions = ["ALL", "Unread", "Favourite", "Groups"];


  async function fetchFriendList(id) {
    if (!id) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/get-all-friendlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });
      const data = await response.json();
      if (response.ok) {
        setFriendList(data.friendList);
      }
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  }
  useEffect(() => {
    if (user && user._id) {
      fetchFriendList(user._id);
      setFriendList(user.friendList);
    }
  }, []);



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
        <Search />
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 px-4 mb-4 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${option === "ALL" ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4">
        {friendList.map((friend) => (
          <div key={friend.id} className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={() => { setCurrentFriend(friend), setIsChatOpen(true) }}>
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" >
             {friend.profileImage ? (  <img src={friend.profileImage} alt="" className="rounded-full" />) :   <FaUser className="text-gray-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{friend.name}</p>
              <p className="text-sm text-gray-500 truncate">{friend.message}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{friend.time}</span>
              {friend.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                  {friend.unreadCount}
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