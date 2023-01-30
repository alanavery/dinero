import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  return client;
};

export const getAllDocuments = async (collectionName) => {
  const client = await connectDatabase();

  const database = client.db('dinero');
  const collection = database.collection(collectionName);

  const documents = await collection.find().toArray();

  const data = await JSON.parse(JSON.stringify(documents));

  await client.close();

  return data;
};

export const getOneDocument = async (collectionName, query) => {
  const client = await connectDatabase();

  const database = client.db('dinero');
  const collection = database.collection(collectionName);

  const documents = await collection.findOne(query);

  const data = await JSON.parse(JSON.stringify(documents));

  await client.close();

  return data;
};
