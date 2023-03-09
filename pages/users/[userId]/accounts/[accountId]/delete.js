import DeleteAccountConfirmation from '@/components/forms/delete-account-confirmation';

const DeleteAccountPage = (props) => (
  <main>
    <DeleteAccountConfirmation userId={props.userId} accountId={props.accountId} />
  </main>
);

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

export default DeleteAccountPage;
