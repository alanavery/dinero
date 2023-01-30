import { useState } from 'react';
import { ObjectId } from 'mongodb';
import { getOneDocument, getAllDocuments } from '@/helpers/db-utils';
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
  const query = { _id: ObjectId(context.params.userId) };

  const user = await getOneDocument('users', query);

  const accounts = await getAllDocuments('accounts');

  return {
    props: {
      user,
      accounts,
    },
  };
};

export const getStaticPaths = async () => {
  const users = await getAllDocuments('users');

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
