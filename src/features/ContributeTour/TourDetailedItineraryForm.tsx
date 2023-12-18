import { Input } from '@nextui-org/react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { ContributeTourFormSchemaType } from '../../validators/ContributeTourFormValidator';

const DetailedItineraryForm = ({
  register,
  errors,
  getValues,
}: {
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => {
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
