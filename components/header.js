import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <h1>
        <Link href="/">Dinero</Link>
      </h1>

      <nav>
        <ul>
          <li>
            <Link href="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
