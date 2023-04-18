import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = ({ userId, accountId, account, transactions, payees, tags }) => {
  const [showCleared, setShowCleared] = useState(false);

  const accountTransactions = transactions.filter((transaction) => transaction.accountId === accountId);
  const sortedTransactions = accountTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  const groupedTransactions = [];
  let currentDate = '';

  sortedTransactions.forEach((transaction) => {
    if (transaction.date !== currentDate) {
      const group = {
        date: transaction.date,
        transactions: [transaction],
      };
      groupedTransactions.push(group);
      currentDate = transaction.date;
    } else {
      const groupIndex = groupedTransactions.findIndex((group) => group.date === transaction.date);
      groupedTransactions[groupIndex].transactions.push(transaction);
    }
  });

  const transactionAmount = (amount) => {
    const sign = Math.sign(amount);

    if (sign === -1) {
      // return <div className="negative">-${Math.abs(amount).toFixed(2)}</div>;
      return <div className="negative">{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>;
    } else if (sign === 1) {
      return <div className="positive">${amount.toFixed(2)}</div>;
    } else {
      return <div>$0</div>;
    }
  };

  return (
    <section className="transactions">
      {accountTransactions.length >= 1 && (
        <>
          <div className="card card--lg">
            <div>
              <div className="card__body--lg">{`$${calculateBalance(account.startingBalance, accountTransactions)}`}</div>
              <div className="card__heading">Account Balance</div>
            </div>

            <div>
              <div className="card__body--lg">{`$${calculateBalance(account.startingBalance, accountTransactions, 'cleared')}`}</div>
              <div className="card__heading">Cleared Balance</div>
            </div>
          </div>

          <ul>
            {groupedTransactions.map((group) => {
              return (
                <li key={group.date}>
                  <div className="transactions__date">{dayjs(group.date).format('MMMM D')}</div>

                  <ul>
                    {group.transactions.map((transaction) => {
                      const payee = payees.find((payee) => payee._id === transaction.payeeId);
                      const tag = tags.find((tag) => tag._id === transaction.tagId);

                      if (showCleared || (!showCleared && !transaction.cleared)) {
                        return (
                          <li key={transaction._id}>
                            <Link className="card card--sm" href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/edit`}>
                              <div className={transaction.split ? 'split' : undefined}>{payee && payee.name}</div>
                              <div className={Math.sign(transaction.amount) === -1 ? 'negative' : 'positive'}>{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>

          <button onClick={() => setShowCleared(showCleared ? false : true)}>{showCleared ? 'Hide Cleared' : 'Show Cleared'}</button>
        </>
      )}
    </section>
  );
};

export default TransactionList;
