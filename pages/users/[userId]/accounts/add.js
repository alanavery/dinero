import AddAccountForm from '@/components/forms/add-account-form';

const AddAccountPage = (props) => {
  return (
    <main>
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
