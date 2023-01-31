import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    try {
      const database = client.db('dinero');
      const collection = database.collection('transactions');

      const newTransaction = {
        amount: req.body.amount,
        payee: req.body.payee,
        date: req.body.date,
        cleared: req.body.cleared,
        budget: req.body.budget,
        split: req.body.split,
        tag: req.body.tag,
        accountId: req.body.accountId,
      };

      const result = await collection.insertOne(newTransaction);

      const documents = await collection.find({ userId: req.body.userId }).toArray();

      const accountData = await JSON.parse(JSON.stringify(documents));

      res.status(201).json({ message: 'Account created.', result, accountData });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create new account.' });
    }
  }

  await client.close();
};

export default handler;
