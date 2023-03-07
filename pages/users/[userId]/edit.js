import { MongoClient, ObjectId } from 'mongodb';
import { getOneDocument } from '@/helpers/db-utils';
import EditUserForm from '@/components/forms/edit-user-form';

const EditUserPage = (props) => {
  return (
    <main>
      <EditUserForm user={props.user} />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;

  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);
  const database = client.db('dinero');
  const user = await getOneDocument(database, 'users', { _id: ObjectId(userId) });

  await client.close();

  return {
    props: {
      user,
    },
  };
};

export default EditUserPage;
