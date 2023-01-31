const AccountList = ({ accounts, selectedAccount, setSelectedAccount }) => {
  return (
    <section>
      <h2>Accounts</h2>

      <ul>
        {accounts.map((account) => (
          <li className={account._id === selectedAccount._id ? 'selected' : undefined} onClick={() => setSelectedAccount(account)} key={account._id}>
            {account.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccountList;
