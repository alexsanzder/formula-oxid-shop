import Link from 'next/link';

import { Category } from '@generated/types';
import clsx from 'clsx';

interface NavbarProps {
  categories: Category[];
}

const Navbar = ({ categories }: NavbarProps) => {
  return (
    <nav>
      {categories?.map((category) => (
        <span key={category.id} className="group">
          <Link href={`/search/${category.title.toLowerCase()}`} passHref>
            <a
              className={clsx(
                'inline-block mr-8 py-3 text-gray-700 border-b-2 border-transparent',
                'dark:text-gray-200 dark:bg-transparent ',
                'group-hover:border-gray-900 dark:group-hover:border-gray-50'
              )}
            >
              {category.title}
            </a>
          </Link>
          {category.children.length ? (
            <div
              className={clsx(
                'absolute inset-x-0 z-40 hidden transition-all duration-700 ease-in-out bg-white border-t border-gray-300 shadow-lg',
                'dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600 dark:shadow-xl',
                'group-hover:block '
              )}
            >
              <div className="container flex flex-col items-start w-full px-6 py-2 mx-auto">
                {category.children.map((subcategory) => (
                  <Link key={subcategory.id} href={`/search/${subcategory.title.toLowerCase()}`}>
                    <a className="hover:text-gray-500 py-1.5">{subcategory.title}</a>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </span>
      ))}
    </nav>
  );
};

export default Navbar;
