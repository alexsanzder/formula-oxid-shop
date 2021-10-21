import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

interface Props {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head />
        <body className="loading dark:bg-gray-900 dark:text-white text-gray-900 bg-white">
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
