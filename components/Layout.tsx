import { Component, ReactNode } from 'react';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { Category, Content, Manufacturer } from '@generated/types';

export interface LayoutProps {
  children: ReactNode[] | Component[] | any[];
  pageProps: {
    rootCategories: Category[];
    brands: Manufacturer[];
    pages: Content[];
  };
}
const Layout = ({
  children,
  pageProps: { rootCategories = [], pages = [], brands = [], ...pageProps },
}: LayoutProps) => {
  return (
    <>
      <Header categories={rootCategories} />
      <main>{children}</main>
      <Footer brands={brands} pages={pages} />
    </>
  );
};

export default Layout;
