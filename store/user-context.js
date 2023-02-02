import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  activeAccount: null,
  setActiveAccount: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState({
    _id: '63d6ec6b959e8bacbc61be18',
    firstName: 'Alan',
  });
  const [userData, setUserData] = useState(null);
  const [activeAccount, setActiveAccount] = useState(null);

  const context = {
    userData,
    setUserData,
    activeAccount,
    setActiveAccount,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export default UserContext;
