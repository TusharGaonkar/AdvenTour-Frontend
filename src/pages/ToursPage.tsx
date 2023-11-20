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
  </div>
);

const Filters = () => {
  return (
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
};

const TourCard = () => {
  return (
    <Card className="flex self-start w-full">
      <CardBody className="">
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-start">
            <div className="w-[300px] h-[200px] overflow-hidden rounded-xl">
              <Image
                alt="image"
                src="https://source.unsplash.com/random"
                height={200}
                width={300}
                className="object-cover w-full"
              />
            </div>
            <div className="flex flex-col justify-between gap-3 p-2">
              <h1 className="self-stretch text-xl font-semibold">
                {' '}
                CVK Park Bosphorus Hotel Istanbul
              </h1>
              <p className="text-md text-slate-500">Bengaluru,Karnataka</p>
              <StarRatings
                rating={4}
                starRatedColor="orange"
                starDimension="17px"
                starSpacing="2px"
              />
              <Button className="flex flex-col items-stretch w-full mt-4 bg-teal-300">
                View Place
              </Button>
            </div>

            <div className="flex flex-col items-start justify-start p-2">
              <p className="min-w-max">Starting from</p>
              <p className="text-xl font-semibold text-orange-400 min-w-max">₹ 1,000/night</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
const ToursPage = () => (
  <div className="max-w-5xl mx-auto">
    <NavBar />
    <FindTours />

    <div className="flex flex-row gap-12">
      <Filters />
      <TourCard />
    </div>
  </div>
);
export default ToursPage;
