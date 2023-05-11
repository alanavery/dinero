import { useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import TransactionContext from '@/store/transaction-context';
import IconBudget from '../svg/icon-budget';
import IconSplit from '../svg/icon-split';

const TransactionBlock = ({ transaction }) => {
  const context = useContext(TransactionContext);

  const payee = context.payees.find((payee) => payee._id === transaction.payeeId);
  const tag = context.tags.find((tag) => tag._id === transaction.tagId);

  const handleClick = async () => {
    context.setPending(true);

    const reqBody = {
      editStatus: true,
      cleared: !transaction.cleared,
      accountId: transaction.accountId,
      transactionId: transaction._id,
    };

    await axios
      .put('/api/transactions', reqBody)
      .then((response) => {
        context.setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });

    context.setPending(false);
  };

  return (
    <li className={`transaction${transaction.cleared ? ' cleared' : ''}`}>
      <Link className="transaction__summary" href={`/users/${transaction.userId}/accounts/${transaction.accountId}/transactions/${transaction._id}/edit`}>
        <div className="transaction__summary__payee">{payee.name}</div>

        <div className={`transaction__summary__amount${Math.sign(transaction.amount) === -1 ? ' negative' : ' positive'}`}>{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>

        <div className="transaction__summary__details">
          {transaction.budget && <IconBudget />}
          {transaction.split && <IconSplit />}
          {tag && <div className="transaction__summary__details__tag">{tag.name}</div>}
        </div>
      </Link>

      <button className="transaction__button" onClick={handleClick} disabled={context.pending} />
    </li>
  );
};

export default TransactionBlock;
