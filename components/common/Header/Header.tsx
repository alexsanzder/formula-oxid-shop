import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { useShop } from '@context/ShopContext';

import { Topbar, Navbar, Searchbar, Modal } from '@components/common';
import { Category } from '@generated/types';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

interface HeaderProps {
  categories: Category[];
}

const Header = ({ categories }: HeaderProps) => {
  const {
    shopState: { isSticky },
  } = useShop();
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useScrollPosition(
    ({ currPos }) => {
      setIsScrolled(currPos.y >= 36);
    },
    [isScrolled],
    undefined,
    true,
    0
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Topbar />
      <header
        className={clsx(
          'transition ease-in-out top-0 dark:bg-black z-40 w-full bg-white border-b dark:border-gray-700 border-gray-300',
          isScrolled && 'shadow-xl',
          isSticky && 'sticky'
        )}
      >
        <div className="dark:border-gray-700 w-full border-b border-gray-300">
          <div className="container flex items-center py-4 mx-auto text-sm">
            <Link href="/">
              <a className="flex items-center justify-center text-2xl font-semibold tracking-tight">
                <Image src="/logo.svg" height={50} width={50} alt="Formula Logo" />
                <span className="dark:text-gray-300 ml-1 capitalize">Formula</span>
              </a>
            </Link>
            <Searchbar />
            <div className="dark:text-gray-100 flex items-center space-x-4 text-xs text-gray-600">
              <button
                className="dark:hover:text-gray-400 hover:text-gray-600 hover:underline pr-6 font-semibold"
                onClick={() => setShowModal(!showModal)}
              >
                Sign In
              </button>
              <button
                className={clsx(
                  ' bg-opacity-60 bg-gray-50 p-2 border border-gray-200 rounded-full',
                  'dark:bg-transparent dark:hover:text-gray-400',
                  'hover:border-gray-600 hover:text-gray-600 hover:bg-gray-100'
                )}
                onClick={switchTheme}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {theme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              </button>
              <button
                className={clsx(
                  ' bg-opacity-60 bg-gray-50 p-2 border border-gray-200 rounded-full',
                  'dark:bg-transparent dark:hover:text-gray-400',
                  'hover:border-gray-600 hover:text-gray-600 hover:bg-gray-100'
                )}
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="container flex items-center justify-between mx-auto text-xs">
          <Navbar categories={categories} />
          <button
            className={clsx(
              'bg-gray-50 bg-opacity-60 flex items-center px-4 py-px space-x-1 text-gray-600 border border-gray-400  rounded-full',
              'dark:bg-transparent dark:hover:text-gray-400 dark:text-gray-50',
              'hover:border-gray-600 hover:text-gray-600 hover:bg-gray-100'
            )}
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
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <span>Invite a friend</span>
          </button>
        </div>
      </header>
      {showModal && (
        <Modal setShowModal={setShowModal} showModal={showModal}>
          <div className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl">
            <div className="sm:p-6 sm:pb-4 px-4 pt-5 pb-4 bg-white">
              <div className="flex items-center justify-between w-full pb-4 border-b border-gray-300">
                Login or Register
                <button className="" onClick={() => setShowModal(!showModal)}>
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
              <div className="sm:flex sm:items-start py-8">
                <div className="sm:mt-0 sm:ml-4 sm:text-left mt-4 text-center">
                  <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                    Welcome to Formula
                  </h3>
                  <div className="flex flex-col mt-4 space-y-2">
                    <div>
                      <label className="text-sm" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-sm"
                        type="email"
                        name="email"
                      />
                    </div>
                    <button className="w-full px-4 py-2 text-white bg-black border border-black rounded-sm">
                      Continue
                    </button>
                  </div>
                  <div className="mt-8">
                    <p className="text-xs text-gray-500">
                      By signing up, you agree to our
                      <Link href="/">
                        <a className="font-semibold underline"> Terms of Use</a>
                      </Link>{' '}
                      and{' '}
                      <Link href="/">
                        <a className="font-semibold underline"> Privacy Policy</a>
                      </Link>
                      . We may send you communications; you may change your preferences in your
                      account settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
