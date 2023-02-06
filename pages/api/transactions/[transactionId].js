import { MongoClient, ObjectId } from 'mongodb';
import { getMultipleDocuments } from '@/helpers/db-utils';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    if (req.body.toggleStatus) {
      try {
        const database = client.db('dinero');

        const collection = database.collection('transactions');

        const filter = { _id: ObjectId(req.query.transactionId) };

        const updateDoc = {
          $set: {
            cleared: req.body.cleared,
          },
        };

        await collection.updateOne(filter, updateDoc);

        const transactionData = {};

        const collectionNames = ['transactions', 'payees', 'tags'];

        for (const collectionName of collectionNames) {
          transactionData[collectionName] = await getMultipleDocuments(database, collectionName, req.body.userId);
        }

        res.status(201).json({ message: 'Transaction updated.', transactionData });
      } catch (error) {
        res.status(500).json({ message: 'Unable to create new transaction.' });
      }
    }

    await client.close();
  }
};

export default handler;
