import Link from 'next/link';

import { Content, Manufacturer } from '@generated/types';

interface FooterProps {
  pages: Pick<Content, 'id' | 'title' | 'folder'>[];
  brands: Pick<Manufacturer, 'id' | 'title'>[];
}

const links = [
  {
    id: 'home',
    title: 'Home',
  },
];

const Footer = ({ pages, brands }: FooterProps) => {
  const sitePages = pages ? pages.filter((page) => page.folder === 'CMSFOLDER_USERINFO') : [];
  return (
    <footer className="text-gray-50 dark:border-gray-600 transition-colors duration-150 bg-black border-t border-gray-100">
      <div className="lg:grid-cols-4 container grid grid-cols-1 gap-8 py-16 mx-auto">
        <div className="flex flex-row col-span-1">
          <Link href="/">
            <a className="flex items-center flex-initial font-bold">
              <span className="mr-2">Powered by</span>
              <span className="text-xl font-semibold tracking-tight">
                OXID <span className="text-red-600">e</span>
                Sales
              </span>
            </a>
          </Link>
        </div>
        <div className="grid">
          {[...links, ...sitePages].map((page) => (
            <span key={page.id} className="py-2">
              <Link href={`/${page.id}`}>
                <a className="hover:underline transition duration-150 ease-in-out">{page.title}</a>
              </Link>
            </span>
          ))}
        </div>
        <div className="grid">
          {brands.slice(0, 6).map((brand) => (
            <span key={brand.id} className="py-2">
              <Link href={`/search/brands/${brand.title.toLowerCase()}`}>
                <a className="hover:underline transition duration-150 ease-in-out">{brand.title}</a>
              </Link>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full pb-8 mx-auto text-sm text-center text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        in Freiburg
        {` ${new Date().getFullYear()}.`}
      </div>
    </footer>
  );
};

export default Footer;
