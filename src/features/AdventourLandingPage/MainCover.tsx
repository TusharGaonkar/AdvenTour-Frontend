import coverImage from '/5.gif';
import { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import adventureActivities from '../../utils/adventureGenres';

const MainCover = () => {
  const [searchItem, setSearchItem] = useState<string>('places or activities');

  useEffect(() => {
    let currentIdx = 0;
    const timerID = setInterval(() => {
      setSearchItem(adventureActivities[currentIdx++ % adventureActivities.length]);
    }, 3000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <section
      className="flex flex-col w-full gap-10 mx-auto h-[33.5625rem] p-16 rounded-lg"
      style={{
        background: `linear-gradient(90deg, rgba(0, 35, 77, 0.63) 11.46%, rgba(0, 35, 77, 0.00) 77.37%), url(${coverImage}), lightgray 0px -211.032px / 100.279% 170.94%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-4xl font-semibold text-white">
        Connect with expert guides for
        <br />
        unforgettable tours..
      </p>

      <p className="text-lg text-slate-200">Discover Adventures: Your Journey, Our Expertise!</p>

      <div className="flex self-center mt-8 w-[600px]">
        <Input
          type="search"
          size="sm"
          placeholder={`Try searching for "${searchItem}"`}
          startContent={<FaSearch className="mr-2" />}
          endContent={
            <Button size="sm" className="bg-neutral/95">
              Search
            </Button>
          }
        />
      </div>
    </section>
  );
};

export default MainCover;
