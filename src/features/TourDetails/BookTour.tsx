import { Button, Input } from '@nextui-org/react';

const BookTour = () => (
  <div className="flex flex-col gap-3 rounded-sm">
    <Input type="date" />
    <div className="border-2 ">Hey</div>
    <Button color="warning">Book Now</Button>
  </div>
);

export default BookTour;
