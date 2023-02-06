export const getMultipleDocuments = async (database, collectionName, userId) => {
  const collection = database.collection(collectionName);
  const documents = await collection.find({ userId }).toArray();
  const data = await JSON.parse(JSON.stringify(documents));
  return data;
};
