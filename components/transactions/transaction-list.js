import { useState } from 'react';
import dayjs from 'dayjs';
import TransactionBlock from './transaction-block';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = ({ userId, accountId, account, transactions, setTransactions, payees, tags }) => {
  const [showCleared, setShowCleared] = useState(false);
  const [pending, setPending] = useState(false);

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

  return (
    <section className="transactions">
      {accountTransactions.length >= 1 && (
        <>
          <div className="summary block">
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
                        return <TransactionBlock transaction={transaction} payee={payee} tag={tag} setTransactions={setTransactions} pending={pending} setPending={setPending} key={transaction._id} />;
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
