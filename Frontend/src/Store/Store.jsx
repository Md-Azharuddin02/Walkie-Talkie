// StoreContext.js (or .ts if using TypeScript)
import React, { createContext, useState, useMemo } from "react";

export const Store = createContext(null);

export const StoreProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("userlist");
  const [user, setUser] = useState(null);
  const [currentFriend, setCurrentFriend] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      user,
      setUser,
      currentFriend,
      setCurrentFriend,
      isSidebarOpen,
      setIsSidebarOpen,
      isChatOpen, setIsChatOpen,
      currentTask, setCurrentTask,
    }),
    [ currentTask, setCurrentTask, activeTab, user, currentFriend, setCurrentFriend, isSidebarOpen, isChatOpen, setIsChatOpen]
  );

  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};
