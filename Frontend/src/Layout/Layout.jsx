import React, { useContext, useState, useEffect } from 'react';
import ResponsiveSidebar from '../Templates/Sidebar/ResponsiveSidebar/';
import UsersList from '../Templates/Sidebar/UsersList';
import UserProfile from '../Templates/Sidebar/UserProfile';
import Settings from '../Templates/Sidebar/Setting';
import TaskList from '../Services/LLM GPT/GPTComponents/TaskList';
import GPTLayout from '../Services/LLM GPT/GPT Layout/GPTLayout';
import ChatLayout from '../Templates/Chats/ChatLayout';
import { Store } from '../Store/Store';

const Layout = () => {
  const { activeTab, currentFriend,isChatOpen, setIsChatOpen } = useContext(Store);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Render left (tab) sidebar content
  const renderTabComponent = () => {
    switch (activeTab) {
      case 'userlist':
        return <UsersList onSelectFriend={(friend) => setSelectedFriend(friend)} />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <Settings />;
      case 'taskList':
        return <TaskList />;
      default:
        return <UsersList onSelectFriend={(friend) => setSelectedFriend(friend)} />;
    }
  };

  // Render main (chat area) content
  const renderMainContent = () => {
    if (isMobile) {
      // MOBILE VIEW
      if (isChatOpen) {
        return (
          <ChatLayout
            currentFriend={currentFriend}
            isMobile={isMobile}
            setIsChatOpen={setIsChatOpen}
          />
        );
      }

      // If no friend is selected, show UsersList or fallback
      if (activeTab === 'userlist') {
        return <UsersList onSelectFriend={(friend) => setSelectedFriend(friend)} />;
      }

      return renderTabComponent();
    }

    // DESKTOP VIEW
    switch (activeTab) {
      case 'userlist':
        return <ChatLayout selectedFriend={selectedFriend} />;
      case 'profile':
      case 'settings':
        return <ChatLayout />;
      case 'taskList':
        return <GPTLayout />;
      default:
        return <ChatLayout />;
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      <ResponsiveSidebar />

      {/* Left-side tab content (only on desktop) */}
      <aside
        className="hidden lg:block lg:w-96 lg:ml-20 lg:h-full lg:border-r lg:border-gray-200 lg:bg-white"
        role="complementary"
        aria-label="Tab content"
      >
        {renderTabComponent()}
      </aside>

      {/* Main content */}
      <main
        className="flex-1 h-full overflow-hidden bg-gray-100 lg:ml-0 lg:pb-0"
        role="main"
        aria-label="Main content"
      >
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Layout;
