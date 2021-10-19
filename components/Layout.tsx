import { Component, ReactNode } from "react";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { Category, Content, Manufacturer } from "@generated/types";

export interface LayoutProps {
    children: ReactNode[] | Component[] | any[];
    pageProps: {
        categories: Category[];
        manufacturers: Manufacturer[];
        pages: Content[];
    };
}
const Layout = ({
    children,
    pageProps: {
        categories = [],
        pages = [],
        manufacturers = [],
        ...pageProps
    },
}: LayoutProps) => {
    return (
        <>
            <Header categories={categories} />
            <main {...pageProps}>{children}</main>
            <Footer manufacturers={manufacturers} pages={pages} />
        </>
    );
};

export default Layout;
