import type {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import Text from "@components/Text";
import { ssrGetContents, ssrGetSites } from "@generated/pages";

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ pages: string[] }>) => {
    const {
        props: { data, error },
    } = await ssrGetSites.getServerPage({
        variables: { contentId: params!.pages[0] },
    });

    if (error) {
        throw new Error(`Page with id '${params!.pages[0]}' not found`);
    }

    const pages = data.pages
        ? data.pages.filter((page) => page.active === true)
        : [];

    return {
        props: {
            ...data,
            pages,
        },
        revalidate: 60 * 60, // Every hour
    };
};

export const getStaticPaths: GetStaticPaths = async ({
    locales,
}: GetStaticPathsContext) => {
    const {
        props: {
            data: { contents },
        },
    } = await ssrGetContents.getServerPage({}, { req: undefined });
    const pages = contents
        ? contents.filter((content) => content.active === true)
        : [];

    const paths = locales
        ? locales.reduce<string[]>((arr, locale) => {
              // Add a page path for every locale
              pages.forEach((page) => {
                  arr.push(`/${locale}/${page.id}`);
              });
              return arr;
          }, [])
        : pages.map((page) => `/${page.id}`);

    return {
        paths,
        fallback: "blocking",
    };
};

export default function Pages({
    page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    return router.isFallback ? (
        <h1>Loading...</h1>
    ) : (
        <div className="sm:mx-auto max-w-2xl py-20 mx-8">
            {page.content && <Text html={page.content} />}
        </div>
    );
}

Pages.Layout = Layout;
