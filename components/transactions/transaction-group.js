import { useContext } from 'react';
import dayjs from 'dayjs';
import TransactionContext from '@/store/transaction-context';
import TransactionBlock from './transaction-block';

const TransactionGroup = ({ group }) => {
  const context = useContext(TransactionContext);

  return (
    <li>
      <div className="transactions__date">{dayjs(group.date).format('MMMM D')}</div>

      <ul>
        {group.transactions.map((transaction) => {
          if (context.showCleared || (!context.showCleared && !transaction.cleared)) {
            return <TransactionBlock transaction={transaction} key={transaction._id} />;
          }
        })}
      </ul>
    </li>
  );
};

export default TransactionGroup;
