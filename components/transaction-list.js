import { useContext } from 'react';
import UserContext from '@/store/user-context';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = () => {
  const {
    activeAccount,
    transactionData: { transactions, payees, tags },
  } = useContext(UserContext);

  const accountTransactions = transactions.filter((transaction) => transaction.accountId === activeAccount._id);

  return (
    <section className="transactions">
      <h2>{activeAccount.name}</h2>

      {accountTransactions.length >= 1 && (
        <>
          <ul>
            {accountTransactions.map((transaction) => {
              const payee = payees.find((payee) => payee._id === transaction.payeeId);
              const tag = tags.find((tag) => tag._id === transaction.tagId);

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
            <div>{`$${calculateBalance(activeAccount.startingBalance, accountTransactions, true)}`}</div>
          </div>

          <div className="transactions__summary">
            <div>Account Balance:</div>
            <div>{`$${calculateBalance(activeAccount.startingBalance, accountTransactions, false)}`}</div>
          </div>
        </>
      )}
    </section>
  );
};

export default TransactionList;
