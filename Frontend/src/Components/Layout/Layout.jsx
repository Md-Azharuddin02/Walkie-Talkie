import React from 'react';
import Sidebar from '../Sidebar';
import ChatList from '../ChatList';
import ChatLayout from '../Chat/ChatLayout';
function Layout() {
  return (
    <div className="w-full h-screen flex flex-row ">
      {/* Sidebar */}
      <div className="h-full w-[60px] flex border border-red-600">
        <Sidebar />
      </div>

      {/* Chat List */}
      <div className="w-[500px] h-full  ml-6">
        <ChatList />
      </div>

      {/* Chat Content */}
      <div className="flex-1 h-full ">
        <ChatLayout />
      </div>
    </div>
  );
}

export default Layout;