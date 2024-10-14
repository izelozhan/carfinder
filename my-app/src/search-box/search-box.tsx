import React, { useState, useEffect, useRef } from "react";
import SearchResultType from "./search-result-type";
import SearchResult from "./search-result";
import "./search-box.css";
import env from "../environment";
import toast from "react-simple-toasts";

interface SearchBoxProps {
  addedIds: number[];
  onAdded: (result: SearchResultType) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ addedIds, onAdded }) => {
  const [query, setQuery] = useState<string>(""); // Search query
  const [results, setResults] = useState<SearchResultType[]>([]); // API results
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null); // Timer for debounce
  
  const searchTextBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]); // Reset results if query is empty
      return;
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer); // Clear the previous timer
    }

    const timer = window.setTimeout(() => {
      fetchResults(query); // Fetch results after delay
    }, 500);

    setDebounceTimer(timer);

    // Cleanup function to clear timeout
    return () => {
      clearTimeout(timer);
    };
  }, [query, debounceTimer]);

  const addToList = (result: SearchResultType) => {
    setResults((curr) => {
      return curr.filter((i) => i.id != result.id);
    });
    setQuery("");
    onAdded(result);
  };

  const fetchResults = async (searchQuery: string) => {
    setIsLoading(true);

    fetch(`${env.apiUrl}/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data: SearchResultType[]) => {
        setResults(data.filter((i) => !addedIds.includes(i.id)));
        setIsLoading(false);
      })
      .catch((err) => {
        toast("An error occured while searching. Please try again");
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col mt-12 sm:pl-4 sm:pr-4 xs:pl-4 xs:pr-4">
      {addedIds.length < 3 && (
        <div className="drop-shadow-sm text-xl mb-4">
          Add {3 - addedIds.length} cars that you love, and rate them to find
          your next car
        </div>
      )}
      {addedIds.length == 3 && (
        <div className="drop-shadow-sm text-xl mb-6 mt-6">
          Now, rate your experience.
        </div>
      )}
      {addedIds.length < 3 && (
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            ref={searchTextBox}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-3 text-black  w-full bg-white rounded-3xl pl-6"
          />

          {isLoading && <div>Loading...</div>}
          <div>
            <div className="results rounded-3xl mt-4 absolute flex flex-col ">
              {results &&
                results.length > 0 &&
                results.map((result) => (
                  <SearchResult onAdded={addToList} result={result} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
