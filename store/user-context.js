import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const dummyUserData = {
      accounts: [
        {
          _id: '1',
          name: 'Checking',
          balance: '1000',
          creditAccount: false,
          creditLimit: null,
          userId: '63d6ec6b959e8bacbc61be18',
        },
      ],
      transactions: [
        {
          _id: '1',
          amount: '10',
          payeeId: '1',
          date: '2023-01-01',
          cleared: false,
          budget: true,
          split: false,
          tagId: '1',
          accountId: '1',
        },
      ],
      payees: [
        {
          _id: '1',
          name: 'Target',
        },
      ],
      tags: [
        {
          _id: '1',
          name: 'Home',
        },
      ],
    };

    setUserData(dummyUserData);
  }, []);

  const context = {
    userData,
    setUserData,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export default UserContext;
