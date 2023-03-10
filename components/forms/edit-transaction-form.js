import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import TextInput from './controls/text-input';
import CheckboxInput from './controls/checkbox-input';
import DateInput from './controls/date-input';

const EditTransactionForm = ({ userId, accountId, transactionId, transaction, payee, tag }) => {
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
      transactionId
    };

    await axios
      .put('/api/transactions', formData)
      .then(() => router.push(`/users/${userId}/accounts/${accountId}/transactions`))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Edit Transaction</h2>

      <Formik
        initialValues={{
          expense: Math.sign(transaction.amount) === -1 ? true : false,
          amount: Math.abs(transaction.amount),
          payee: payee.name,
          date: transaction.date,
          cleared: transaction.cleared,
          budget: transaction.budget,
          split: transaction.split,
          tag: tag ? tag.name : '',
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

              <button type="submit">Edit</button>
            </Form>
          );
        }}
      </Formik>

      {message && <p>{message}</p>}
    </section>
  );
};

export default EditTransactionForm;
