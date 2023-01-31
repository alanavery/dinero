import { useState } from 'react';
import { getMultipleDocuments } from '@/helpers/db-utils';
import CreateUserForm from '@/components/create-user-form';
import UserList from '@/components/user-list';

const HomePage = ({ userData }) => {
  const [users, setUsers] = useState(userData);

  return (
    <main>
      <UserList users={users} />
      <CreateUserForm setUsers={setUsers} />
    </main>
  );
};

export const getStaticProps = async () => {
  const userData = await getMultipleDocuments('users');

  return {
    props: {
      userData,
    },
  };
};

export default HomePage;
