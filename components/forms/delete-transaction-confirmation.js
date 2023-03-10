import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const DeleteTransactionConfirmation = ({ userId, accountId, transactionId }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleClick = () => {
    axios
      .delete('/api/transactions', { data: { transactionId } })
      .then(() => router.push(`/users/${userId}/accounts/${accountId}/transactions`))
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <section>
      <h2>Delete Transaction</h2>

      <button onClick={handleClick}>Confirm</button>

      <Link href={`/users/${userId}/accounts/${accountId}/transactions`}>
        <button>Cancel</button>
      </Link>

      {message && <p>{message}</p>}
    </section>
  );
};

export default DeleteTransactionConfirmation;
