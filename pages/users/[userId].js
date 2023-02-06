import { MongoClient } from 'mongodb';
import { UserContextProvider } from '@/store/user-context';
import UserDashboard from '@/components/user-dashboard';

const UserPage = ({ userData }) => {
  console.log('User page is rendering.');

  return (
    <main>
      <h1>User Page</h1>
      {userData ? (
        <UserContextProvider userData={userData}>
          <UserDashboard />
        </UserContextProvider>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userData = {
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
    userData[collectionName] = data;
  }

  await client.close();

  return {
    props: {
      userData,
    },
  };
};

export default UserPage;
