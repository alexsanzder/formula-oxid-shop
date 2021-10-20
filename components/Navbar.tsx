import Link from "next/link";

import { Category } from "@generated/types";

interface NavbarProps {
    categories: Category[];
}

const Navbar = ({ categories }: NavbarProps) => {
    return (
        <nav>
            {categories?.map((category) => (
                <span key={category.id} className="group">
                    <Link
                        href={`/search/${category.title.toLowerCase()}`}
                        passHref
                    >
                        <a className="group-hover:border-gray-900 dark:text-gray-200 dark:bg-transparent dark:group-hover:border-gray-50 inline-block px-4 py-3 text-gray-700 transition border-b-2 border-transparent">
                            {category.title}
                        </a>
                    </Link>
                    {category.children.length ? (
                        <div className="group-hover:block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600 absolute inset-x-0 z-40 hidden transition-all duration-700 ease-in-out bg-white border-t border-gray-300 shadow-lg">
                            <div className="max-w-7xl flex flex-col items-start w-full px-8 py-4 mx-auto">
                                {category.children.map((subcategory) => (
                                    <Link
                                        key={subcategory.id}
                                        href={`/search/${subcategory.title.toLowerCase()}`}
                                    >
                                        <a className="hover:text-gray-500 py-2">
                                            {subcategory.title}
                                        </a>
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
