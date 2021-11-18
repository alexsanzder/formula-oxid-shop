import '@assets/tailwind.css';
import '@assets/chrome-bug.css';

import { FC, useEffect } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import ShopProvider from '@context/AppContext';

import { Head } from '@components/common';

const Noop: FC = ({ children }) => <>{children}</>;

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head />
      <ThemeProvider attribute="class">
        <ShopProvider>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ShopProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
