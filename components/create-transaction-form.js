import { useState } from 'react';
import axios from 'axios';
import { formatDate } from '@/helpers/date-utils';

const CreateTransactionForm = ({ accountId }) => {
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [cleared, setCleared] = useState(false);
  const [budget, setBudget] = useState(true);
  const [split, setSplit] = useState(false);
  const [tag, setTag] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      amount,
      payee,
      date,
      cleared,
      budget,
      split,
      tag,
      accountId: accountId,
    };

    console.log(formData);

    await axios
      .post('/api/transactions', formData)
      .then((response) => {
        console.log(response);
        // props.setAccounts(response.data.accounts);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });

    setAmount('');
    setPayee('');
    setDate(new Date());
    setCleared(false);
    setBudget(true);
    setSplit(false);
    setTag('');
  };

  return (
    <section>
      <h2>Create Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input id="amount" type="text" pattern="\d*\.?\d*" required value={amount} onChange={(event) => setAmount(event.target.value)} />
        </div>

        <div className="form-control">
          <label htmlFor="payee">Payee</label>
          <input id="payee" type="text" required value={payee} onChange={(event) => setPayee(event.target.value)} />
        </div>

        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" required value={date} onChange={(event) => setDate(event.target.value)} />
        </div>

        <div className="form-control">
          <label htmlFor="cleared">Cleared</label>
          <input id="cleared" type="checkbox" checked={cleared} onChange={(event) => setCleared(event.target.checked)} />
        </div>

        <div className="form-control">
          <label htmlFor="budget">Budget</label>
          <input id="budget" type="checkbox" checked={budget} onChange={(event) => setBudget(event.target.checked)} />
        </div>

        <div className="form-control">
          <label htmlFor="split">Split</label>
          <input id="split" type="checkbox" checked={split} onChange={(event) => setSplit(event.target.checked)} />
        </div>

        <div className="form-control">
          <label htmlFor="tag">Tag</label>
          <input id="tag" type="text" value={tag} onChange={(event) => setTag(event.target.value)} />
        </div>

        <button>Submit</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default CreateTransactionForm;
