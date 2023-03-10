import Link from 'next/link';
import { calculateBalance } from '@/helpers/balance-utils';

const AccountList = ({ userId, user, accounts, transactions }) => {
  return (
    <section className="accounts">
      <h2>{`${user.firstName}'s Accounts`}</h2>

      <ul>
        {accounts.map((account) => {
          const accountTransactions = transactions.filter((transaction) => transaction.accountId === account._id);

          return (
            <li key={account._id}>
              <Link href={`/users/${userId}/accounts/${account._id}/transactions`}>{account.name}</Link>
              <div>{`$${calculateBalance(account.startingBalance, accountTransactions, false)}`}</div>
              <Link href={`/users/${userId}/accounts/${account._id}/edit`}>Edit</Link>
              <Link href={`/users/${userId}/accounts/${account._id}/delete`}>Delete</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AccountList;
