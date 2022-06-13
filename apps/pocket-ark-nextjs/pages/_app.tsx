import { AppProps } from 'next/app';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import { Header } from '../src/components';
import { mainFeatures } from '../src/services';
import { PageWithMeta } from '../src/ui';
import './styles.less';

export const App = ({ Component, pageProps, router }: AppProps) => {
  const path = router.asPath;
  const feature = Object.values(mainFeatures).find((f) =>
    new RegExp(`${f.href}$`).test(path)
  );
  const desc = [
    ...(feature?.description || []),
    ...(feature?.metaDescription || []),
  ]
    .filter((v) => !!v)
    .join(' ');

  return (
    <>
      <Head>
        <title>Pocket Ark - Various useful tools for Lost Ark game.</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className="bg-gradient-to-br from-stone-50 to-stone-200 h-screen overflow-auto">
        <Header />
        <PageWithMeta subTitle={feature?.header} description={desc}>
          <Component {...pageProps} />
        </PageWithMeta>
      </main>
    </>
  );
};

export default App;
