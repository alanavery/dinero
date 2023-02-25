import Link from 'next/link';
import { calculateBalance } from '@/helpers/balance-utils';

const AccountList = ({ userId, accounts, transactions }) => {
  return (
    <section className="accounts">
      <h2>Accounts</h2>

      <ul>
        {accounts.map((account) => {
          const accountTransactions = transactions.filter((transaction) => transaction.accountId === account._id);

          return (
            <li key={account._id}>
              <Link href={`/users/${userId}/accounts/${account._id}`}>
                <div className="account__name">{account.name}</div>
                <div>{`$${calculateBalance(account.startingBalance, accountTransactions, false)}`}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AccountList;
