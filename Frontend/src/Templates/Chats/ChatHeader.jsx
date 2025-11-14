import React, { useContext } from 'react';
import img from '../../assets/images/dummy.avif';
import { Store } from '../../Store/Store';
import { FiVideo, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { IoArrowBackSharp } from "react-icons/io5";


const ChatHeader = ({isMobile, setIsChatOpen, setIsUserDetailOpen, setFriendDetailCardOpen}) => {
  const { user, currentFriend } = useContext(Store);

  const profileUrl = currentFriend?.profileImage || img;
  const displayName = currentFriend?.name


  const iconButtonClass = "text-gray-600 hover:text-gray-800 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-200";

  const iconButtons = [
    { icon: <FiVideo size={20} className="sm:w-6 sm:h-6" />, label: "Video Call" },
    { icon: <FiSearch size={20} className="sm:w-6 sm:h-6" />, label: "Search" },
    { icon: <FiMoreVertical size={20} className="sm:w-6 sm:h-6" />, label: "Options" },
  ];

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100 border-b border-gray-200 min-h-16">
      {/* Left Section */}
      {isMobile && <IoArrowBackSharp className='mr-3 cursor-pointer' onClick={()=>setIsChatOpen(false)} />}
      <div className="flex items-center space-x-2 sm:space-x-3  flex-1 min-w-0">
        
        <img
          src={profileUrl}
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 cursor-pointer"
          onClick={()=>setFriendDetailCardOpen(true)}
        />
        
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate cursor-pointer" onClick={()=>setFriendDetailCardOpen(true)}>
          {displayName}
          
        </h2>
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