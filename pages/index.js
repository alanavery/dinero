import Link from 'next/link';

const HomePage = () => {
  return (
    <main>
      <h2>Home Page</h2>

      <Link href="/users">Users</Link>
    </main>
  );
};

export default HomePage;
