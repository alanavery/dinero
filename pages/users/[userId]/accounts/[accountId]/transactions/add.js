import Link from 'next/link';
import AddTransactionForm from '@/components/forms/add-transaction-form';

const AddTransactionPage = (props) => {
  return (
    <main>
      <Link className="button" href={`/users/${props.userId}/accounts/${props.accountId}/transactions`}>
        Back
      </Link>

      <AddTransactionForm userId={props.userId} accountId={props.accountId} />
    </main>
  );
};

export const getServerSideProps = (context) => {
  const userId = context.params.userId;
  const accountId = context.params.accountId;

  return {
    props: {
      userId,
      accountId,
    },
  };
};

export default AddTransactionPage;
