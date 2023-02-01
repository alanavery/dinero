import { useContext, useState, useEffect } from 'react';
// import { ObjectId } from 'mongodb';
import UserContext from '@/store/user-context';
// import { getOneDocument, getMultipleDocuments } from '@/helpers/db-utils';
// import CreateAccountForm from '@/components/create-account-form';
// import AccountList from '@/components/account-list';
// import TransactionList from '@/components/transaction-list';
// import CreateTransactionForm from '@/components/create-transaction-form';

const UserPage = ({ userData, accountData }) => {
  // const [accounts, setAccounts] = useState(accountData);
  // const [selectedAccount, setSelectedAccount] = useState(accountData[0] ? accountData[0] : undefined);

  // return (
  //   <main>
  //     <h1>{`${userData.firstName}'s`} Page</h1>
  //     <AccountList accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
  //     <CreateAccountForm userId={userData._id} accounts={accounts} setAccounts={setAccounts} setSelectedAccount={setSelectedAccount} />
  //     {selectedAccount && (
  //       <>
  //         <TransactionList selectedAccount={selectedAccount} />
  //         <CreateTransactionForm accountId={selectedAccount._id} />
  //       </>
  //     )}
  //   </main>
  // );

  const userCtx = useContext(UserContext);

  return (
    <main>
      <h1>User Page</h1>

      {userCtx.userData.accounts && (
        <ul>
          {userCtx.userData.accounts.map((account) => {
            return <li key={account._id}>{account.name}</li>;
          })}
        </ul>
      )}
    </main>
  );
};

// export const getStaticProps = async (context) => {
//   // const userId = context.params.userId;

//   // const usersQuery = { _id: ObjectId(userId) };
//   // const accountsQuery = { userId: userId };

//   // const userData = await getOneDocument('users', usersQuery);

//   // const accountData = await getMultipleDocuments('accounts', accountsQuery);

//   // return {
//   //   props: {
//   //     userData,
//   //     accountData,
//   //   },
//   // };

//   import { useContext } from 'react';

//   const userCtx = useContext(UserContext);

//   const dummyUserData = {
//     accounts: [
//       {
//         _id: '1',
//         name: 'Checking',
//         balance: '1000',
//         creditAccount: false,
//         creditLimit: null,
//         userId: '63d6ec6b959e8bacbc61be18',
//       },
//     ],
//     transactions: [
//       {
//         _id: '1',
//         amount: '10',
//         payeeId: '1',
//         date: '2023-01-01',
//         cleared: false,
//         budget: true,
//         split: false,
//         tagId: '1',
//         accountId: '1',
//       },
//     ],
//     payees: [
//       {
//         _id: '1',
//         name: 'Target',
//       },
//     ],
//     tags: [
//       {
//         _id: '1',
//         name: 'Home',
//       },
//     ],
//   };

//   return {
//     props: {
//       userData: userCtx.userData,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   // const userData = await getMultipleDocuments('users');

//   // const paths = userData.map((user) => {
//   //   return {
//   //     params: {
//   //       userId: user._id,
//   //     },
//   //   };
//   // });

//   // return {
//   //   paths,
//   //   fallback: false,
//   // };

//   return {
//     paths: [
//       {
//         params: {
//           userId: '63d6ec6b959e8bacbc61be18',
//         },
//       },
//     ],
//     fallback: true,
//   };
// };

export default UserPage;
