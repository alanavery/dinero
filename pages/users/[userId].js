import { useState } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import CreateAccountForm from '@/components/create-account-form';
import AccountList from '@/components/account-list';

const UserPage = (props) => {
  const [accounts, setAccounts] = useState(props.accounts);

  return (
    <main>
      <h1>{`${props.user.firstName}'s`} Page</h1>
      <AccountList accounts={accounts} />
      <CreateAccountForm userId={props.user._id} setAccounts={setAccounts} />
    </main>
  );
};

export const getStaticProps = async (context) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');
  const usersCollection = database.collection('users');
  const accountsCollection = database.collection('accounts');

  const query = { _id: ObjectId(context.params.userId) };

  const userDocument = await usersCollection.findOne(query);

  const user = await JSON.parse(JSON.stringify(userDocument));

  const accountsDocuments = await accountsCollection.find().toArray();

  const accounts = await JSON.parse(JSON.stringify(accountsDocuments));

  await client.close();

  return {
    props: {
      user,
      accounts,
    },
  };
};

export const getStaticPaths = async () => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');
  const collection = database.collection('users');

  const documents = await collection.find().toArray();

  const users = await JSON.parse(JSON.stringify(documents));

  await client.close();

  const paths = users.map((user) => {
    return {
      params: {
        userId: user._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default UserPage;
