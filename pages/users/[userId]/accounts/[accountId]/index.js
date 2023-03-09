import { useState } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import CreateTransactionForm from '@/components/forms/create-transaction-form';
import TransactionList from '@/components/transaction-list';

const AccountPage = (props) => {
  const [transactions, setTransactions] = useState(props.transactions);
  const [payees, setPayees] = useState(props.payees);
  const [tags, setTags] = useState(props.tags);

  return (
    <main>
      <h2>{props.account.name}</h2>

      <CreateTransactionForm userId={props.userId} accountId={props.accountId} setTransactions={setTransactions} setPayees={setPayees} setTags={setTags} />

      <TransactionList userId={props.userId} accountId={props.accountId} account={props.account} transactions={transactions} payees={payees} tags={tags} setTransactions={setTransactions} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;
  const accountId = context.params.accountId;

  const props = {
    userId,
    accountId,
  };

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

  for (const collectionName of collectionNames) {
    if (collectionName === 'accounts') {
      props['account'] = await getOneDocument(database, 'accounts', { _id: ObjectId(accountId) });
    } else {
      props[collectionName] = await getMultipleDocuments(database, collectionName, { userId });
    }
  }

  await client.close();

  return {
    props,
  };
};

export default AccountPage;
