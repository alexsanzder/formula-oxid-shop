import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@context/SearchContext";
import { PageGetProductsComp, ssrGetProducts } from "@generated/pages";

const Search: PageGetProductsComp = ({ data }) => {
    const router = useRouter();
    const [products, setProducts] = useState(data?.products);

    useEffect(() => {
        data && setProducts(data.products);
    }, [data]);

    const [inputValue, setInputValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { setSuggestions } = useSearch();

    const getFilteredRows = (products: any, filterKey: string) => {
        return products?.filter((product: any) => {
            return (
                product!.title!.toLowerCase().indexOf(filterKey.toLowerCase()) >
                    -1 ||
                product!
                    .shortDescription!.toLowerCase()
                    .indexOf(filterKey.toLowerCase()) > -1
            );
        });
    };

    useEffect(() => {
        setSuggestions(getFilteredRows(products, inputValue));
    }, [inputValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value && value !== "") {
            setInputValue(value);
            router.push("/search");
        } else onClear();
    };

    const onClear = () => {
        setInputValue("");
    };

    const onFocus = () => {
        inputRef?.current?.focus();
    };

    return (
        <div className="flex-1 px-8 rounded-full">
            <div className="relative flex items-center rounded-full">
                <input
                    className="dark:bg-black dark:text-gray-100 dark:focus:ring-gray-100 dark:border-gray-600 focus:ring-gray-600 focus:outline-none focus:ring-1 focus:ring-opacity-90 focus:border-transparent focus:bg-white border-gray-100 bg-opacity-60 rounded-3xl w-full px-5 py-2.5 text-sm text-gray-800 bg-gray-100 border"
                    type="search"
                    placeholder="Search for anything..."
                    value={inputValue}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                {inputValue && inputValue.trim().length > 0 ? (
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

export const getStaticProps = async () => {
    return await ssrGetProducts.getServerPage({});
};

export default Search;
