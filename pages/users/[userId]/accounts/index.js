import Link from 'next/link';
import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import AccountList from '@/components/account-list';

const AccountsPage = (props) => {
  return (
    <main>
      <Link className="button button--primary" href={`/users/${props.userId}/accounts/add`}>Add Account</Link>

      <AccountList userId={props.userId} user={props.user} accounts={props.accounts} transactions={props.transactions} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;

  const props = {
    userId,
    user: {},
    accounts: [],
    transactions: [],
  };

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collectionNames = ['users', 'accounts', 'transactions'];

  for (const collectionName of collectionNames) {
    if (collectionName === 'users') {
      props.user = await getOneDocument(database, 'users', { _id: ObjectId(userId) });
    } else {
      props[collectionName] = await getMultipleDocuments(database, collectionName, { userId });
    }
  }

  await client.close();

  return {
    props,
  };
};

export default AccountsPage;
