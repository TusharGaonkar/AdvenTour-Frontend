import { Input, Textarea } from '@nextui-org/react';

const TourBriefForm = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <Input
        type="text"
        labelPlacement="outside"
        label="Tour Title"
        placeholder="Enter tour title"
      />
      <Textarea
        label="Tour Description"
        labelPlacement="outside"
        placeholder="Enter tour description"
      />
    </div>
  );
};

export default TourBriefForm;
