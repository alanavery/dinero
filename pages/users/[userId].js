import { useContext, useEffect } from 'react';
import { MongoClient } from 'mongodb';
import UserContext from '@/store/user-context';
import CreateAccountForm from '@/components/create-account-form';
import AccountList from '@/components/account-list';
import CreateTransactionForm from '@/components/create-transaction-form';
import TransactionList from '@/components/transaction-list';

const UserPage = ({ newUserData }) => {
  const { setUserData, setActiveUserId, activeAccount, isLoading } = useContext(UserContext);

  useEffect(() => {
    setUserData(newUserData);
  }, []);

  console.log('User page is rendering.');

  return (
    <main>
      <h1>User Page</h1>

      <CreateAccountForm userId={newUserData.userId} />

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
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const newUserData = {
    userId: context.params.userId,
    accounts: [],
    transactions: [],
    payees: [],
    tags: [],
  };

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

  for (const collectionName of collectionNames) {
    const collection = database.collection(collectionName);
    const documents = await collection.find({ userId: context.params.userId }).toArray();
    const data = await JSON.parse(JSON.stringify(documents));
    newUserData[collectionName] = data;
  }

  await client.close();

  return {
    props: {
      newUserData,
    },
  };
};

export default UserPage;
