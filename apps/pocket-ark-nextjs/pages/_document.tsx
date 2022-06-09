import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
    return (
      <Html>
        <Head>
          {id && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )}
        </Head>
        <body className="bg-stone-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
