// StoreContext.js (or .ts if using TypeScript)
import React, { createContext, useState, useMemo } from "react";

export const Store = createContext(null);

export const StoreProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("userlist");
  const [user, setUser] = useState(null);
  const [friendsList, setFriendsList] = useState([
    { id: 1, name: 'Emma Johnson', message: 'Are we still on for today?', time: '11:20 AM', unreadCount: 1 },
    { id: 2, name: 'Liam Smith', message: 'Got it, thanks!', time: '9:45 AM', unreadCount: 2 },
    { id: 3, name: 'Olivia Davis', message: 'Let me know when you’re free.', time: '2:10 PM', unreadCount: 3 },
    { id: 4, name: 'Noah Martinez', message: 'I’ll send it over.', time: '8:15 AM', unreadCount: 0 },
    { id: 5, name: 'Ava Brown', message: 'Sounds like a plan.', time: '1:25 PM', unreadCount: 0 },
    { id: 6, name: 'Elijah Wilson', message: 'Thanks for the update.', time: '4:50 PM', unreadCount: 0 },
    { id: 7, name: 'Sophia Moore', message: 'Just finished the task.', time: '10:30 AM', unreadCount: 0 },
    { id: 8, name: 'James Taylor', message: 'Meeting moved to 3.', time: '3:00 PM', unreadCount: 0 },
    { id: 9, name: 'Isabella Anderson', message: 'Talk soon!', time: '6:40 PM', unreadCount: 0 },
    { id: 10, name: 'Benjamin Thomas', message: 'Let’s sync tomorrow.', time: '12:00 PM', unreadCount: 0 },
    { id: 11, name: 'Mia Jackson', message: 'Nice work on the project.', time: '7:20 AM', unreadCount: 0 },
    { id: 12, name: 'Lucas White', message: 'See you at lunch.', time: '1:00 PM', unreadCount: 0 },
    { id: 13, name: 'Charlotte Harris', message: 'Almost done!', time: '4:10 PM', unreadCount: 0 },
    { id: 14, name: 'Henry Martin', message: 'Check your email.', time: '5:45 PM', unreadCount: 0 },
    { id: 15, name: 'Amelia Thompson', message: 'I agree with you.', time: '9:05 AM', unreadCount: 0 },
    { id: 16, name: 'Alexander Garcia', message: 'Let me double-check.', time: '8:30 AM', unreadCount: 0 },
    { id: 17, name: 'Harper Martinez', message: 'Thanks again!', time: '11:50 AM', unreadCount: 0 },
    { id: 18, name: 'William Robinson', message: 'Approved ✅', time: '2:55 PM', unreadCount: 0 },
    { id: 19, name: 'Evelyn Clark', message: 'Working on it now.', time: '12:15 PM', unreadCount: 0 },
    { id: 20, name: 'Daniel Lewis', message: 'Sounds good to me.', time: '6:00 PM', unreadCount: 0 }
  ]);
  const [currentFriend, setCurrentFriend] = useState(friendsList[0]);
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
      friendsList,
      currentFriend,
      setFriendsList,
      setCurrentFriend,
      isSidebarOpen,
      setIsSidebarOpen,
      isChatOpen, setIsChatOpen,
      currentTask, setCurrentTask,

    }),
    [isCardOpen, currentTask, setCurrentTask, activeTab, user, friendsList, setCurrentFriend, currentFriend, isSidebarOpen, isChatOpen, setIsChatOpen]
  );

  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};
