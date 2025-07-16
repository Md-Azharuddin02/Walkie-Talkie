import React, { createContext, useState, useMemo } from 'react';

// Create the Store context
export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts'); // Default active tab
  const [user, setUser] = useState({ name: 'John Doe', profileImage: null });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTabContentOpen, setIsTabContentOpen] = useState(false);

  const contextValue = useMemo(() => ({
    isCardOpen, setIsCardOpen,
    activeTab, setActiveTab,
    user, setUser,
    isSidebarOpen, setIsSidebarOpen,
    isTabContentOpen, setIsTabContentOpen
  }), [isCardOpen, activeTab, user, isSidebarOpen, isTabContentOpen]);

  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};
