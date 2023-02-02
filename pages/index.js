import { useState } from 'react';
import { MongoClient } from 'mongodb';
import CreateUserForm from '@/components/create-user-form';
import UserList from '@/components/user-list';

const HomePage = ({ usersData }) => {
  const [users, setUsers] = useState(usersData);

  console.log('Home page is rendering.');

  return (
    <main>
      <UserList users={users} />
      <CreateUserForm setUsers={setUsers} />
    </main>
  );
};

export const getStaticProps = async () => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const collection = database.collection('users');

  const documents = await collection.find().toArray();

  const usersData = await JSON.parse(JSON.stringify(documents));

  await client.close();

  return {
    props: {
      usersData,
    },
  };
};

export default HomePage;
