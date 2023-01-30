import { MongoClient, ObjectId } from 'mongodb';

const UserPage = (props) => {
  return (
    <main>
      <h1>{`${props.user.firstName}'s`} Page</h1>
    </main>
  );
};

export const getStaticProps = async (context) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');
  const collection = database.collection('users');

  const query = { _id: ObjectId(context.params.userId) };

  const document = await collection.findOne(query);

  const user = await JSON.parse(JSON.stringify(document));

  await client.close();

  return {
    props: {
      user,
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
