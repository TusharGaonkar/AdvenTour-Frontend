import { Button } from '@nextui-org/react';
import NearByTours from './NearByTours';
import SearchBar from './SearchBar';
import SelectGroupSize from './SelectGroupSize';
import SelectTourDate from './SelectTourDate';

const FindTours = () => (
  <div className="flex items-center justify-between w-full gap-8 px-6 py-8">
    <SearchBar />
    <SelectGroupSize />
    <NearByTours />
    <SelectTourDate />
    <Button className="w-full h-full py-4 bg-teal-400"> Search Tours</Button>
  </div>
);

export default FindTours;
