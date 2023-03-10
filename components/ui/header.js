import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <h1>
        <Link href="/users">Dinero</Link>
      </h1>
    </header>
  );
};

export default Header;
