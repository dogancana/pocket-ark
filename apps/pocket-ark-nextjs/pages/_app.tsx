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
      <main className="bg-gradient-to-br from-stone-50 to-stone-200 h-screen overflow-auto">
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
