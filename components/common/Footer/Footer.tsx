import Link from 'next/link';

import { Content, Manufacturer } from '@generated/types';

interface FooterProps {
  pages: Content[];
  brands: Manufacturer[];
}

const links = [
  {
    title: 'Home',
    id: '',
  },
];

const Footer = ({ pages, brands }: FooterProps) => {
  const sitePages = pages ? pages.filter((page) => page.folder === 'CMSFOLDER_USERINFO') : [];
  return (
    <footer className="text-gray-50 dark:border-gray-600 transition-colors duration-150 bg-black border-t border-gray-100">
      <div className="lg:grid-cols-4 container grid grid-cols-1 gap-8 py-12 mx-auto">
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
    </footer>
  );
};

export default Footer;
