import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import ResponsiveSidebar from "../Templates/Sidebar/ResponsiveSidebar/";
import UsersList from "../Templates/Sidebar/UsersList";
import UserProfile from "../Templates/Sidebar/UserProfile";
import Settings from "../Templates/Sidebar/Setting";
import TaskList from "../Services/LLM GPT/GPTComponents/TaskList";
import ChatLayout from "../Templates/Chats/ChatLayout";
import { Store } from "../Store/Store";
import AddFriendCard from "../Templates/Sidebar/AddFriend";

//Custom hook for responsive breakpoint
const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const Layout = () => {
  const { activeTab, currentFriend, setCurrentFriend, isChatOpen, setIsChatOpen, isCardOpen } =
    useContext(Store);
  const isMobile = useIsMobile();

  //When a friend is selected
  const handleSelectFriend = useCallback(
    (friend) => {
      setCurrentFriend(friend);
      setIsChatOpen(true);
    },
    [setCurrentFriend, setIsChatOpen]
  );

  //Tab components (memoized)
  const renderTabComponent = useMemo(() => {
    const components = {
      userlist: <UsersList onSelectFriend={handleSelectFriend} />,
      profile: <UserProfile />,
      settings: <Settings />,
      taskList: <TaskList />,
    };
    return components[activeTab] || components.userlist;
  }, [activeTab, handleSelectFriend]);

  //Mobile-specific main area
  const renderMobileView = useMemo(() => {
    if (isChatOpen) {
      return (
        <ChatLayout
          currentFriend={currentFriend}
          isMobile
          setIsChatOpen={setIsChatOpen}
        />
      );
    }
    return renderTabComponent;
  }, [isChatOpen, currentFriend, renderTabComponent, setIsChatOpen]);

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar (always visible on desktop, responsive on mobile) */}
      <ResponsiveSidebar />

      {/* LEFT PANEL — Only on Desktop */}
      {!isMobile && (
        <aside
          className="w-96 ml-20 h-full border-r border-gray-200 bg-white"
          role="complementary"
          aria-label="Tab content"
        >
          {renderTabComponent}
        </aside>
      )}

      {/* MAIN AREA */}
      <main
        className="flex-1 h-full overflow-hidden bg-gray-100 pb-0"
        role="main"
        aria-label="Main content"
      >
        {!isMobile && isCardOpen && <AddFriendCard />}
        {isMobile ? renderMobileView : (
          <ChatLayout
            currentFriend={currentFriend}
            isMobile={false}
            setIsChatOpen={setIsChatOpen}
          />
        )}
      </main>
    </div>
  );
};

export default React.memo(Layout);
