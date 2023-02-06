import { MongoClient } from 'mongodb';
import { getMultipleDocuments } from '@/helpers/db-utils';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'GET') {
    try {
      const database = client.db('dinero');

      const userData = {
        userId: req.body.userId,
        accounts: [],
        transactions: [],
        payees: [],
        tags: [],
      };

      const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

      for (const collectionName of collectionNames) {
        userData[collectionName] = await getMultipleDocuments(database, collectionName, req.body.userId);
      }

      res.status(200).json({ userData });
    } catch (error) {
      res.status(500).json({ message: 'Unable to get user data.' });
    }
  }

  await client.close();
};

export default handler;
