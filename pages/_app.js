import Header from '@/components/header';
import '@/styles/styles.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
