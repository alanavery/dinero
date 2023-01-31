import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    try {
      const database = client.db('dinero');
      const collection = database.collection('accounts');

      const newAccount = {
        name: req.body.name,
        balance: req.body.balance,
        creditAccount: req.body.creditAccount,
        creditLimit: req.body.creditLimit,
        userId: req.body.userId,
      };

      const result = await collection.insertOne(newAccount);

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
