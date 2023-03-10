import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import TextInput from './controls/text-input';
import CheckboxInput from './controls/checkbox-input';

const EditAccountForm = ({ userId, accountId, account }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (values) => {
    const formData = {
      name: values.name,
      startingBalance: Number(values.negativeBalance ? values.startingBalance * -1 : values.startingBalance),
      creditAccount: values.creditAccount,
      creditLimit: Number(values.creditLimit),
      accountId,
    };

    await axios
      .put('/api/accounts', formData)
      .then(() => router.push(`/users/${userId}/accounts`))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Edit Account</h2>

      <Formik
        initialValues={{
          name: account.name,
          startingBalance: account.startingBalance,
          negativeBalance: account.negativeBalance,
          creditAccount: account.creditAccount,
          creditLimit: account.creditLimit,
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <TextInput label="Name" id="name" name="name" />

              <TextInput label="Starting Balance" id="starting-balance" name="startingBalance" />

              <CheckboxInput name="negativeBalance">Negative Balance</CheckboxInput>

              <CheckboxInput name="creditAccount">Credit Account</CheckboxInput>

              {values.creditAccount && <TextInput label="Credit Limit" id="credit-limit" name="creditLimit" />}

              <button type="submit">Edit</button>
            </Form>
          );
        }}
      </Formik>

      {message && <p>{message}</p>}
    </section>
  );
};

export default EditAccountForm;
