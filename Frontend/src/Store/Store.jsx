import React, { createContext, useState, useMemo } from 'react';

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [user, setUser] = useState();

  // Add a new user to the database and update the UI
  const addUser = async (newUser) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        credentials: 'include'  // Added to include cookies if using sessions
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();

      // Update the local state to include the new user
      setUser(prevUsers => [...prevUsers, createdUser]);
      return createdUser;  // Return the created user for immediate use
    } catch (error) {
      console.error('Failed to add user:', error);
      throw error;  // Re-throw to allow handling in the calling component
    }
  };
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ 
      isCardOpen, 
      setIsCardOpen, 
      addUser, 
      activeTab, 
      setActiveTab,
      user,
      setUser
    }),
    [isCardOpen, activeTab, user]  // Removed setUser from dependencies as it's stable
  );

  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};