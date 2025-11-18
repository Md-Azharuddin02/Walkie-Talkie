import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";

import ResponsiveSidebar from "../Templates/Sidebar/ResponsiveSidebar";
import { Store } from "../Store/Store";
import { Loader } from "lucide-react";

// Lazy components
const UsersList = lazy(() => import("../Templates/Sidebar/UsersList"));
const UserProfile = lazy(() => import("../Templates/Sidebar/UserProfile"));
const Settings = lazy(() => import("../Templates/Sidebar/Setting"));
const TaskList = lazy(() => import("../Services/LLM GPT/GPTComponents/TaskList"));
const ChatLayout = lazy(() => import("../Templates/Chats/ChatLayout"));
const AddFriendCard = lazy(() => import("../Templates/Sidebar/AddFriend"));
const ChatLoader = lazy(() => import("../Components/ChatLoader"));
const UserListLoader = lazy(() => import("../Components/UserListLoader"));
const GPTLayout = lazy(() => import("../Services/LLM GPT/GPT Layout/GPTLayout"));
const SidebarSkeleton = lazy(() => import("../Components/Loaders/SidebarSkeleton"));


// Error boundary
class LazyComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Lazy component error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div className="text-red-500">Failed to load component.</div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom hook for responsive breakpoint
const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < breakpoint);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const Layout = () => {
  const {
    activeTab,
    currentFriend,
    setCurrentFriend,
    isChatOpen,
    setIsChatOpen,
    isCardOpen,
  } = useContext(Store);

  const isMobile = useIsMobile();

  // On friend click
  const handleSelectFriend = useCallback(
    (friend) => {
      setCurrentFriend(friend);
      setIsChatOpen(true);
    },
    [setCurrentFriend, setIsChatOpen]
  );

  // Tabs (memoized)
  const renderTabComponent = useMemo(() => {
    const components = {
      userlist: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<UserListLoader />}>
            <UsersList onSelectFriend={handleSelectFriend} />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),

      profile: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<Loader />}>
            <UserProfile />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),

      settings: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),

      taskList: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<Loader />}>
            <TaskList />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),
    };

    return components[activeTab] || components.userlist;
  }, [activeTab, handleSelectFriend]);

  // Mobile layout
  const renderMobileView = useMemo(() => {
    if (isChatOpen) {
      return (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<ChatLoader />}>
            <ChatLayout
              currentFriend={currentFriend}
              isMobile={true}
              setIsChatOpen={setIsChatOpen}
            />
          </Suspense>
        </LazyComponentErrorBoundary>
      );
    }
    return renderTabComponent;
  }, [isChatOpen, currentFriend, renderTabComponent, setIsChatOpen]);

  // Desktop chat section
  const desktopChatLayout = useMemo(
    () => (
      <LazyComponentErrorBoundary>
        {activeTab === "taskList" ? (
          <Suspense fallback={<ChatLoader />}>
            <GPTLayout fallback={<ChatLoader />} />
          </Suspense>
        ) : (
          <Suspense fallback={<ChatLoader />}>
            <ChatLayout
              currentFriend={currentFriend}
              isMobile={false}
              setIsChatOpen={setIsChatOpen}
            />
          </Suspense>
        )}
      </LazyComponentErrorBoundary>
    ),
    [activeTab, currentFriend, setIsChatOpen]
  );

  // Add friend card
  const addFriendCard = useMemo(
    () => (
      <LazyComponentErrorBoundary>
        <Suspense fallback={<Loader />}>
          <AddFriendCard />
        </Suspense>
      </LazyComponentErrorBoundary>
    ),
    []
  );

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      <LazyComponentErrorBoundary>
        <Suspense fallback={<SidebarSkeleton />}>
          <ResponsiveSidebar />
        </Suspense>
      </LazyComponentErrorBoundary>



      {/* Desktop tabs */}
      {!isMobile && (
        <aside className="w-96 ml-20 h-full border-r border-gray-200 bg-white">
          {renderTabComponent}
        </aside>
      )}

      {/* Main Area */}
      <main className="flex-1">
        {isMobile ? renderMobileView : desktopChatLayout}
      </main>

      {isCardOpen && (
<div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] bg-black/5 z-[999]">
  {addFriendCard}
</div>

      )}

    </div>
  );
};

export default React.memo(Layout);
