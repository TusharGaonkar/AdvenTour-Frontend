/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Input, Progress } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import Highlighter from 'react-highlight-words';
import { useState, useEffect, useCallback, useRef } from 'react';
import { setSearchToursString } from '../../redux/slices/filterToursSlice';
import { useGetSuggestionsQuery } from '../../redux/slices/autocompleteSlice';

function flattenSuggestions(suggestions: Record<string, any>[]) {
  const result = suggestions.map(({ highlights }) => {
    const typeHit = highlights.map(({ texts }: { texts: Record<string, any>[] }) => {
      const temp = texts.filter(({ type }) => type === 'hit');

      return temp;
    });

    return typeHit;
  });

  return result.flat(2);
}

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchToursString } = useSelector((state) => state.filterToursQueryString);
  const [inputValue, setInputValue] = useState(() => searchToursString || ''); // on mount set search string as input value!
  const { data: response, status } = useGetSuggestionsQuery(inputValue);
  const [suggestions, setSuggestions] = useState([]);
  const searchDivRef = useRef<null | HTMLDivElement>(null);
  const suggestionRef = useRef<null | HTMLDivElement>(null);

  const handleSearch = useCallback(
    (searchString: string) => {
      dispatch(setSearchToursString(searchString));
    },
    [dispatch]
  );

  const handleClick = (event: MouseEvent) => {
    if (
      searchDivRef.current &&
      event.target instanceof Node &&
      !searchDivRef.current.contains(event.target)
    ) {
      if (suggestionRef.current) {
        suggestionRef.current.style.display = 'none';
      }
    }
  };

  // debouncing implemented in search to prevent request throttling!!
  useEffect(() => {
    if (suggestionRef.current) {
      suggestionRef.current.style.display = 'block';
    }
    const delay = 300;
    const timer = setTimeout(() => {
      handleSearch(inputValue);
    }, delay);
    return () => {
      // caution will run on stale input values ,  remember to cleanup any previous timers
      clearTimeout(timer);
    };
  }, [inputValue, handleSearch]);

  useEffect(() => {
    if (status === 'fulfilled') {
      setSuggestions(response?.data?.searchSuggestions || []);
    }
  }, [response, status]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="relative" ref={searchDivRef}>
      <Input
        type="search"
        size="sm"
        placeholder="Search places to go"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        startContent={<FaSearch className="mr-2" />}
      />

      {suggestions.length > 0 ? (
        <div
          className="absolute w-full mt-1 shadow-xl bg-secondary rounded-b-xl"
          ref={suggestionRef}
        >
          <Progress
            isIndeterminate={status === 'pending'}
            aria-label="progress"
            size="sm"
            className={status === 'pending' ? 'w-full overflow-hidden' : 'hidden'}
          />
          <p className="p-3 text-xs italic text-gray-600 font-semilight ">
            {`Search results matched in the tours for "${inputValue}"`}
          </p>
          <ul className="w-full h-full cursor-pointer">
            {flattenSuggestions(suggestions).map(({ value }) => (
              <li
                className="px-3 py-4 truncate border-slate-300 border-b-1 last:border-none hover:bg-white last:rounded-b-xl "
                key={value}
                onClick={() => {
                  setInputValue(value);
                  if (suggestionRef.current) {
                    suggestionRef.current.style.display = 'none';
                  }
                }}
              >
                <Highlighter
                  highlightClassName=" font-semibold bg-[#99FF99]/60"
                  searchWords={[inputValue]}
                  autoEscape
                  textToHighlight={value}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
