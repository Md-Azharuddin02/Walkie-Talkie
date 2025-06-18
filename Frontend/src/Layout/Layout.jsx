import React, { useContext, useMemo } from 'react';
import Sidebar from '../Templates/Sidebar/Sidebar';
import UsersList from '../Templates/Sidebar/UsersList';
import ChatLayout from '../Templates/Chats/ChatLayout';
import UserProfile from '../Templates/Sidebar/UserProfile';
import Settings from '../Templates/Sidebar/Setting';
import { Store } from '../Store/Store';

const Layout = () => {
  const { activeTab } = useContext(Store);

  const tabComponents = useMemo(() => ({
    contacts: <UsersList />,
    profile: <UserProfile />,
    settings: <Settings />
  }), []);

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="h-full w-[60px] border border-red-600">
        <Sidebar />
      </div>

      {/* Tab Content Area */}
      <div className="w-[450px] h-full ml-6">
        {tabComponents[activeTab] || <UsersList />}
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-full overflow-hidden">
        <ChatLayout />
      </div>
    </div>
  );
};

export default Layout;
