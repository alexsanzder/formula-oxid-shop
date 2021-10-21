import Link from 'next/link';
import clsx from 'clsx';

import { GetSearchSiteQuery } from '@generated/graphql';

interface SearchSidebarProps {
  activeFilter: string;
  toggleFilter: boolean;
  categories: GetSearchSiteQuery['categories'];
  activeCategory: GetSearchSiteQuery['categories'][0] | undefined;
  brands: GetSearchSiteQuery['brands'];
  activeBrand: GetSearchSiteQuery['brands'][0] | undefined;
  handleClick: (arg1: any, arg2: any) => void;
  query: string;
}
const SearchSidebar = ({
  activeFilter,
  toggleFilter,
  categories,
  activeCategory,
  brands,
  activeBrand,
  handleClick,
  query,
}: SearchSidebarProps) => {
  return (
    <div className="lg:col-span-2 lg:order-none order-1 col-span-8">
      {/* Categories */}
      <div className="relative inline-block w-full">
        <div className="lg:hidden">
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              onClick={(e) => handleClick(e, 'categories')}
              className="hover:text-gray-200 focus:outline-none focus:border-gray-300 focus:shadow-outline-normal active:bg-gray-100 active:text-gray-800 flex justify-between w-full px-4 py-3 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out bg-transparent border border-gray-300 rounded-sm"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {activeCategory?.title ? `Category: ${activeCategory?.title}` : 'All Categories'}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
        <div
          className={clsx(
            'origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block',
            activeFilter !== 'categories' || toggleFilter !== true ? 'hidden' : ''
          )}
        >
          <div className="lg:bg-none lg:shadow-none bg-transparent rounded-sm shadow-xs">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <ul>
                <li
                  className={clsx(
                    'block text-sm leading-5 text-gray-900 dark:text-gray-50 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide',
                    'hover:bg-gray-100 lg:hover:bg-transparent hover:text-gray-600',
                    'focus:outline-none focus:bg-gray-100 focus:text-gray-700',
                    {
                      underline: !activeCategory?.title,
                    }
                  )}
                >
                  <Link href={{}}>
                    <a
                      className={'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'}
                      onClick={(e) => handleClick(e, 'categories')}
                    >
                      All Categories
                    </a>
                  </Link>
                </li>
                {categories!.map((cat) => (
                  <li
                    key={cat.id}
                    className={clsx(
                      'block text-sm leading-5 text-gray-700 dark:text-gray-50',
                      'focus:outline-none focus:bg-gray-100 focus:text-gray-800',
                      {
                        'font-semibold bg-gray-200 text-gray-900 dark:text-gray-900':
                          activeCategory?.id === cat!.id,
                        'hover:bg-gray-100 dark:hover:bg-transparent hover:text-gray-500 dark:hover:text-gray-50':
                          activeCategory?.id !== cat!.id,
                      }
                    )}
                  >
                    <Link
                      href={{
                        pathname: `/search/${cat.title.toLowerCase()}`,
                        query,
                      }}
                    >
                      <a
                        onClick={(e) => handleClick(e, 'categories')}
                        className={
                          'group block w-full lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                        }
                      >
                        <span
                          className="dark:group-hover:border-gray-100 pb-1 border-b-2 border-transparent"
                          dangerouslySetInnerHTML={{
                            __html: cat!.title,
                          }}
                        ></span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="relative inline-block w-full">
        <div className="lg:hidden mt-3">
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              onClick={(e) => handleClick(e, 'brands')}
              className="hover:text-gray-200 focus:outline-none focus:border-gray-300 focus:shadow-outline-normal active:bg-gray-100 active:text-gray-800 flex justify-between w-full px-4 py-3 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out bg-transparent border border-gray-300 rounded-sm"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {activeBrand?.title ? `Brand: ${activeBrand?.title}` : 'All Brands'}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
        <div
          className={clsx(
            'origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block',
            activeFilter !== 'brands' || toggleFilter !== true ? 'hidden' : ''
          )}
        >
          <div className="lg:bg-none lg:shadow-none bg-transparent rounded-sm shadow-xs">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <ul>
                <li
                  className={clsx(
                    'block text-sm leading-5 text-gray-900 dark:text-gray-50 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide',
                    'hover:bg-gray-100 lg:hover:bg-transparent hover:text-gray-600',
                    'focus:outline-none focus:bg-gray-100 focus:text-gray-700',
                    {
                      underline: !activeBrand?.id,
                    }
                  )}
                >
                  <Link href={{}}>
                    <a
                      onClick={(e) => handleClick(e, 'brands')}
                      className={'block w-full lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'}
                    >
                      All Brands
                    </a>
                  </Link>
                </li>
                {brands!.flatMap((brand: any) => (
                  <li
                    key={brand!.id}
                    className={clsx(
                      'block text-sm leading-5 text-gray-700 dark:text-gray-50',
                      'focus:outline-none focus:bg-gray-100 focus:text-gray-800',
                      {
                        'font-semibold bg-gray-200 text-gray-900 dark:text-gray-900':
                          activeBrand?.id === brand!.id,
                        'hover:bg-gray-100 dark:hover:bg-transparent hover:text-gray-500 dark:hover:text-gray-50':
                          activeBrand?.id !== brand!.id,
                      }
                    )}
                  >
                    <Link
                      href={{
                        pathname: `/search/brands/${brand.title.toLowerCase()}`,
                        query,
                      }}
                    >
                      <a
                        onClick={(e) => handleClick(e, 'brands')}
                        className={'group block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'}
                      >
                        <span
                          className="dark:group-hover:border-gray-100 pb-1 border-b-2 border-transparent"
                          dangerouslySetInnerHTML={{
                            __html: brand!.title,
                          }}
                        ></span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
