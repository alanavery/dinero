import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import IconBudget from '../svg/icon-budget';
import IconSplit from '../svg/icon-split';

const TransactionBlock = ({ transaction, payee, tag, setTransactions, pending, setPending }) => {
  const handleClick = async () => {
    setPending(true);

    const reqBody = {
      editStatus: true,
      cleared: !transaction.cleared,
      userId: transaction.userId,
      transactionId: transaction._id,
    };

    await axios
      .put('/api/transactions', reqBody)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });

    setPending(false);
  };

  return (
    <li className={`transaction${transaction.cleared ? ' cleared' : ''}`}>
      <Link className="block" href={`/users/${transaction.userId}/accounts/${transaction.accountId}/transactions/${transaction._id}/edit`}>
        <div className="transaction__payee">
          {transaction.budget && <IconBudget />}

          {transaction.split && <IconSplit />}

          <div>{payee.name}</div>
        </div>

        <div className={Math.sign(transaction.amount) === -1 ? 'negative' : 'positive'}>{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
      </Link>

      <button onClick={handleClick} disabled={pending} />
    </li>
  );
};

export default TransactionBlock;
