import { useState } from 'react';
import { ObjectId } from 'mongodb';
import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
import CreateAccountForm from '@/components/create-account-form';
import AccountList from '@/components/account-list';
import TransactionList from '@/components/transaction-list';
import CreateTransactionForm from '@/components/create-transaction-form';

const UserPage = ({ userData, accountData, transactionData }) => {
  const [accounts, setAccounts] = useState(accountData);
  const [selectedAccount, setSelectedAccount] = useState(accountData[0] ? accountData[0] : undefined);
  const [transactions, setTransactions] = useState(transactionData);

  return (
    <main>
      <h1>{`${userData.firstName}'s`} Page</h1>

      <AccountList accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      <CreateAccountForm userId={userData._id} accounts={accounts} setAccounts={setAccounts} setSelectedAccount={setSelectedAccount} />

      {selectedAccount && (
        <>
          <TransactionList selectedAccount={selectedAccount} transactions={transactions} />
          <CreateTransactionForm accountId={selectedAccount._id} />
        </>
      )}
    </main>
  );
};

export const getStaticProps = async (context) => {
  const userId = context.params.userId;

  const userQuery = { _id: ObjectId(userId) };
  const userData = await getOneDocument('users', userQuery);

  const accountQuery = { userId: userId };
  const accountData = await getMultipleDocuments('accounts', accountQuery);

  let transactionData = [];

  if (accountData) {
    const transactionQuery = { accountId: accountData[0]._id };
    transactionData = await getMultipleDocuments('transactions', transactionQuery);
  }

  return {
    props: {
      userData,
      accountData,
      transactionData,
    },
  };
};

export const getStaticPaths = async () => {
  const userData = await getMultipleDocuments('users');

  const paths = userData.map((user) => {
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
