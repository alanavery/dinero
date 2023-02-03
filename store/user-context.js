import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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

  console.log('User context is rendering.');

  // useEffect(() => {
  //   if (!userData) {
  //     axios
  //       .post('/api/transactions', formData)
  //       .then((response) => {
  //         console.log(response);
  //         setUserData(response.data.newUserData);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setMessage(error.response.data.message);
  //       });
  //   } else {
  //   }
  // }, []);

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
