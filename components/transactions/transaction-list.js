import { useContext } from 'react';
import TransactionContext from '@/store/transaction-context';
import TransactionGroup from './transaction-group';
import { calculateBalance, getAccountTransactions, getPendingTransactions, groupTransactionsByDate } from '@/helpers/transaction-utils';

const TransactionList = () => {
  const context = useContext(TransactionContext);

  const transactionGroups = groupTransactionsByDate(context.transactions);

  const containsPendingTransactions = (group) => {
    return group.transactions.find((transaction) => !transaction.cleared);
  };

  return (
    <section className="transactions">
      <div className="summary block">
        <div className="summary__balance">
          <div className="summary__balance__amount">{`$${calculateBalance(context.account.startingBalance, context.transactions)}`}</div>
          <div className="summary__balance__label">Account Balance</div>
        </div>

        <div className="summary__balance">
          <div className="summary__balance__amount">{`$${calculateBalance(context.account.startingBalance, context.transactions, 'cleared')}`}</div>
          <div className="summary__balance__label">Cleared Balance</div>
        </div>
      </div>

      {(context.showCleared || transactionGroups.find((group) => containsPendingTransactions(group))) && (
        <ul>
          {transactionGroups.map((group) => {
            if (context.showCleared || containsPendingTransactions(group)) {
              return <TransactionGroup group={group} key={group.date} />;
            }
          })}
        </ul>
      )}

      <button onClick={() => context.setShowCleared(!context.showCleared)}>{context.showCleared ? 'Hide Cleared' : 'Show Cleared'}</button>
    </section>
  );
};

export default TransactionList;
