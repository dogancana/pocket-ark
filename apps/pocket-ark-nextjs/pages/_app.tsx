import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../src/ui';
import './styles.css';

export const App: React.FC = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Pocket Ark</title>
      </Head>
      <main className="h-screen">
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
