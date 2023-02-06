import { MongoClient } from 'mongodb';
import { getMultipleDocuments } from '@/helpers/db-utils';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    try {
      const newAccount = {
        name: req.body.name,
        startingBalance: req.body.balance,
        clearedBalance: req.body.balance,
        pendingBalance: req.body.balance,
        creditAccount: req.body.creditAccount,
        creditLimit: req.body.creditLimit,
        userId: req.body.userId,
      };

      const database = client.db('dinero');

      const collection = database.collection('accounts');

      await collection.insertOne(newAccount);

      const accounts = await getMultipleDocuments(database, 'accounts', req.body.userId);

      res.status(201).json({ message: 'Account created.', accounts });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create new account.' });
    }
  }

  await client.close();
};

export default handler;
