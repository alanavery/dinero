import Link from 'next/link';

const UserList = ({ users }) => {
  return (
    <section className="users">
      <h2>Users</h2>

      <ul>
        {users.map((user) => {
          return (
            <li key={user._id}>
              <Link href={`/users/${user._id}/accounts`}>{user.firstName}</Link>
              <Link href={`/users/${user._id}/edit`}>Edit</Link>
              <Link href={`/users/${user._id}/delete`}>Delete</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UserList;
