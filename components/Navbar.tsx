import { Category } from "@generated/types";
import Link from "next/link";
import Portal from "./Portal";

interface NavbarProps {
    categories: Category[];
}

const Navbar = ({ categories }: NavbarProps) => {
    return (
        <nav>
            {categories?.map((category) => (
                <>
                    <Link
                        key={category.id}
                        href={`/search/${category.title.toLowerCase()}`}
                    >
                        <button className="group dark:text-gray-200 dark:bg-transparent hover:border-gray-900 dark:hover:border-gray-50 inline-block px-4 py-3 text-gray-700 transition border-b-2 border-transparent">
                            <span>{category.title}</span>
                            <div className="group-hover:block absolute hidden inset-x-0 transition-all  w-full mt-[15px]  ease-in-out duration-700 bg-white shadow-lg">
                                <div className="max-w-7xl flex flex-col items-start w-full px-8 py-4 mx-auto">
                                    {category.children.map((subcategory) => (
                                        <Link
                                            key={subcategory.id}
                                            href={`/search/${subcategory.title.toLowerCase()}`}
                                        >
                                            <a className="hover:text-gray-400 py-2">
                                                {subcategory.title}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </button>
                    </Link>
                </>
            ))}
        </nav>
    );
};

export default Navbar;
