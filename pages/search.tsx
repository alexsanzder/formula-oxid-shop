import { Search } from '@components/search';
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

export default Search;
