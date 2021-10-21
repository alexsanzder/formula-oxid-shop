import { GetStaticPathsResult } from 'next';

import Search from '@components/Search';
import { ssrGetSearchSite } from '@generated/pages';

export const getStaticProps = async () => {
  const {
    props: { data, error },
  } = await ssrGetSearchSite.getServerPage({});
  if (error) {
    throw new Error(`Search page error: ${error}`);
  }
  return {
    props: data,
    revalidate: 200,
  };
};

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Search;
