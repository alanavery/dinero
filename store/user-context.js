import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  activeUserId: null,
  setActiveUserId: () => {},
  activeAccount: null,
  setActiveAccount: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState('');
  const [activeUserId, setActiveUserId] = useState('');
  const [activeAccount, setActiveAccount] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      if (userData.userId === activeUserId) {
        setActiveAccount(userData.accounts[userData.accounts.length - 1]);
      } else {
        setActiveUserId(userData.userId);

        if (userData.accounts[0]) {
          setActiveAccount(userData.accounts[0]);
        } else {
          setActiveAccount('');
        }
      }

      setIsLoading(false);
    }
  }, [userData]);

  const context = {
    userData,
    setUserData,
    activeUserId,
    setActiveUserId,
    activeAccount,
    setActiveAccount,
    isLoading,
    setIsLoading,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export default UserContext;
