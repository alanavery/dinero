import AddAccountForm from '@/components/forms/add-account-form';

const AddAccountPage = (props) => {
  return (
    <main>
      <AddAccountForm userId={props.userId} />
    </main>
  );
};

export const getServerSideProps = (context) => ({
  props: {
    userId: context.params.userId,
  },
});

export default AddAccountPage;
