import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '@/store/user-context';

const CreateAccountForm = ({ userId }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [creditAccount, setCreditAccount] = useState(false);
  const [creditLimit, setCreditLimit] = useState('');
  const [message, setMessage] = useState('');

  const { setAccounts } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      balance: Number(balance),
      creditAccount,
      creditLimit: Number(creditLimit),
      userId: userId,
    };

    await axios
      .post('/api/accounts', formData)
      .then((response) => {
        console.log(response);
        setAccounts(response.data.accounts);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });

    setName('');
    setBalance('');
    setCreditAccount(false);
    setCreditLimit('');
  };

  return (
    <section>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" required value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="form-control">
          <label htmlFor="balance">Balance</label>
          <input id="balance" type="number" step="0.01" required value={balance} onChange={(event) => setBalance(event.target.value)} />
        </div>

        <div className="form-control">
          <label htmlFor="credit-account">Credit Account</label>
          <input id="credit-account" type="checkbox" checked={creditAccount} onChange={(event) => setCreditAccount(event.target.checked)} />
        </div>

        {creditAccount && (
          <div className="form-control">
            <label htmlFor="credit-limit">Credit Limit</label>
            <input id="credit-limit" type="number" step="0.01" value={creditLimit} onChange={(event) => setCreditLimit(event.target.value)} />
          </div>
        )}

        <button>Submit</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default CreateAccountForm;
