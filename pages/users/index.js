import { useState } from 'react';
import { MongoClient } from 'mongodb';
import { getMultipleDocuments } from '@/helpers/db-utils';
import CreateUserForm from '@/components/create-user-form';
import UserList from '@/components/user-list';

const UsersPage = (props) => {
  const [users, setUsers] = useState(props.users);

  return (
    <main>
      <CreateUserForm setUsers={setUsers} />
      <UserList users={users} />
    </main>
  );
};

export const getServerSideProps = async () => {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}?retryWrites=true&w=majority`);

  const database = client.db('dinero');

  const users = await getMultipleDocuments(database, 'users');

  await client.close();

  return {
    props: {
      users,
    },
  };
};

export default UsersPage;
