import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    // Retrieve from localStorage if available
    return localStorage.getItem('userName') || '';
  });

  useEffect(() => {
    // Save to localStorage whenever userName changes
    localStorage.setItem('userName', userName);
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
