import "@assets/tailwind.css";
import "@assets/chrome-bug.css";

import { FC, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import Head from "@components/Head";
import SearchProvider from "@context/SearchContext";

const Noop: FC = ({ children }) => <>{children}</>;

const App = ({ Component, pageProps }: AppProps) => {
    const Layout = (Component as any).Layout || Noop;

    useEffect(() => {
        document.body.classList?.remove("loading");
    }, []);

    return (
        <>
            <Head />
            <SearchProvider>
                <ThemeProvider attribute="class">
                    <Layout pageProps={pageProps}>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SearchProvider>
        </>
    );
};

export default App;
