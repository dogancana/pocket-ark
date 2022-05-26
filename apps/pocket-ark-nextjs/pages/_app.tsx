import { AppProps } from 'next/app';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import { Header } from '../src/components';
import './styles.less';

export const App = ({ Component, pageProps }: AppProps) => {
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
