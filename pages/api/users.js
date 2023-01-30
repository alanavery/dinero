import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${'test'}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    try {
      const database = client.db('dinero');
      const collection = database.collection('users');

      const newUser = {
        firstName: req.body.firstName,
      };

      await collection.insertOne(newUser);

      const documents = await collection.find().toArray();

      const users = await JSON.parse(JSON.stringify(documents));

      res.status(201).json({ message: 'User created.', users });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create new user.' });
    }
  }

  await client.close();
};

export default handler;
