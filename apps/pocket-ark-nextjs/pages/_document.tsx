import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-stone-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
