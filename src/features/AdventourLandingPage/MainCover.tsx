import coverImage from '/5.gif';
import { useState, useEffect, useRef } from 'react';
import { Button, Input } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import adventureActivities from '../../utils/adventureGenres';
import { useNavigate } from 'react-router-dom';

const MainCover = () => {
  const [searchItem, setSearchItem] = useState<string>('places');
  const navigate = useNavigate();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.SyntheticEvent<EventTarget>) => {
    if (!searchInputRef.current?.value) return;
    const trimmedSearchTerm = searchInputRef.current.value;
    if ((event as KeyboardEventInit).key === 'Enter' || event.type === 'click') {
      if (trimmedSearchTerm) {
        const url = new URLSearchParams();
        url.set('query', trimmedSearchTerm);
        navigate(`/tours?${url.toString()}`);
      }
    } else {
      setSearchItem(trimmedSearchTerm);
    }
  };

  useEffect(() => {
    const searchList = [
      'places',
      'activities',
      'Manali',
      'Rishikesh',
      'Bengaluru',
      'Ladakh',
      'Kashmir',
      'Andaman',
      'Goa',
      ...adventureActivities,
    ];
    let currentIdx = 0;
    const timerID = setInterval(() => {
      setSearchItem(searchList[currentIdx++ % searchList.length]);
    }, 3000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <section
      className="flex flex-col w-full gap-10 mx-auto h-[33.5625rem] p-16 md:rounded-lg"
      style={{
        background: `linear-gradient(90deg, rgba(0, 35, 77, 0.63) 11.46%, rgba(0, 35, 77, 0.00) 77.37%), url(${coverImage}), lightgray 0px -211.032px / 100.279% 170.94%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-3xl lg:text-4xl font-semibold text-white">
        Connect with expert guides for
        <br />
        unforgettable tours..
      </p>

      <p className="text-lg text-slate-200">Discover Adventures: Your Journey, Our Expertise!</p>

      <div className="flex self-center w-[300px] sm:mt-8 sm:w-[600px] overflow-hidden">
        <Input
          type="search"
          size="sm"
          className="w-full"
          placeholder={`Search for "${searchItem}"`}
          startContent={<FaSearch className="mr-2" />}
          onKeyDown={handleSearch}
          ref={searchInputRef}
          endContent={
            <>
              <Button size="sm" className="bg-accent text-white" onClick={handleSearch}>
                Search
              </Button>
            </>
          }
        />
      </div>
    </section>
  );
};

export default MainCover;
