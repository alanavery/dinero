import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const addUser = async () => {
    const database = client.db('dinero');
    const collection = database.collection('users');
    const document = {
      firstName: req.body.firstName,
    };
    await collection.insertOne(document);
  };

  if (req.method === 'POST') {
    try {
      await addUser();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to add user' });
    } finally {
      await client.close();
    }
  } else {
    await client.close();
  }
};

export default handler;
