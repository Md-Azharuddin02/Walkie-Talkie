import React, { createContext, useState, useEffect, useMemo } from 'react';

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');


  // Add a new user to the database and update the UI
  const addUser = async (newUser) => {
    try {
      const response = await fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();

      // Update the local state to include the new user
      setUsers((prevUsers) => [...prevUsers, createdUser]);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };


  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ isCardOpen, setIsCardOpen, addUser, activeTab, setActiveTab }),
    [isCardOpen, activeTab]
  );

  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};