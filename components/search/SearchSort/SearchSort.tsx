import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
};

interface SearchSortProps {
  activeFilter: string;
  toggleFilter: boolean;
  handleClick: (arg1: any, arg2: any) => void;
}

const SearchSort = ({ activeFilter, toggleFilter, handleClick }: SearchSortProps) => {
  const router = useRouter();
  const { q, sort } = router.query;

  return (
    <div className="lg:col-span-1 lg:order-none order-2 float-right col-span-4 text-right">
      <div className="relative inline-block w-full">
        <div className="lg:hidden">
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              onClick={(e) => handleClick(e, 'sort')}
              className="border-accent-3 bg-accent-0 text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 flex justify-between w-full px-4 py-3 text-sm font-medium leading-5 transition duration-150 ease-in-out border rounded-sm"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {sort ? SORT[sort as keyof typeof SORT] : 'Relevance'}
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
          className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
            activeFilter !== 'sort' || toggleFilter !== true ? 'hidden' : ''
          }`}
        >
          <div className="bg-accent-0 lg:bg-none lg:shadow-none rounded-sm shadow-xs">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <ul>
                <li
                  className={clsx(
                    'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                    {
                      underline: !sort,
                    }
                  )}
                >
                  <Link
                    href={
                      {
                        // pathname,
                        // query: filterQuery({ q }),
                      }
                    }
                  >
                    <a
                      onClick={(e) => handleClick(e, 'sort')}
                      className={'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'}
                    >
                      Relevance
                    </a>
                  </Link>
                </li>
                {Object.entries(SORT).map(([key, text]) => (
                  <li
                    key={key}
                    className={clsx(
                      'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                      {
                        underline: sort === key,
                      }
                    )}
                  >
                    <Link
                      href={
                        {
                          // pathname,
                          // query: filterQuery({
                          //     q,
                          //     sort: key,
                          // }),
                        }
                      }
                    >
                      <a
                        onClick={(e) => handleClick(e, 'sort')}
                        className={'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'}
                      >
                        {text}
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

export default SearchSort;
