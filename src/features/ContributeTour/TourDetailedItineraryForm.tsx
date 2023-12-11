import { Input } from '@nextui-org/react';

const DetailedItineraryForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        label="Detailed Itinerary"
        placeholder="Enter detailed itinerary"
        labelPlacement="outside"
      />
    </div>
  );
};

export default DetailedItineraryForm;
