import DeleteTransactionConfirmation from '@/components/forms/delete-transaction-confirmation';

const DeleteTransactionPage = (props) => (
  <main>
    <DeleteTransactionConfirmation userId={props.userId} accountId={props.accountId} transactionId={props.transactionId} />
  </main>
);

export const getServerSideProps = (context) => {
  const userId = context.params.userId;
  const accountId = context.params.accountId;
  const transactionId = context.params.transactionId;

  return {
    props: {
      userId,
      accountId,
      transactionId,
    },
  };
};

export default DeleteTransactionPage;
