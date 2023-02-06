import { useContext } from 'react';
import UserContext from '@/store/user-context';
import { calculateBalance } from '@/helpers/balance-utils';

const AccountList = () => {
  const {
    accounts,
    activeAccount,
    setActiveAccount,
    transactionData: { transactions },
  } = useContext(UserContext);

  return (
    <section className="accounts">
      <h2>Accounts</h2>

      <ul>
        {accounts.map((account) => {
          const accountTransactions = transactions.filter((transaction) => transaction.accountId === account._id);

          return (
            <li className={account._id === activeAccount._id ? 'selected' : undefined} onClick={() => setActiveAccount(account)} key={account._id}>
              <div className="account__name">{account.name}</div>
              <div>{`$${calculateBalance(accountTransactions, false)}`}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AccountList;
