import { useState } from 'react';
import Link from 'next/link';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = ({ userId, accountId, account, transactions, payees, tags }) => {
  const [showCleared, setShowCleared] = useState(false);

  const accountTransactions = transactions.filter((transaction) => transaction.accountId === accountId);
  const sortedTransactions = accountTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  const transactionGroups = [];
  let currentDate = '';

  sortedTransactions.forEach((transaction) => {
    if (transaction.date !== currentDate) {
      const group = {
        date: transaction.date,
        transactions: [transaction],
      };
      transactionGroups.push(group);
      currentDate = transaction.date;
    } else {
      const groupIndex = transactionGroups.findIndex((group) => group.date === transaction.date);
      transactionGroups[groupIndex].transactions.push(transaction);
    }
  });

  console.log(sortedTransactions);
  console.log(transactionGroups);

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

          {transactionGroups.map((group) => {
            return (
              <div className="group" key={group.date}>
                <div className="group__date">{group.date}</div>

                <ul className="card card--sm">
                  {group.transactions.map((transaction) => {
                    const payee = payees.find((payee) => payee._id === transaction.payeeId);
                    const tag = tags.find((tag) => tag._id === transaction.tagId);

                    if (showCleared || (!showCleared && !transaction.cleared)) {
                      return (
                        <li key={transaction._id}>
                          <Link href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/edit`}>
                            <div className={transaction.split ? 'split' : false}>{payee && payee.name}</div>
                            {transaction.tag && <div>{tag && tag.name}</div>}
                            <div>{`$${transaction.amount.toFixed(2)}`}</div>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          })}

          <button onClick={() => setShowCleared(showCleared ? false : true)}>{showCleared ? 'Hide Cleared' : 'Show Cleared'}</button>
        </>
      )}
    </section>
  );
};

export default TransactionList;
