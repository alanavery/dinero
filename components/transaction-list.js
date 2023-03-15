import { useState } from 'react';
import Link from 'next/link';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = ({ userId, accountId, account, transactions, payees, tags }) => {
  const [showCleared, setShowCleared] = useState(false);

  const accountTransactions = transactions.filter((transaction) => transaction.accountId === accountId);
  const sortedAccountTransactions = accountTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="transactions">
      {accountTransactions.length >= 1 && (
        <>
          <div className="transactions__summary">
            <div>
              <div>Account Balance:</div>
              <div>{`$${calculateBalance(account.startingBalance, accountTransactions)}`}</div>
            </div>

            <div>
              <div>Cleared Balance:</div>
              <div>{`$${calculateBalance(account.startingBalance, accountTransactions, 'cleared')}`}</div>
            </div>
          </div>

          <ul>
            {sortedAccountTransactions.map((transaction) => {
              const payee = payees.find((payee) => payee._id === transaction.payeeId);
              const tag = tags.find((tag) => tag._id === transaction.tagId);

              if (showCleared || (!showCleared && !transaction.cleared)) {
                return (
                  <li key={transaction._id}>
                    <div className="list__item__text">
                      <div>{transaction.date}</div>
                      <div className={transaction.split ? 'split' : false}>{payee && payee.name}</div>
                      <div>{`$${transaction.amount.toFixed(2)}`}</div>
                      {transaction.tag && <div>{tag && tag.name}</div>}
                    </div>

                    <div className="list__item__buttons">
                      <Link className="button" href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/edit`}>
                        Edit
                      </Link>
                      <Link className="button" href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/delete`}>
                        Delete
                      </Link>
                    </div>
                  </li>
                );
              }
            })}
          </ul>

          <button onClick={() => setShowCleared(showCleared ? false : true)}>{showCleared ? 'Hide Cleared' : 'Show Cleared'}</button>
        </>
      )}
    </section>
  );
};

export default TransactionList;
