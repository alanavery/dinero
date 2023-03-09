import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const DeleteAccountConfirmation = ({ userId, accountId }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleClick = () => {
    axios
      .delete('/api/accounts', { data: { accountId } })
      .then(() => router.push(`/users/${userId}/accounts`))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Delete Account</h2>

      <button onClick={handleClick}>Confirm</button>

      <Link href={`/users/${userId}/accounts`}>
        <button>Cancel</button>
      </Link>

      {message && <p>{message}</p>}
    </section>
  );
};

export default DeleteAccountConfirmation;
