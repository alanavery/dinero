export const getNewUserData = async (database, userId) => {
  const newUserData = {
    userId: userId,
    accounts: [],
    transactions: [],
    payees: [],
    tags: [],
  };

  const collectionNames = ['accounts', 'transactions', 'payees', 'tags'];

  for (const collectionName of collectionNames) {
    const collection = database.collection(collectionName);
    const documents = await collection.find({ userId }).toArray();
    const data = await JSON.parse(JSON.stringify(documents));
    newUserData[collectionName] = data;
  }

  return newUserData;
};
