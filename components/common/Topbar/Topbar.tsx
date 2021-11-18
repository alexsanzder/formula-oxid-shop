import { useState } from 'react';

import clsx from 'clsx';

const Topbar = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <div
          className={clsx(
            'dark:bg-gray-900 dark:text-gray-200 bg-gray-200 text-gray-900 py-3 text-center text-xs'
          )}
          role="alert"
        >
          <span className="mr-2">
            <strong>Formula</strong> = React + GraphQL OXID Shop
          </span>
          <a
            className="hover:text-gray-300 bg-gradient-to-r from-purple-600 to-blue-600 dark:hover:bg-gradient-to-l hover:shadow-md px-4 py-0.5 text-white rounded-full"
            href="https://github.com/OXID-eSales/formula-oxid-storefront"
          >
            Learn more
          </a>
          <button
            className="right-4 absolute"
            onClick={() => setShow(false)}
            aria-label="Dismiss topbar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
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
        </div>
      )}
    </>
  );
};

export default Topbar;
