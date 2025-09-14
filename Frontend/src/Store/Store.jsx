// StoreContext.js (or .ts if using TypeScript)
import React, { createContext, useState, useMemo } from "react";
import useFetchData from "../Custom/fetchData";

export const Store = createContext(null);

export const StoreProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("userlist");
  const [user, setUser] = useState(null);
  const defaultUser = user?.friendList[0] || null;
  const [currentFriend, setCurrentFriend] = useState(defaultUser);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);

  const contextValue = useMemo(
    () => ({
      isCardOpen,
      setIsCardOpen,
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
    [isCardOpen, currentTask, setCurrentTask, activeTab, user, currentFriend, setCurrentFriend, isSidebarOpen, isChatOpen, setIsChatOpen]
  );

  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};
