import React, { createContext, useState } from 'react';

// Create context
export const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null); // Initialize with null

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
