import { useContext, useEffect } from 'react';
import { MongoClient } from 'mongodb';
import UserContext from '@/store/user-context';
import CreateAccountForm from '@/components/create-account-form';
import AccountList from '@/components/account-list';
import CreateTransactionForm from '@/components/create-transaction-form';
import TransactionList from '@/components/transaction-list';

const UserPage = ({ newUserData }) => {
  const { setUserData, activeAccount, setActiveAccount } = useContext(UserContext);

  useEffect(() => {
    setUserData(newUserData);

    if (newUserData.accounts[0]) {
      setActiveAccount(newUserData.accounts[0]);
    }
  }, []);

  return (
    <main>
      <h1>User Page</h1>

      <CreateAccountForm />

      {activeAccount ? (
        <>
          <AccountList />
          <CreateTransactionForm />
          <TransactionList />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const activeUserId = '63d6ec6b959e8bacbc61be18';

  const newUserData = {};

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

  for (const collectionName of collectionNames) {
    const collection = database.collection(collectionName);
    const documents = await collection.find({ userId: activeUserId }).toArray();
    const data = await JSON.parse(JSON.stringify(documents));
    newUserData[collectionName] = data;
  }

  client.close();

  return {
    props: {
      newUserData,
    },
  };
};

export default UserPage;
