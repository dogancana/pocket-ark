import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../src/ui';
import './styles.less';
import 'semantic-ui-css/semantic.min.css';

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
