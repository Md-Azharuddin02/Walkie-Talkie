import React, { useContext, useMemo, useState, useEffect } from 'react';
import ResponsiveSidebar from '../Templates/Sidebar/ResponsiveSidebar/';
import UsersList from '../Templates/Sidebar/UsersList';
import UserProfile from '../Templates/Sidebar/UserProfile';
import Settings from '../Templates/Sidebar/Setting';
import TaskList from '../Services/LLM GPT/GPTComponents/TaskList';
import GPTLayout from '../Services/LLM GPT/GPT Layout/GPTLayout';
import ChatLayout from '../Templates/Chats/ChatLayout';
import { Store } from '../Store/Store';

const Layout = () => {
  const { activeTab } = useContext(Store);
  const [isMobile, setIsMobile] = useState(false);

  // Track screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Memoize tab components to prevent unnecessary re-renders
  const tabComponents = useMemo(() => ({
    userlist: <UsersList />,
    profile: <UserProfile />,
    settings: <Settings />,
    taskList: <TaskList />
  }), []);

  // Memoize main content components
  const mainContentComponents = useMemo(() => ({
    userlist: <ChatLayout />,
    profile: <ChatLayout />,
    settings: <ChatLayout />,
    taskList: <GPTLayout />
  }), []);

  // Get current main content component
  const getCurrentMainContent = () => {
    // On mobile, show tab components directly in main area when sidebar is hidden
    if (isMobile) {
      return tabComponents[activeTab] || <UsersList />;
    }
    
    // On desktop, show main content components
    return mainContentComponents[activeTab] || <ChatLayout />;
  };

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <ResponsiveSidebar />
      
      {/* Tab Content Area - Desktop Only */}
      <aside
        className="hidden lg:block lg:w-96 lg:ml-20 lg:h-full lg:border-r lg:border-gray-200 lg:bg-white"
        role="complementary"
        aria-label="Tab content"
      >
        {tabComponents[activeTab] || <TaskList />}
      </aside>

      {/* Main Content Area */}
      <main 
        className="flex-1 h-full overflow-hidden bg-gray-100 lg:ml-0 pb-16 lg:pb-0"
        role="main"
        aria-label="Main content"
      >
        {getCurrentMainContent()}
      </main>
    </div>
  );
};

export default Layout;