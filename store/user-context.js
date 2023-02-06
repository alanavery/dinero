import { createContext, useState, useRef, useEffect } from 'react';

const UserContext = createContext({
  userId: '',
  setUserId: () => {},
  accounts: '',
  setAccounts: () => {},
  activeAccount: '',
  setActiveAccount: () => {},
  transactionData: '',
  setTransactionData: () => {},
});

export const UserContextProvider = ({ children, userData }) => {
  const [userId, setUserId] = useState(userData.userId);
  const [accounts, setAccounts] = useState(userData.accounts);
  const [activeAccount, setActiveAccount] = useState('');
  const [transactionData, setTransactionData] = useState({
    transactions: userData.transactions,
    payees: userData.payees,
    tags: userData.tags,
  });

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      setActiveAccount(accounts[0]);
      initialRender.current = false;
    } else {
      setActiveAccount(accounts[accounts.length - 1]);
    }
  }, [accounts]);

  const context = {
    userId,
    setUserId,
    accounts,
    setAccounts,
    activeAccount,
    setActiveAccount,
    transactionData,
    setTransactionData,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export default UserContext;
