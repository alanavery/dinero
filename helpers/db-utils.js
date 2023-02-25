export const getOneDocument = async (database, collectionName, query) => {
  const collection = database.collection(collectionName);

  const document = await collection.findOne(query);

  const data = await JSON.parse(JSON.stringify(document));

  return data;
};

export const getMultipleDocuments = async (database, collectionName, query) => {
  const collection = database.collection(collectionName);

  const documents = await collection.find(query).toArray();

  const data = await JSON.parse(JSON.stringify(documents));

  return data;
};
