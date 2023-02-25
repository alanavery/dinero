import { useState } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import CreateAccountForm from '@/components/create-account-form';
import AccountList from '@/components/account-list';

const UserPage = (props) => {
  const [accounts, setAccounts] = useState(props.accounts);

  return (
    <main>
      <h2>{`${props.user.firstName}'s Profile`}</h2>

      <CreateAccountForm userId={props.userId} setAccounts={setAccounts} />

      <AccountList userId={props.userId} accounts={accounts} transactions={props.transactions} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;

  const props = {
    userId,
  };

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collectionNames = ['users', 'accounts', 'transactions'];

  for (const collectionName of collectionNames) {
    if (collectionName === 'users') {
      props['user'] = await getOneDocument(database, 'users', { _id: ObjectId(userId) });
    } else {
      props[collectionName] = await getMultipleDocuments(database, collectionName, { userId });
    }
  }

  await client.close();

  return {
    props,
  };
};

export default UserPage;
