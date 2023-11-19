import coverImage from '/5.gif';
import { Button, Input } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';

const MainCover = () => (
  <div
    className="flex flex-col max-w-5xl gap-10 mx-auto h-[33.5625rem] p-16"
    style={{
      background: `linear-gradient(90deg, rgba(0, 35, 77, 0.63) 11.46%, rgba(0, 35, 77, 0.00) 77.37%), url(${coverImage}), lightgray 0px -211.032px / 100.279% 170.94%`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <p className="text-4xl font-semibold text-white">
      Connect with Expert Guides for <br></br> unforgettable tours...
    </p>

    <p className="text-lg italic text-slate-200">
      Unlock Experiences, Discover Adventures: Your Journey, Our Expertise!
    </p>

    <div className="flex self-center mt-10 w-[600px]">
      <Input
        type="search"
        size="sm"
        placeholder="Search places to go"
        startContent={<FaSearch className="mr-2" />}
        endContent={
          <Button size="sm" className="bg-teal-400">
            Search
          </Button>
        }
      />
    </div>
  </div>
);

export default MainCover;
