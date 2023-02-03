import { useContext, useEffect } from 'react';
import UserContext from '@/store/user-context';
import CreateAccountForm from './create-account-form';
import AccountList from './account-list';
import CreateTransactionForm from './create-transaction-form';
import TransactionList from './transaction-list';

const UserDashboard = ({ userId }) => {
  const { userData, setUserData, setActiveUserId, activeAccount, isLoading } = useContext(UserContext);

  // useEffect(() => {
  //   if (!userData) {
  //     axios
  //       .post('/api/users', formData)
  //       .then((response) => {
  //         console.log(response);
  //         setUserData(response.data.newUserData);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setMessage(error.response.data.message);
  //       });
  //   }
  // });

  return (
    <>
      <CreateAccountForm userId={userId} />

      {isLoading ? (
        <p>Loading...</p>
      ) : activeAccount ? (
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
