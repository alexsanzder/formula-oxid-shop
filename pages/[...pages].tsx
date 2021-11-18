import type {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

import { Layout } from '@components/common';
import { Text } from '@components/ui';
import { ssrGetContents, ssrGetSites } from '@generated/pages';

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ pages: string[] }>) => {
  const {
    props: { data },
  } = await ssrGetSites.getServerPage({
    variables: { contentId: params!.pages[0] },
  });

  const pages = data.pages ? data.pages.filter((page) => page.active === true) : [];

  return {
    props: {
      ...data,
      pages,
    },
    revalidate: 60 * 60, // Every hour
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const {
    props: {
      data: { contents },
    },
  } = await ssrGetContents.getServerPage({}, { req: undefined });
  const pages = contents ? contents.filter((content) => content.active === true) : [];

  const paths = locales
    ? locales.reduce<string[]>((arr, locale) => {
        // TODO add a page path for every locale
        pages.forEach((page) => {
          arr.push(`/${locale}/${page.id}`);
        });
        return arr;
      }, [])
    : pages.map((page) => `/${page.id}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function Pages({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div className="py-20 mx-8">{page.content && <Text html={page.content} />}</div>
  );
}

Pages.Layout = Layout;
