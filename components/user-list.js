const UserList = ({ users }) => {
  return (
    <section>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.firstName}</li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
