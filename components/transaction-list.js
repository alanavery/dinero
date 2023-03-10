import Link from 'next/link';
import axios from 'axios';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = ({ userId, accountId, account, transactions, payees, tags, setTransactions }) => {
  const accountTransactions = transactions.filter((transaction) => transaction.accountId === accountId);

  return (
    <section className="transactions">
      {accountTransactions.length >= 1 && (
        <>
          <ul>
            {accountTransactions.map((transaction) => {
              const payee = payees.find((payee) => payee._id === transaction.payeeId);
              const tag = tags.find((tag) => tag._id === transaction.tagId);

              const toggleStatus = async () => {
                const formData = {
                  toggleStatus: true,
                  userId,
                  cleared: transaction.cleared ? false : true,
                };

                await axios
                  .put(`/api/transactions/${transaction._id}`, formData)
                  .then((response) => {
                    console.log(response);
                    setTransactions(response.data.transactionData.transactions);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              };

              return (
                <li className={transaction.cleared ? 'cleared' : undefined} key={transaction._id}>
                  <form>
                    <input type="checkbox" checked={transaction.cleared} onChange={toggleStatus} />
                  </form>
                  <div>{transaction.date}</div>
                  <div>{payee && payee.name}</div>
                  <div>{`$${transaction.amount}`}</div>
                  <div>{tag && tag.name}</div>
                  <Link href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/edit`}>Edit</Link>
                  <Link href={`/users/${userId}/accounts/${accountId}/transactions/${transaction._id}/delete`}>Delete</Link>
                </li>
              );
            })}
          </ul>

          <div className="transactions__summary">
            <div>Cleared Balance:</div>
            <div>{`$${calculateBalance(account.startingBalance, accountTransactions, true)}`}</div>
          </div>

          <div className="transactions__summary">
            <div>Account Balance:</div>
            <div>{`$${calculateBalance(account.startingBalance, accountTransactions, false)}`}</div>
          </div>
        </>
      )}
    </section>
  );
};

export default TransactionList;
