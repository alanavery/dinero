import { useState } from 'react';
import { ObjectId } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import CreateAccountForm from '@/components/create-account-form';
import AccountList from '@/components/account-list';

const UserPage = (props) => {
  const [accounts, setAccounts] = useState(props.accounts);

  return (
    <main>
      <h1>{`${props.user.firstName}'s`} Page</h1>
      <AccountList accounts={accounts} />
      <CreateAccountForm userId={props.user._id} setAccounts={setAccounts} />
    </main>
  );
};

export const getStaticProps = async (context) => {
  const userId = context.params.userId;

  const usersQuery = { _id: ObjectId(userId) };
  const accountsQuery = { userId: userId };

  const user = await getOneDocument('users', usersQuery);

  const accounts = await getMultipleDocuments('accounts', accountsQuery);

  return {
    props: {
      user,
      accounts,
    },
  };
};

export const getStaticPaths = async () => {
  const users = await getMultipleDocuments('users');

  const paths = users.map((user) => {
    return {
      params: {
        userId: user._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default UserPage;
