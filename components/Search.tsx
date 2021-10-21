import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from './Layout';

import { filterQuery, useSearchMeta } from '@lib/search';
import { InferGetStaticPropsType } from 'next';
import { getStaticProps } from '@pages/search';
import { useState } from 'react';
import clsx from 'clsx';
import ProductCard from './ProductCard';
import { Product } from '@generated/types';
import SearchSidebar from './SearchSidebar';
import SearchSort from './SearchSort';
import Skeleton from './Skeleton';
import rangeMap from '@lib/range-map';

const Search = ({
  products,
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [activeFilter, setActiveFilter] = useState('');
  const [toggleFilter, setToggleFilter] = useState(false);

  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;
  // `q` can be included but because categories and Branders can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort });

  const { pathname, category, brand } = useSearchMeta(asPath);
  const activeCategory = categories.find((c) => c.title.toLowerCase() === category);
  const activeBrand = brands.find((b) => b.title.toLowerCase() === brand);

  const handleClick = (e: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true);
    } else {
      setToggleFilter(!toggleFilter);
    }
    setActiveFilter(filter);
  };
  const data: any = undefined;

  return (
    <div className="container flex flex-col items-center justify-between px-4 py-8 mx-auto">
      <div className="lg:grid-cols-12 grid grid-cols-1 gap-4 mt-3 mb-20">
        {/* Sidebar */}
        <SearchSidebar
          activeFilter={activeFilter}
          toggleFilter={toggleFilter}
          categories={categories}
          activeCategory={activeCategory}
          brands={brands}
          activeBrand={activeBrand}
          handleClick={handleClick}
          query={query}
        />

        {/* Products */}
        <div className="lg:order-none order-3 col-span-8">
          {(q || activeCategory || activeBrand) && (
            <div className="mt-4 mb-8 text-lg transition duration-75 ease-in">
              {data ? (
                <>
                  <span
                    className={clsx('animate-pulse', {
                      fadeIn: data.found,
                      hidden: !data.found,
                    })}
                  >
                    Showing {data?.products?.length} results{' '}
                    {q && (
                      <>
                        for "<strong>{q}</strong>"
                      </>
                    )}
                  </span>
                  <span
                    className={clsx('animate-pulse', {
                      fadeIn: !data.found,
                      hidden: data.found,
                    })}
                  >
                    {q ? (
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                    ) : (
                      <>There are no products that match the selected category.</>
                    )}
                  </span>
                </>
              ) : q ? (
                <>
                  Searching for: "<strong>{q}</strong>"
                </>
              ) : (
                <>Searching...</>
              )}
            </div>
          )}
          {data && data.products ? (
            <div className="sm:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-6">
              {data &&
                data.products?.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    className="animate-pulse fadeIn"
                    product={product}
                    imgProps={{
                      width: 480,
                      height: 480,
                    }}
                  />
                ))}
            </div>
          ) : (
            <div className="sm:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-6">
              {rangeMap(12, (i) => (
                <Skeleton key={i}>
                  <div className="w-60 h-72" />
                </Skeleton>
              ))}
            </div>
          )}{' '}
        </div>

        {/* Sort */}
        <SearchSort
          activeFilter={activeFilter}
          toggleFilter={toggleFilter}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

Search.Layout = Layout;
export default Search;
