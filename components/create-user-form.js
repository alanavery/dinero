import { useState } from 'react';
import axios from 'axios';

const CreateUserForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      firstName,
    };

    axios
      .post('/api/users', formData)
      .then((response) => {
        console.log(response);
        props.setUsers(response.data.users);
        setFirstName('');
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setFirstName('');
      });
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
