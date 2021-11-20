import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="loading dark:bg-black dark:text-white text-gray-900 bg-white">
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
