import clsx from 'clsx';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';

interface SearchProps {
  className?: string;
  id?: string;
}

const Searchbar = ({ id = 'search' }: SearchProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string | string[] | undefined>(router.query.q);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    router.prefetch('/search');
  }, [router]);

  useEffect(() => {
    setSearchValue(searchValue);
    return () => {
      setSearchValue('');
    };
  }, [searchValue, router.query.q]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { key, currentTarget } = e;

    if (key === 'Enter') {
      const q = currentTarget.value;

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value && value !== '') {
      setSearchValue(value);
    } else onClear();
  };

  const onClear = () => {
    setSearchValue('');
    router.route === '/search' &&
      router.replace(
        {
          pathname: `/search`,
        },
        undefined,
        { shallow: true }
      );
  };

  const onFocus = () => {
    inputRef!.current!.focus();
  };

  return (
    <div className="flex-1 px-8 rounded-full">
      <div className="relative flex items-center rounded-full">
        <label className="hidden" htmlFor={id}>
          Search
        </label>
        <input
          className={clsx(
            'dark:bg-black dark:text-gray-100 dark:focus:ring-gray-100 dark:border-gray-600 focus:ring-gray-600 focus:outline-none focus:ring-1 focus:ring-opacity-90 focus:border-transparent focus:bg-white border-gray-200 bg-opacity-60 rounded-3xl w-full px-5 py-2.5 text-sm text-gray-800 bg-gray-100 border'
          )}
          id={id}
          type="search"
          placeholder="Search for products..."
          defaultValue={router.query.q}
          value={searchValue}
          onKeyUp={handleKeyUp}
          onChange={handleInputChange}
          ref={inputRef}
        />
        {searchValue && searchValue.length > 0 ? (
          <button
            className="dark:bg-transparent dark:text-gray-100 right-5 absolute text-gray-700"
            type="button"
            aria-label="Clear search input"
            onClick={onClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button
            className="dark:bg-transparent dark:text-gray-400 right-5 cursor-text absolute text-gray-700"
            type="button"
            aria-label="Focus search input"
            onClick={onFocus}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Searchbar);
