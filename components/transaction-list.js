import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import IconBudget from './svg/icon-budget';
import IconSplit from './svg/icon-split';
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
          <div className="summary card">
            <div className="summary__balance">
              <div className="summary__balance__amount">{`$${calculateBalance(account.startingBalance, accountTransactions)}`}</div>
              <div className="summary__balance__label">Account Balance</div>
            </div>

            <div className="summary__balance">
              <div className="summary__balance__amount">{`$${calculateBalance(account.startingBalance, accountTransactions, 'cleared')}`}</div>
              <div className="summary__balance__label">Cleared Balance</div>
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
                          <li className="transaction" key={transaction._id}>
                            <Link className="card" href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/edit`}>
                              <div className="transaction__payee">
                                {transaction.budget && (
                                  <div className="icon">
                                    <Image src="/images/icons/icon-budget.png" alt="Budget icon" fill />
                                  </div>
                                )}
                                {transaction.split && <IconSplit />}
                                <div>{payee.name}</div>
                              </div>
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
