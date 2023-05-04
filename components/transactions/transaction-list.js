import { useContext } from 'react';
import TransactionContext from '@/store/transaction-context';
import TransactionGroup from './transaction-group';
import { calculateBalance, groupTransactionsByDate, containsPendingTransactions } from '@/helpers/transaction-utils';
import styles from './transaction-list.module.scss';

const TransactionList = () => {
  const context = useContext(TransactionContext);

  const transactionGroups = groupTransactionsByDate(context.transactions);

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

      <button className="button" onClick={() => context.setShowCleared(!context.showCleared)}>
        {context.showCleared ? 'Hide Cleared' : 'Show Cleared'}
      </button>

      {(context.showCleared || transactionGroups.find((group) => containsPendingTransactions(group))) && (
        <ul>
          {transactionGroups.map((group) => {
            if (context.showCleared || containsPendingTransactions(group)) {
              return <TransactionGroup group={group} key={group.date} />;
            }
          })}
        </ul>
      )}
    </section>
  );
};

export default TransactionList;
