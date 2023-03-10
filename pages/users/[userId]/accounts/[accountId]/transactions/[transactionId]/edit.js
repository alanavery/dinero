import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument } from '@/helpers/db-utils';
import EditTransactionForm from '@/components/forms/edit-transaction-form';

const EditTransactionPage = (props) => {
  return (
    <main>
      <EditTransactionForm userId={props.userId} accountId={props.accountId} transactionId={props.transactionId} transaction={props.transaction} payee={props.payee} tag={props.tag} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;
  const accountId = context.params.accountId;
  const transactionId = context.params.transactionId;

  const props = {
    userId,
    accountId,
    transactionId,
    transaction: {},
    payee: {},
    tag: {},
  };

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  props.transaction = await getOneDocument(database, 'transactions', { _id: ObjectId(transactionId) });

  const collectionNames = ['payees', 'tags'];

  for (const collectionName of collectionNames) {
    const singularName = collectionName.slice(0, -1);

    props[singularName] = await getOneDocument(database, collectionName, { _id: ObjectId(props.transaction[`${singularName}Id`]) });
  }

  await client.close();

  return { props };
};

export default EditTransactionPage;
