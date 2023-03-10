import Link from 'next/link';
import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import TransactionList from '@/components/transaction-list';

const TransactionsPage = (props) => {
  return (
    <main>
      <h2>{props.account.name}</h2>

      <Link href={`/users/${props.userId}/accounts/${props.accountId}/transactions/add`}>Add Transaction</Link>

      <TransactionList userId={props.userId} accountId={props.accountId} account={props.account} transactions={props.transactions} payees={props.payees} tags={props.tags} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;
  const accountId = context.params.accountId;

  const props = {
    userId,
    accountId,
    account: {},
    transactions: [],
    payees: [],
    tags: [],
  };

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

  for (const collectionName of collectionNames) {
    if (collectionName === 'accounts') {
      props.account = await getOneDocument(database, 'accounts', { _id: ObjectId(accountId) });
    } else {
      props[collectionName] = await getMultipleDocuments(database, collectionName, { userId });
    }
  }

  await client.close();

  return {
    props,
  };
};

export default TransactionsPage;
