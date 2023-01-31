const TransactionList = ({ selectedAccount }) => {
  return (
    <section>
      <h2>{selectedAccount.name}</h2>

      {/* <ul>
        {props.accounts.map((account) => (
          <li key={account._id}>{account.name}</li>
        ))}
      </ul> */}
    </section>
  );
};

export default TransactionList;
