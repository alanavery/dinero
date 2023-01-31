const TransactionList = ({ selectedAccount, transactions }) => {
  return (
    <section>
      <h2>{selectedAccount.name}</h2>

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <div>{transaction.amount}</div>
            <div>{transaction.date}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TransactionList;
