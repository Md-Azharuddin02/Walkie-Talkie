import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import ResponsiveSidebar from "../Templates/Sidebar/ResponsiveSidebar/";
import { Store } from "../Store/Store";

// Lazy load components
const UsersList = lazy(() => import("../Templates/Sidebar/UsersList"));
const UserProfile = lazy(() => import("../Templates/Sidebar/UserProfile"));
const Settings = lazy(() => import("../Templates/Sidebar/Setting"));
const TaskList = lazy(() => import("../Services/LLM GPT/GPTComponents/TaskList"));
const ChatLayout = lazy(() => import("../Templates/Chats/ChatLayout"));
const AddFriendCard = lazy(() => import("../Templates/Sidebar/AddFriend"));

// Loading fallback component
const LoadingFallback = ({ componentName = "component" }) => (
  <div className="flex items-center justify-center h-full min-h-[200px]">
    <div className="text-gray-500">Loading {componentName}...</div>
  </div>
);

// Error boundary for lazy-loaded components
class LazyComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lazy component error:", error, errorInfo);
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

  // When a friend is selected
  const handleSelectFriend = useCallback(
    (friend) => {
      setCurrentFriend(friend);
      setIsChatOpen(true);
    },
    [setCurrentFriend, setIsChatOpen]
  );

  // Tab components (memoized with lazy loading)
  const renderTabComponent = useMemo(() => {
    const components = {
      userlist: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<LoadingFallback componentName="Users List" />}>
            <UsersList onSelectFriend={handleSelectFriend} />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),
      profile: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<LoadingFallback componentName="User Profile" />}>
            <UserProfile />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),
      settings: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<LoadingFallback componentName="Settings" />}>
            <Settings />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),
      taskList: (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<LoadingFallback componentName="Task List" />}>
            <TaskList />
          </Suspense>
        </LazyComponentErrorBoundary>
      ),
    };
    return components[activeTab] || components.userlist;
  }, [activeTab, handleSelectFriend]);

  // Mobile-specific main area
  const renderMobileView = useMemo(() => {
    if (isChatOpen) {
      return (
        <LazyComponentErrorBoundary>
          <Suspense fallback={<LoadingFallback componentName="Chat" />}>
            <ChatLayout
              currentFriend={currentFriend}
              isMobile
              setIsChatOpen={setIsChatOpen}
            />
          </Suspense>
        </LazyComponentErrorBoundary>
      );
    }
    return renderTabComponent;
  }, [isChatOpen, currentFriend, renderTabComponent, setIsChatOpen]);

  // Desktop chat layout
  const desktopChatLayout = useMemo(() => (
    <LazyComponentErrorBoundary>
      <Suspense fallback={<LoadingFallback componentName="Chat" />}>
        <ChatLayout
          currentFriend={currentFriend}
          isMobile={false}
          setIsChatOpen={setIsChatOpen}
        />
      </Suspense>
    </LazyComponentErrorBoundary>
  ), [currentFriend, setIsChatOpen]);

  // Add friend card for desktop
  const addFriendCard = useMemo(() => (
    <LazyComponentErrorBoundary>
      <Suspense fallback={<LoadingFallback componentName="Add Friend" />}>
        <AddFriendCard />
      </Suspense>
    </LazyComponentErrorBoundary>
  ), []);

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
        {!isMobile && isCardOpen && addFriendCard}
        {isMobile ? renderMobileView : desktopChatLayout}
      </main>
    </div>
  );
};

export default React.memo(Layout);