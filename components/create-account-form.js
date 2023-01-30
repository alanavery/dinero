import { useState } from 'react';
import axios from 'axios';

const CreateAccountForm = (props) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [creditAccount, setCreditAccount] = useState(false);
  const [creditLimit, setCreditLimit] = useState('');
  const [message, setMessage] = useState('');

  const clearForm = () => {
    setName('');
    setBalance('');
    setCreditAccount(false);
    setCreditLimit('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      balance,
      creditAccount,
      creditLimit,
      userId: props.userId,
    };

    axios
      .post('/api/accounts', formData)
      .then((response) => {
        console.log(response);
        props.setAccounts(response.data.accounts);
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        clearForm();
      });
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
          <input id="balance" type="text" pattern="\d*\.?\d*" required value={balance} onChange={(event) => setBalance(event.target.value)} />
        </div>

        <div className="form-control">
          <label htmlFor="credit-account">Credit Account</label>
          <input id="credit-account" type="checkbox" checked={creditAccount} onChange={(event) => setCreditAccount(event.target.checked)} />
        </div>

        {creditAccount && (
          <div className="form-control">
            <label htmlFor="credit-limit">Credit Limit</label>
            <input id="credit-limit" type="text" pattern="\d*\.?\d*" value={creditLimit} onChange={(event) => setCreditLimit(event.target.value)} />
          </div>
        )}

        <button>Submit</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default CreateAccountForm;
