import React, { useContext, useMemo } from 'react';
import ResponsiveSidebar from '../Templates/Sidebar/ResponsiveSidebar/';
import TabContentToggle from '../Components/TabContentToggle';
import UsersList from '../Templates/Sidebar/UsersList';
import UserProfile from '../Templates/Sidebar/UserProfile';
import Settings from '../Templates/Sidebar/Setting';
import TaskList from '../Services/LLM GPT/GPTComponents/TaskList';
import GPTLayout from '../Services/LLM GPT/GPT Layout/GPTLayout';
import ChatLayout from '../Templates/Chats/ChatLayout';
import { Store } from '../Store/Store';

const Layout = () => {
  const { activeTab, isTabContentOpen, setIsTabContentOpen } = useContext(Store);

  const tabComponents = useMemo(() => ({
    contacts: <UsersList />,
    profile: <UserProfile />,
    settings: <Settings />,
    taskList: <TaskList />
  }), []);

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <ResponsiveSidebar />
      
      {/* Tab Content Toggle */}
      {activeTab === 'taskList' && <TabContentToggle />}

      
      {/* Tab Content Area */}
      <div
        className={`
          lg:w-96 lg:ml-20 lg:block lg:static lg:h-full lg:border-r lg:border-gray-200 lg:bg-white
          fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-40
          ${isTabContentOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0
        `}
      >
        {tabComponents[activeTab] || <UsersList />}
      </div>

      {/* Overlay for mobile */}
      {isTabContentOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsTabContentOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-hidden bg-gray-100 lg:ml-0 pb-16 lg:pb-0">
        {activeTab === 'taskList' ? <GPTLayout /> : <ChatLayout />}
      </div>
    </div>
  );
};

export default Layout;
