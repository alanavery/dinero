import { UserContextProvider } from '@/store/user-context';
import Header from '@/components/header';
import '@/styles/styles.scss';

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Header />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
