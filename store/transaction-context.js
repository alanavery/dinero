import { createContext, useState, useEffect } from 'react';

const TransactionContext = createContext({
  userId: '',
  accountId: '',
  account: '',
  transactions: '',
  setTransactions: () => {},
  payees: '',
  tags: '',
  showCleared: '',
  setShowCleared: () => {},
  pending: '',
  setPending: () => {},
});

export const TransactionContextProvider = ({ children, props }) => {
  const [userId, setUserId] = useState(props.userId);
  const [accountId, setAccountId] = useState(props.accountId);
  const [account, setAccount] = useState(props.account);
  const [transactions, setTransactions] = useState(props.transactions);
  const [payees, setPayees] = useState(props.payees);
  const [tags, setTags] = useState(props.tags);
  const [showCleared, setShowCleared] = useState(false);
  const [pending, setPending] = useState(false);

  const context = {
    userId,
    accountId,
    account,
    transactions,
    setTransactions,
    payees,
    tags,
    showCleared,
    setShowCleared,
    pending,
    setPending,
  };

  return <TransactionContext.Provider value={context}>{children}</TransactionContext.Provider>;
};

export default TransactionContext;
