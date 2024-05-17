/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Input, Progress } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import Highlighter from 'react-highlight-words';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { resetToursQueryString, setSearchToursString } from '../../redux/slices/filterToursSlice';
import { useGetSuggestionsQuery } from '../../redux/slices/autocompleteSlice';
import useDebounce from '../../hooks/useDebounce';
import { RootState } from '../../app/store';

const flattenSuggestions = (suggestions: Record<string, any>[]) => {
  const result = suggestions.map(({ highlights }) => {
    const typeHit = highlights.map(({ texts }: { texts: Record<string, any>[] }) => {
      const temp = texts.filter(({ type }) => type === 'hit');

      return temp;
    });

    return typeHit;
  });

  const res = result.flat(2);
  const uniqueSuggestions = [...new Set(res?.map((suggestion) => suggestion.value))];

  return uniqueSuggestions;
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // retrieve the previous search query between different page navigation
  const previousSearchString = useSelector(
    (state: RootState) => state.filterToursQueryString.searchToursString
  );

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.trim() || '';

  const [inputValue, setInputValue] = useState(() => previousSearchString || query);
  const [searchString, setSearchString] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const { data: response, status } = useGetSuggestionsQuery(searchString);

  const searchDivRef = useRef<null | HTMLDivElement>(null);
  const suggestionRef = useRef<null | HTMLDivElement>(null);

  const handleSearch = useCallback(
    (inputString: string) => {
      dispatch(resetToursQueryString());
      dispatch(setSearchToursString(inputString));
      navigate('/tours');
    },
    [dispatch, navigate]
  );

  // Debounce the input change using custom hook implemented , delay of about 350 ms
  const handleInputChange = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);
    if (suggestionRef.current) {
      suggestionRef.current.style.display = 'block';
    }
  }, 350);

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
    if (suggestionRef.current) {
      suggestionRef.current.style.display = 'none';
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
      suggestionRef.current.style.display = 'none';
    }
  };

  const handleClearSearch = () => {
    setInputValue('');
    dispatch(resetToursQueryString());
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      setSuggestions(response?.data?.searchSuggestions || []);
    }
  }, [response, status]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (suggestionRef.current) {
      suggestionRef.current.style.display = 'none';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full rounded-full" ref={searchDivRef}>
      <Input
        type="text"
        size="sm"
        placeholder="Search places to go"
        defaultValue={inputValue}
        value={inputValue}
        radius="full"
        onChange={(event) => {
          setInputValue(event.target.value);
          handleInputChange(event);
        }}
        onClear={() => {
          handleClearSearch();
        }}
        startContent={<FaSearch className="mr-2" />}
      />

      <div className="absolute w-full mt-1 shadow-xl bg-secondary rounded-b-xl" ref={suggestionRef}>
        <Progress
          isIndeterminate={status === 'pending'}
          aria-label="progress"
          size="sm"
          className={status === 'pending' ? 'w-full overflow-hidden' : 'hidden'}
        />

        {suggestions.length > 0 && inputValue.length > 0 && (
          <p className="p-3 text-xs italic text-gray-600 truncate font-semilight ">
            {`Search results matched in the tours for "${inputValue}"`}
          </p>
        )}

        <ul className="w-full h-full cursor-pointer">
          {flattenSuggestions(suggestions).map((value) => (
            <li
              className="px-3 py-4 truncate border-slate-300 border-b-1 last:border-none hover:bg-white last:rounded-b-xl "
              key={value}
              onClick={() => handleSuggestionClick(value)}
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
    </div>
  );
};

export default SearchBar;
