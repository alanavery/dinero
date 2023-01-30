import { MongoClient } from 'mongodb';

const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

export const getAllDocuments = async (databaseName, collectionName) => {
  const database = client.db(databaseName);
  const collection = database.collection(collectionName);

  const documents = await collection.find().toArray();

  return documents;
};
