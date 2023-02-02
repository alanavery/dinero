import { useContext } from 'react';
import UserContext from '@/store/user-context';

const TransactionList = () => {
  const { userData, activeAccount } = useContext(UserContext);

  const accountTransactions = userData.transactions.filter((transaction) => transaction.accountId === activeAccount._id);
  const clearedTransactions = accountTransactions.filter((transaction) => transaction.cleared);

  let pendingBalance = 0;
  let clearedBalance = 0;

  accountTransactions.forEach((transaction) => (pendingBalance += transaction.amount));
  clearedTransactions.forEach((transaction) => (clearedBalance += transaction.amount));

  console.log(pendingBalance);
  console.log(clearedBalance);

  return (
    <section className="transactions">
      <h2>{activeAccount.name}</h2>

      {accountTransactions.length >= 1 && (
        <>
          <ul>
            {accountTransactions.map((transaction) => {
              const payee = userData.payees.find((payee) => payee._id === transaction.payeeId);
              const tag = userData.tags.find((tag) => tag._id === transaction.tagId);

              return (
                <li className={transaction.cleared ? 'cleared' : undefined} key={transaction._id}>
                  <div>{transaction.date}</div>
                  <div>{payee && payee.name}</div>
                  <div>{`$${transaction.amount}`}</div>
                  <div>{tag && tag.name}</div>
                </li>
              );
            })}
          </ul>

          <div className="transactions__summary">
            <div>Cleared Balance:</div>
            <div>{`$${clearedBalance.toFixed(2)}`}</div>
          </div>

          <div className="transactions__summary">
            <div>Pending Balance:</div>
            <div>{`$${pendingBalance.toFixed(2)}`}</div>
          </div>
        </>
      )}
    </section>
  );
};

export default TransactionList;
