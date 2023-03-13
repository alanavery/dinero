import Link from 'next/link';
import AddAccountForm from '@/components/forms/add-account-form';

const AddAccountPage = (props) => {
  return (
    <main>
      <Link className="button" href={`/users/${props.userId}/accounts`}>
        Back
      </Link>

      <AddAccountForm userId={props.userId} />
    </main>
  );
};

export const getServerSideProps = (context) => {
  const userId = context.params.userId;

  return {
    props: {
      userId,
    },
  };
};

export default AddAccountPage;
