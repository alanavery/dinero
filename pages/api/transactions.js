import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const addTransaction = async () => {
    const database = client.db('dinero');

    const primaryDocument = {
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

    const collectionNames = ['payees', 'tags'];

    for (const collectionName of collectionNames) {
      const singularName = collectionName.slice(0, -1);

      if (req.body[singularName]) {
        const secondaryCollection = database.collection(collectionName);

        const query = {
          $and: [{ name: req.body[singularName] }, { userId: req.body.userId }],
        };

        const secondaryDocument = {
          name: req.body[singularName],
          userId: req.body.userId,
        };

        const result = await secondaryCollection.findOneAndUpdate(query, { $setOnInsert: secondaryDocument }, { upsert: true });

        primaryDocument[`${singularName}Id`] = result.value ? result.value._id.toString() : result.lastErrorObject.upserted.toString();
      }
    }

    const primaryCollection = database.collection('transactions');

    await primaryCollection.insertOne(primaryDocument);
  };

  const editTransaction = async () => {
    const database = client.db('dinero');

    const primaryDocument = {
      amount: req.body.amount,
      payeeId: null,
      date: req.body.date,
      cleared: req.body.cleared,
      budget: req.body.budget,
      split: req.body.split,
      tagId: null,
    };

    const collectionNames = ['payees', 'tags'];

    for (const collectionName of collectionNames) {
      const singularName = collectionName.slice(0, -1);

      if (req.body[singularName]) {
        const secondaryCollection = database.collection(collectionName);

        const secondaryQuery = {
          $and: [{ name: req.body[singularName] }, { userId: req.body.userId }],
        };

        const secondaryDocument = {
          name: req.body[singularName],
          userId: req.body.userId,
        };

        const result = await secondaryCollection.findOneAndUpdate(secondaryQuery, { $setOnInsert: secondaryDocument }, { upsert: true });

        primaryDocument[`${singularName}Id`] = result.value ? result.value._id.toString() : result.lastErrorObject.upserted.toString();
      }
    }

    const primaryCollection = database.collection('transactions');

    const primaryQuery = { _id: ObjectId(req.body.transactionId) };

    console.log('primaryDocument:', primaryDocument);
    console.log('primaryQuery:', primaryQuery);

    await primaryCollection.updateOne(primaryQuery, { $set: primaryDocument });
  };

  const deleteTransaction = async () => {
    const database = client.db('dinero');

    const collection = database.collection('transactions');

    const query = { _id: ObjectId(req.body.transactionId) };

    await collection.deleteOne(query);
  };

  if (req.method === 'POST') {
    try {
      await addTransaction();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to add transaction' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'PUT') {
    try {
      await editTransaction();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to edit transaction' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteTransaction();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to delete account' });
    } finally {
      await client.close();
    }
  } else {
    await client.close();
  }
};

export default handler;
