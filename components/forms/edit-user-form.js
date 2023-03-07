import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import TextInput from './controls/text-input';

const EditUserForm = ({ user: { _id, firstName } }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (values) => {
    const formData = values;
    formData._id = _id;

    await axios
      .put('/api/users', values)
      .then(() => router.push('/users'))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Edit User</h2>

      <Formik
        initialValues={{
          firstName,
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextInput label="First Name" id="first-name" name="firstName" />

          <button type="submit">Edit</button>
        </Form>
      </Formik>

      {message && <p>{message}</p>}
    </section>
  );
};

export default EditUserForm;
