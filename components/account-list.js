import { useContext } from 'react';
import UserContext from '@/store/user-context';

const AccountList = () => {
  const { accounts, activeAccount, setActiveAccount } = useContext(UserContext);

  return (
    <section>
      <h2>Accounts</h2>

      <ul>
        {accounts.map((account) => (
          <li className={account._id === activeAccount._id ? 'selected' : undefined} onClick={() => setActiveAccount(account)} key={account._id}>
            {account.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccountList;
