import Link from 'next/link';
import AddUserForm from '@/components/forms/add-user-form';

const AddUserPage = () => {
  return (
    <main>
      <Link className="button" href={`/users`}>
        Back
      </Link>

      <AddUserForm />
    </main>
  );
};

export default AddUserPage;
