import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument } from '@/helpers/db-utils';
import EditAccountForm from '@/components/forms/edit-account-form';

const EditAccountPage = (props) => {
  return (
    <main>
      <EditAccountForm userId={props.userId} accountId={props.accountId} account={props.account} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;
  const accountId = context.params.accountId;

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);
  
  const database = client.db('dinero');

  const account = await getOneDocument(database, 'accounts', { _id: ObjectId(accountId) });

  await client.close();

  return {
    props: {
      userId,
      accountId,
      account,
    },
  };
};

export default EditAccountPage;
