const AccountList = (props) => {
  return (
    <section>
      <h2>Accounts</h2>

      <ul>
        {props.accounts.map((account) => (
          <li key={account._id}>{account.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default AccountList;
