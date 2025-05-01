import React from 'react';
import Sidebar from '../Templates/Sidebar/Sidebar';
import UsersList from '../Templates/Sidebar/UsersList';
import ChatLayout from '../Templates/Chats/ChatLayout';
import { Store } from '../Store/Store';
import { useContext } from 'react';
import UserProfile from '../Templates/Sidebar/UserProfile';
import Settings from '../Templates/Sidebar/Setting';
function Layout() {
  const { activeTab, setActiveTab } = useContext(Store);
  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case 'contacts':
        return <UsersList />
      case 'profile':
        return <UserProfile />
      case 'settings':
        return <Settings />
      default:
        return <ChatList />
    }
  }
  return (
    <div className="w-full h-screen flex flex-row ">
      {/* Sidebar */}
      <div className="h-full w-[60px] flex border border-red-600">
        <Sidebar />
      </div>

      {/* Chat List */}
      <div className="w-[450px] h-full  ml-6">
        {
          renderTabContent(activeTab)
        }

      </div>

      {/* Chat Content */}
      <div className="flex-1 h-full overflow-hidden">
        <ChatLayout />
      </div>
    </div>
  );
}

export default Layout;