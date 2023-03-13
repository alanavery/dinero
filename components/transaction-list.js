import Link from 'next/link';
import axios from 'axios';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = ({ userId, accountId, account, transactions, payees, tags }) => {
  const accountTransactions = transactions.filter((transaction) => transaction.accountId === accountId);

  return (
    <section className="transactions">
      {accountTransactions.length >= 1 && (
        <>
          <div className="transactions__summary">
            <div>
              <div>Account Balance:</div>
              <div>{`$${calculateBalance(account.startingBalance, accountTransactions)}`}</div>
            </div>

            <div>
              <div>Cleared Balance:</div>
              <div>{`$${calculateBalance(account.startingBalance, accountTransactions, 'cleared')}`}</div>
            </div>
          </div>

          <ul>
            {accountTransactions.map((transaction) => {
              const payee = payees.find((payee) => payee._id === transaction.payeeId);
              const tag = tags.find((tag) => tag._id === transaction.tagId);

              return (
                <li className={transaction.cleared ? 'cleared' : undefined} key={transaction._id}>
                  <div className="list__item__text">
                    <div>{transaction.date}</div>
                    <div>{payee && payee.name}</div>
                    <div>{`$${transaction.amount.toFixed(2)}`}</div>
                    <div>{tag && tag.name}</div>
                  </div>

                  <div className="list__item__buttons">
                    <Link className="button" href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/edit`}>
                      Edit
                    </Link>
                    <Link className="button" href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/delete`}>
                      Delete
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default TransactionList;
