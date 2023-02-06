import { useContext, useEffect } from 'react';
import UserContext from '@/store/user-context';
import CreateAccountForm from './create-account-form';
import AccountList from './account-list';
import CreateTransactionForm from './create-transaction-form';
import TransactionList from './transaction-list';

const UserDashboard = () => {
  const { userId, activeAccount } = useContext(UserContext);

  return (
    <>
      <CreateAccountForm userId={userId} />

      {activeAccount ? (
        <>
          <AccountList />
          <CreateTransactionForm />
          <TransactionList />
        </>
      ) : (
        <p>No accounts</p>
      )}
    </>
  );
};

export default UserDashboard;
