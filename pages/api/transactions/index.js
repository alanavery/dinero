import { MongoClient } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    try {
      const newTransaction = {
        amount: req.body.amount,
        payeeId: null,
        date: req.body.date,
        cleared: req.body.cleared,
        budget: req.body.budget,
        split: req.body.split,
        tagId: null,
        userId: req.body.userId,
        accountId: req.body.accountId,
      };

      const database = client.db('dinero');

      const collectionNames1 = ['payees', 'tags'];

      for (const collectionName of collectionNames1) {
        const singularName = collectionName.slice(0, -1);

        if (req.body[singularName]) {
          const document = await getOneDocument(database, collectionName, { name: req.body[singularName] });

          if (document) {
            newTransaction[`${singularName}Id`] = document._id.toString();
          } else {
            const newDocument = {
              name: req.body[singularName],
              userId: req.body.userId,
            };

            const result = await collection.insertOne(newDocument);

            newTransaction[`${singularName}Id`] = result.insertedId.toString();
          }
        }
      }

      const collection = database.collection('transactions');

      await collection.insertOne(newTransaction);

      const transactionData = {};

      const collectionNames2 = ['transactions', 'payees', 'tags'];

      for (const collectionName of collectionNames2) {
        transactionData[collectionName] = await getMultipleDocuments(database, collectionName, { userId: req.body.userId });
      }

      res.status(201).json({ message: 'Transaction created.', transactionData });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create new transaction.' });
    }

    await client.close();
  }
};

export default handler;
