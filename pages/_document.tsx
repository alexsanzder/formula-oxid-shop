import Document, { Html, Head, Main, NextScript } from 'next/document';

interface Props {}

class MyDocument extends Document<Props> {
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
