import React, { useContext, useState, useEffect, useCallback, useMemo, Suspense, lazy } from "react";
import { Store } from "../../Store/Store";
import { FaPlus, FaEllipsisV } from 'react-icons/fa';

// Lazy load components
const Search = lazy(() => import('./Search'));
const AddFriendCard = lazy(() => import("./AddFriend"));

// Lazy load image component
const LazyImage = lazy(() => import("./LazyImage"));

const UsersList = () => {
  const { user, setCurrentFriend, setIsChatOpen, setIsCardOpen, isCardOpen } = useContext(Store);
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const filterOptions = useMemo(() => ["ALL", "Unread", "Favourite", "Groups"], []);

  // Memoized fetch function
  const fetchFriendList = useCallback(async (id) => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/get-all-friendlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });
      
      const data = await response.json();
      if (response.ok && data.friendList) {
        setFriendList(data.friendList);
      }
    } catch (error) {
      console.error("Error fetching friend list:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized useEffect
  useEffect(() => {
    if (user?._id) {
      fetchFriendList(user._id);
    }
  }, [user?._id, fetchFriendList]);

  // Memoized friend selection handler
  const handleFriendSelect = useCallback((friend) => {
    setCurrentFriend(friend);
    setIsChatOpen(true);
  }, [setCurrentFriend, setIsChatOpen]);

  // Memoized friend list items
  const renderedFriendList = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className="h-3 bg-gray-200 rounded w-8"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return friendList.map((friend) => (
      <FriendListItem 
        key={friend.id} 
        friend={friend} 
        onSelect={handleFriendSelect} 
      />
    ));
  }, [friendList, loading, handleFriendSelect]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-xl lg:text-2xl font-bold">Chats</h1>
        <div className="flex space-x-3">
          <FaPlus 
            className="text-gray-600 cursor-pointer text-lg hover:text-gray-800 transition-colors" 
            onClick={() => setIsCardOpen(true)} 
          />
          <FaEllipsisV className="text-gray-600 cursor-pointer text-lg hover:text-gray-800 transition-colors" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <Suspense fallback={
          <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        }>
          <Search />
        </Suspense>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 px-4 mb-4 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              option === "ALL" 
                ? "bg-green-100 text-green-600" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4">
        <Suspense fallback={
          <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
            Loading add friend card...
          </div>
        }>
          {isCardOpen && <AddFriendCard />}
        </Suspense>
        
        {renderedFriendList}
        
        {!loading && friendList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p className="text-lg font-medium mb-2">No friends yet</p>
            <p className="text-sm">Add friends to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Separate component for friend list item with memo
const FriendListItem = React.memo(({ friend, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(friend);
  }, [friend, onSelect]);

  return (
    <div 
      className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-150"
      onClick={handleClick}
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
        <Suspense fallback={
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
        }>
          <LazyImage 
            src={friend.profileImage} 
            alt={friend.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Suspense>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{friend.name}</p>
        <p className="text-sm text-gray-500 truncate">{friend.message}</p>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
        <span className="text-xs text-gray-500 whitespace-nowrap">{friend.time}</span>
        {friend.unreadCount > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1 min-w-[20px] text-center">
            {friend.unreadCount > 99 ? '99+' : friend.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
});

export default React.memo(UsersList);