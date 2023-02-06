import { useContext } from 'react';
import axios from 'axios';
import UserContext from '@/store/user-context';
import { calculateBalance } from '@/helpers/balance-utils';

const TransactionList = () => {
  const {
    userId,
    activeAccount,
    transactionData: { transactions, payees, tags },
    setTransactionData,
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

              const toggleStatus = async () => {
                const formData = {
                  toggleStatus: true,
                  userId,
                  cleared: transaction.cleared ? false : true,
                };

                await axios
                  .post(`/api/transactions/${transaction._id}`, formData)
                  .then((response) => {
                    console.log(response);
                    setTransactionData(response.data.transactionData);
                  })
                  .catch((error) => {
                    console.log(error);
                    setMessage(error.response.data.message);
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
