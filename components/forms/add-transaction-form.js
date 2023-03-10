import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { formatDate } from '@/helpers/date-utils';
import TextInput from './controls/text-input';
import CheckboxInput from './controls/checkbox-input';
import DateInput from './controls/date-input';

const AddTransactionForm = ({ userId, accountId }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (values) => {
    const formData = {
      amount: Number(values.expense ? values.amount * -1 : values.amount),
      payee: values.payee,
      date: values.date,
      cleared: values.cleared,
      budget: values.budget,
      split: values.split,
      tag: values.tag,
      userId,
      accountId,
    };

    await axios
      .post('/api/transactions', formData)
      .then(() => router.push(`/users/${userId}/accounts/${accountId}/transactions`))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Add Transaction</h2>

      <Formik
        initialValues={{
          expense: true,
          amount: '',
          payee: '',
          date: formatDate(new Date()),
          cleared: false,
          budget: true,
          split: false,
          tag: '',
        }}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form>
              <CheckboxInput name="expense">Expense</CheckboxInput>

              <TextInput label="Amount" id="amount" name="amount" required />

              <TextInput label="Payee" id="payee" name="payee" required />

              <DateInput label="Date" id="date" name="date" required />

              <CheckboxInput name="cleared">Cleared</CheckboxInput>

              <CheckboxInput name="budget">Budget</CheckboxInput>

              <CheckboxInput name="split">Split</CheckboxInput>

              <TextInput label="Tag" id="tag" name="tag" />

              <button type="submit">Add</button>
            </Form>
          );
        }}
      </Formik>

      {message && <p>{message}</p>}
    </section>
  );
};

export default AddTransactionForm;
