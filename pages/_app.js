import Header from '@/components/ui/header';
import '@/styles/styles.scss';

export default function App({ Component, pageProps }) {
  return (
    <div className="app">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
