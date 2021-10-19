import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import Search from "./Search";
import Navbar from "./Navbar";
import { Category } from "@generated/types";

interface HeaderProps {
    categories: Category[];
}

const Header = ({ categories }: HeaderProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const switchTheme = () => {
        if (isMounted) {
            setTheme(theme === "light" ? "dark" : "light");
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

    return (
        <header>
            <div className="font-medium">
                <div
                    className={clsx(
                        "dark:bg-gray-400 dark:text-gray-900 bg-gray-100 flex items-center justify-center py-2 space-x-2 text-xs text-gray-600"
                    )}
                >
                    <span>Formula = React + GraphQL OXID Shop.</span>
                    <a
                        className="px-4 py-0.5 text-white bg-black rounded-full"
                        href="https://github.com/alexsanzder/formula-oxid-shop"
                    >
                        Learn more
                    </a>
                </div>
                <div
                    className={clsx(
                        "transition ease-in-out dark:border-gray-600 border-b border-gray-200 dark:bg-gray-900 z-40 w-full bg-white dark:border-b shadow-lg",
                        isScrolled ? "fixed top-0" : "relative"
                    )}
                >
                    <div className="w-full border-b border-gray-200">
                        <div className="max-w-7xl flex items-center p-4 mx-auto text-sm">
                            <Link href="/">
                                <a className="text-2xl font-semibold tracking-tight">
                                    OXID <span className="text-red-600">e</span>
                                    Shop
                                </a>
                            </Link>
                            <Search />
                            <div className="dark:text-gray-100 flex items-center space-x-4 text-xs text-gray-600">
                                <button className="dark:hover:text-gray-400 hover:text-gray-600 hover:underline pr-6 font-semibold">
                                    Sign In
                                </button>
                                <button
                                    className="dark:bg-transparent dark:hover:text-gray-400 hover:border-gray-600 bg-opacity-60 hover:text-gray-600 bg-gray-50 p-2 border border-gray-200 rounded-full"
                                    onClick={switchTheme}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {theme === "dark" ? (
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
                                <button className="dark:bg-transparent dark:hover:text-gray-400 hover:border-gray-600 bg-opacity-60 hover:text-gray-600 bg-gray-50 p-2 border border-gray-200 rounded-full">
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

                    <div className="max-w-7xl flex items-center justify-between px-4 mx-auto text-xs">
                        <Navbar categories={categories} />
                        <button className="dark:text-gray-200 dark:bg-transparent dark:border-gray-600 bg-gray-50 flex items-center px-4 py-px space-x-1 text-gray-500 border border-gray-300 rounded-full">
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
                            <span className="dark:text-gray-50 text-gray-800">
                                Invite a friend
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={clsx(" h-[122px]", isScrolled ? "block" : "hidden")}
            />
        </header>
    );
};

export default Header;
