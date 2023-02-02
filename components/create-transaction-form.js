import { useState, useContext } from 'react';
import axios from 'axios';
import { formatDate } from '@/helpers/date-utils';
import UserContext from '@/store/user-context';

const CreateTransactionForm = () => {
  const [expense, setExpense] = useState(true);
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [cleared, setCleared] = useState(false);
  const [budget, setBudget] = useState(true);
  const [split, setSplit] = useState(false);
  const [tag, setTag] = useState('');
  const [message, setMessage] = useState('');

  const { setUserData, activeAccount } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      amount: Number(expense ? amount * -1 : amount),
      payee,
      date,
      cleared,
      budget,
      split,
      tag,
      userId: activeAccount.userId,
      accountId: activeAccount._id,
    };

    await axios
      .post('/api/transactions', formData)
      .then((response) => {
        console.log(response);
        setUserData(response.data.newUserData);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });

    setExpense(true);
    setAmount('');
    setPayee('');
    setDate(formatDate(new Date()));
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
          <label htmlFor="expense">Expense</label>
          <input id="expense" type="checkbox" checked={expense} onChange={(event) => setExpense(event.target.checked)} />
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input id="amount" type="number" step="0.01" required value={amount} onChange={(event) => setAmount(event.target.value)} />
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
