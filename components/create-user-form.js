import { useState } from 'react';
import axios from 'axios';

const CreateUserForm = ({ setUsers }) => {
  const [firstName, setFirstName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstName,
    };

    await axios
      .post('/api/users', formData)
      .then(({ data: { userData } }) => {
        setUsers(userData);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });

    setFirstName('');
  };

  return (
    <section>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" type="text" required value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </div>

        <button>Submit</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default CreateUserForm;
