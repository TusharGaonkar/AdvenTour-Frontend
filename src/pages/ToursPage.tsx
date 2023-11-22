import {
  Input,
  Button,
  Select,
  SelectItem,
  Slider,
  Checkbox,
  Card,
  CardBody,
  Image,
  Divider,
} from '@nextui-org/react';
import NavBar from '../features/AdventourLandingPage/Navbar';
import { FaSearch } from 'react-icons/fa';
import { Switch } from '@nextui-org/react';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { FaRegHeart } from 'react-icons/fa';

const SearchBar = () => (
  <Input
    type="search"
    size="sm"
    placeholder="Search places to go"
    startContent={<FaSearch className="mr-2" />}
  />
);

const NearByTours = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="flex items-center self-stretch justify-between w-full p-3 bg-gray-100 rounded-xl">
      <p className="text-xs font-semibold"> Get nearby tours</p>
      <Switch
        className="h-full"
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      />
    </div>
  );
};

const SelectGroupSize = () => {
  const groupSize = ['1', '2', '3', '4'];
  return (
    <Select
      label="Group Size"
      placeholder="Select group size"
      className="max-w-xs"
      defaultSelectedKeys={['1']}
    >
      {groupSize.map((item) => (
        <SelectItem value={item} key={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
};

const FindTours = () => (
  <div className="flex items-center justify-between w-full gap-8 px-6 py-8">
    <SearchBar />
    <Input type="date" label="Tour Date" placeholder="Select a tour date" />
    <SelectGroupSize />
    <NearByTours />
    <Button className="w-full h-full py-4 bg-teal-400"> Search Tours</Button>
  </div>
);

const Filters = () => (
  <div className="flex flex-col items-start h-full gap-6">
    <div className="flex flex-col items-start gap-12">
      <p className="text-lg font-bold">Filters</p>
      <div className="flex flex-col w-full gap-3">
        <p className="font-semibold">Tour price per person</p>
        <Slider
          label="Price"
          step={100}
          minValue={0}
          maxValue={100000}
          defaultValue={[2500, 10000]}
          className="min-w-[250px]"
          formatOptions={{ style: 'currency', currency: 'INR' }}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold "> Group age group</p>
        <Checkbox label="Nearby">Children (0 - 12 years)</Checkbox>
        <Checkbox label="Nearby">Teenagers (12 - 18 years)</Checkbox>
        <Checkbox label="Nearby">Adults (18 - 64 years)</Checkbox>
        <Checkbox label="Nearby">Seniors(65+ years)</Checkbox>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Tour Rating</p>

        {[4, 3, 2, 1].map((item) => (
          <StarRatings
            rating={item}
            key={item}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="3px"
          />
        ))}
      </div>
    </div>
  </div>
);

const TourCard = () => (
  <Card className="flex flex-row items-center self-start">
    <CardBody className="">
      <div className="flex flex-row items-start">
        <div className="w-[280px] h-[260px] overflow-hidden rounded-xl">
          <Image
            alt="image"
            src="https://source.unsplash.com/random"
            height={290}
            width={280}
            className="object-cover w-full"
          />
        </div>

        <div className="flex flex-col items-start gap-6 p-4">
          <div className="flex flex-row items-start gap-6">
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-xl font-bold">Netravati Island River diving and Scubadiving</h1>
              <p className="text-sm text-slate-400">Karwar,Karnataka</p>
              <StarRatings
                rating={4}
                starRatedColor="orange"
                starDimension="20px"
                starSpacing="3px"
              />
            </div>

            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-slate-600 min-w-max">Starting from </p>
              <p className="text-2xl font-semibold text-violet-600">₹1200/person</p>
            </div>
          </div>
          <Divider />
          <div className="flex flex-row items-center self-stretch justify-center gap-2">
            <div className="p-4 cursor-pointer border-slate-300 border-1">
              <FaRegHeart />
            </div>
            <Button color="primary" className="w-full py-6 rounded-md">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </CardBody>
  </Card>
);
const ToursPage = () => (
  <div className="max-w-6xl mx-auto">
    <NavBar />
    <FindTours />

    <div className="flex flex-row gap-12">
      <Filters />
      <div className="flex flex-col items-start gap-6">
        {Array.from({ length: 3 }).map(() => (
          <TourCard key={Math.random()} />
        ))}
      </div>
    </div>
  </div>
);
export default ToursPage;
