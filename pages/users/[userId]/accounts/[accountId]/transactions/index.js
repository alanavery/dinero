import Link from 'next/link';
import { MongoClient, ObjectId } from 'mongodb';
import { TransactionContextProvider } from '@/store/transaction-context';
import TransactionList from '@/components/transactions/transaction-list';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import AddButton from '@/components/ui/add-button';
import styles from '@/styles/transactions-page.module.scss';

const TransactionsPage = (props) => {
  return (
    <TransactionContextProvider props={props}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link className={styles.button} href={`/users/${props.userId}/accounts`}>
            Back
          </Link>

          <h2 className={styles.heading}>{props.account.name}</h2>
        </div>

        {props.transactions.length >= 1 && <TransactionList />}

        <AddButton resolvedUrl={props.resolvedUrl} />
      </main>
    </TransactionContextProvider>
  );
};

export const getServerSideProps = async (context) => {
  const resolvedUrl = context.resolvedUrl;
  const userId = context.params.userId;
  const accountId = context.params.accountId;

  const props = {
    resolvedUrl,
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
    } else if (collectionName === 'transactions') {
      props.transactions = await getMultipleDocuments(database, 'transactions', { accountId });
    } else {
      props[collectionName] = await getMultipleDocuments(database, collectionName, { userId });
    }
  }

  await client.close();

  return { props };
};

export default TransactionsPage;
