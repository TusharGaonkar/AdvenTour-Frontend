import { Button } from '@nextui-org/react';
import NearByTours from './NearByTours';
import SelectGroupSize from './SelectGroupSize';
import SelectTourDate from './SelectTourDate';

const FindTours = () => (
  <div className="flex items-center justify-between w-full gap-8 px-6 py-8">
    <NearByTours />
    <SelectGroupSize />
    <SelectTourDate />
    <Button className="w-full h-full py-4 text-white bg-primary"> Search Tours</Button>
  </div>
);

export default FindTours;
