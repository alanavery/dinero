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
      creditLimit: values.creditAccount ? Number(values.creditLimit) : null,
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
          startingBalance: Math.abs(account.startingBalance),
          negativeBalance: Math.sign(account.startingBalance) === -1 ? true : false,
          creditAccount: account.creditAccount,
          creditLimit: account.creditAccount ? account.creditLimit : '',
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <TextInput label="Name" id="name" name="name" required />

              <TextInput label="Starting Balance" id="starting-balance" name="startingBalance" required />

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
