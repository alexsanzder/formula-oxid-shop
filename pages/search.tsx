import ListView from "@components/ListView";
import { useSearch } from "@context/SearchContext";

const Search = () => {
    const { suggestions } = useSearch();

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl flex flex-col items-center justify-between px-4 py-8 mx-auto">
                <ListView items={suggestions} />
            </div>
        </div>
    );
};

export default Search;
