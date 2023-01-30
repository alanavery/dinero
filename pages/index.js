import { useState } from 'react';
import { getAllDocuments } from '@/helpers/db-utils';
import CreateUserForm from '@/components/create-user-form';
import UserList from '@/components/user-list';

const HomePage = (props) => {
  const [users, setUsers] = useState(props.users);

  return (
    <main>
      <h1>Home Page</h1>
      <UserList users={users} />
      <CreateUserForm setUsers={setUsers} />
    </main>
  );
};

export const getStaticProps = async () => {
  const users = await getAllDocuments('users');

  return {
    props: {
      users,
    },
  };
};

export default HomePage;
