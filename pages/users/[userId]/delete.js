import DeleteUserConfirmation from '@/components/forms/delete-user-confirmation';

const DeleteUserPage = (props) => {
  return (
    <main>
      <DeleteUserConfirmation userId={props.userId} />
    </main>
  );
};

export const getServerSideProps = (context) => {
  return {
    props: {
      userId: context.params.userId,
    },
  };
};

export default DeleteUserPage;
