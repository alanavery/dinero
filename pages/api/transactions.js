import { MongoClient } from 'mongodb';

const getNewUserData = async (database, userId) => {
  const newUserData = {};

  const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

  for (const collectionName of collectionNames) {
    const collection = database.collection(collectionName);
    const documents = await collection.find({ userId }).toArray();
    const data = await JSON.parse(JSON.stringify(documents));
    newUserData[collectionName] = data;
  }

  return newUserData;
};

const handler = async (req, res) => {
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

      const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

      const database = client.db('dinero');

      const collectionNames = ['payees', 'tags'];

      for (const collectionName of collectionNames) {
        const singularName = collectionName.slice(0, -1);

        if (req.body[singularName]) {
          const collection = database.collection(collectionName);
          const document = await collection.findOne({ name: req.body[singularName] });

          if (document) {
            newTransaction[`${singularName}Id`] = document._id;
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
      const result = await collection.insertOne(newTransaction);

      const newUserData = await getNewUserData(database, req.body.userId);

      await client.close();

      res.status(201).json({ message: 'Transaction created.', newUserData });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create new transaction.' });
    }
  }
};

export default handler;
