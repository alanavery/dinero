import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import TextInput from './controls/text-input';

const AddUserForm = ({ setUsers }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (values) => {
    await axios
      .post('/api/users', values)
      .then(() => router.push('/users'))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Add User</h2>

      <Formik
        initialValues={{
          firstName: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextInput label="First Name" id="first-name" name="firstName" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      {message && <p>{message}</p>}
    </section>
  );
};

export default AddUserForm;
