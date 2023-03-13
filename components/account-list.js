import { useState } from 'react';
import Link from 'next/link';
import { calculateBalance } from '@/helpers/balance-utils';

const AccountList = ({ userId, user, accounts, transactions }) => {
  const totalStartingBalance = accounts.reduce((a, b) => a + b.startingBalance, 0);

  return (
    <section className="accounts">
      <h2>{`${user.firstName}'s Accounts`}</h2>

      <div className="accounts__summary">
        <div>
          <div>Total Balance:</div>
          <div>{`$${calculateBalance(totalStartingBalance, transactions)}`}</div>
        </div>

        <div>
          <div>Cleared Balance:</div>
          <div>{`$${calculateBalance(totalStartingBalance, transactions, 'cleared')}`}</div>
        </div>

        <div>
          <div>Monthly Budget:</div>
          <div>{`$${calculateBalance(totalStartingBalance, transactions, 'budget')}`}</div>
        </div>
      </div>

      <ul>
        {accounts.map((account) => {
          const accountTransactions = transactions.filter((transaction) => transaction.accountId === account._id);

          return (
            <li key={account._id}>
              <div className="list__item__text">
                <Link href={`/users/${userId}/accounts/${account._id}/transactions`}>{account.name}</Link>

                <div>{`$${calculateBalance(account.startingBalance, accountTransactions)}`}</div>
              </div>

              <div className="list__item__buttons">
                <Link className="button" href={`/users/${userId}/accounts/${account._id}/edit`}>
                  Edit
                </Link>

                <Link className="button" href={`/users/${userId}/accounts/${account._id}/delete`}>
                  Delete
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AccountList;
