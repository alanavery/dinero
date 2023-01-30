import { useState } from 'react';
import { getMultipleDocuments } from '@/helpers/db-utils';
import CreateUserForm from '@/components/create-user-form';
import UserList from '@/components/user-list';

const HomePage = (props) => {
  const [users, setUsers] = useState(props.users);

  return (
    <main>
      <UserList users={users} />
      <CreateUserForm setUsers={setUsers} />
    </main>
  );
};

export const getStaticProps = async () => {
  const users = await getMultipleDocuments('users');

  return {
    props: {
      users,
    },
  };
};

export default HomePage;
