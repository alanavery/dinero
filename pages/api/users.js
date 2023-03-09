import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const addUser = async () => {
    const database = client.db('dinero');
    const collection = database.collection('users');
    const document = {
      firstName: req.body.firstName,
    };

    await collection.insertOne(document);
  };

  const editUser = async () => {
    const database = client.db('dinero');
    const collection = database.collection('users');
    const query = { _id: ObjectId(req.body.userId) };
    const document = {
      $set: {
        firstName: req.body.firstName,
      },
    };
    
    await collection.updateOne(query, document);
  };

  const deleteUser = async () => {
    const database = client.db('dinero');
    const collectionNames = ['users', 'accounts', 'transactions', 'payees', 'tags'];

    for (const collectionName of collectionNames) {
      const collection = database.collection(collectionName);

      if (collectionName === 'users') {
        const query = { _id: ObjectId(req.body.userId) };
        await collection.deleteOne(query);
      } else {
        const query = { userId: req.body.userId };
        await collection.deleteMany(query);
      }
    }
  };

  if (req.method === 'POST') {
    try {
      await addUser();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to add user' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'PUT') {
    try {
      await editUser();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to edit user' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteUser();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Unable to delete user' });
    } finally {
      await client.close();
    }
  } else {
    await client.close();
  }
};

export default handler;
