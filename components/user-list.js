import Link from 'next/link';

const UserList = (props) => {
  return (
    <section>
      <h2>Users</h2>

      <ul>
        {props.users.map((user) => (
          <li key={user._id}>
            <Link href={`/users/${user._id}`}>{user.firstName}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
