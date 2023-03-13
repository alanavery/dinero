import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const DeleteUserConfirmation = ({ userId }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleClick = () => {
    axios
      .delete('/api/users', { data: { userId } })
      .then(() => router.push('/users'))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Delete User</h2>

      <div className="delete__buttons">
        <button onClick={handleClick}>Confirm</button>
        
        <Link className="button" href="/users">
          Cancel
        </Link>
      </div>

      {message && <p>{message}</p>}
    </section>
  );
};

export default DeleteUserConfirmation;
