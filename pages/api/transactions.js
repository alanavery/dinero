import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  if (req.method === 'POST') {
    try {
      const database = client.db('dinero');

      let payeeId;

      const payeeCollection = database.collection('payees');
      const payeeDocument = await payeeCollection.findOne({ name: req.body.payee });

      if (!payeeDocument) {
        const newPayee = {
          name: req.body.payee,
        };

        const payeeResult = await payeeCollection.insertOne(newPayee);
        payeeId = payeeResult.insertedId.toString();
      } else {
        payeeId = payeeDocument._id;
      }

      let tagId;

      if (req.body.tag) {
        const tagCollection = database.collection('tags');
        const tagDocument = await tagCollection.findOne({ name: req.body.tag });

        if (!tagDocument) {
          const newTag = {
            name: req.body.tag,
          };

          const tagResult = await tagCollection.insertOne(newTag);
          tagId = tagResult.insertedId.toString();
        } else {
          tagId = tagDocument._id;
        }
      }

      const transactionCollection = database.collection('transactions');

      const newTransaction = {
        amount: req.body.amount,
        payeeId,
        date: req.body.date,
        cleared: req.body.cleared,
        budget: req.body.budget,
        split: req.body.split,
        tagId,
        accountId: req.body.accountId,
      };

      const transactionResult = await transactionCollection.insertOne(newTransaction);

      const transactionDocuments = await transactionCollection.find({ accountId: req.body.accountId }).toArray();

      const transactionData = await JSON.parse(JSON.stringify(transactionDocuments));

      res.status(201).json({ message: 'Account created.', transactionData });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create new account.' });
    }
  }

  await client.close();
};

export default handler;
