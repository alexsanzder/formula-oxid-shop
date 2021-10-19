import React, {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    ReactElement,
} from "react";

interface SearchInterface {
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
    suggestions: any[];
    setSuggestions: Dispatch<SetStateAction<any>>;
}

interface PropsType {
    children?: ReactElement;
}

const SearchContext = createContext({} as SearchInterface);

export default function SearchProvider(props: PropsType) {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    return (
        <SearchContext.Provider
            value={{ searchInput, setSearchInput, suggestions, setSuggestions }}
        >
            {props.children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const searchContext = useContext(SearchContext);
    if (!searchContext) {
        throw new Error("Missing SearchProvider");
    }
    return searchContext;
}
