/* eslint-disable react/jsx-props-no-spreading */
import { Input, Textarea, Listbox, ListboxItem, Checkbox } from '@nextui-org/react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { type AdminAcceptFormSchemaType } from '../../validators/Admin-AcceptTourFormValidator';
import adventureActivities from '../../utils/adventureGenres';

const ActivitiesList = ({
  selectedKeys,
  setSelectedKeys,
  selectedGenres,
}: {
  selectedKeys: Set<string>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedGenres: string;
}) => (
  <div className="flex flex-col gap-2">
    <h1 className="text-[14px]">Select tour genres</h1>
    <p className="text-xs  leading-relaxed text-slate-400">{selectedGenres}</p>
    <div className="w-full h-[200px] overflow-y-scroll border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox
        aria-label="Multiple selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {adventureActivities.sort().map((activity) => (
          <ListboxItem key={activity}>{activity}</ListboxItem>
        ))}
      </Listbox>
    </div>
  </div>
);

const AcceptTourForm = ({
  register,
  errors,
  isSelected,
  setIsVerified,
  selectedKeys,
  setSelectedKeys,
  getValues,
}: {
  register: UseFormRegister<AdminAcceptFormSchemaType>;
  errors: FieldErrors<AdminAcceptFormSchemaType>;
  isSelected: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  selectedKeys: Set<string>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  getValues: UseFormGetValues<AdminAcceptFormSchemaType>;
}) => {
  const selectedGenres = Array.from(selectedKeys).join(', ');
  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Enter any additional information about the tour"
        labelPlacement="outside"
        placeholder="Enter additional information"
        {...register('additionalInformation')}
        isInvalid={!!errors.additionalInformation}
        errorMessage={errors.additionalInformation?.message}
        defaultValue={getValues('additionalInformation') || ''}
      />
      <Textarea
        label="Enter tour cancellation policy"
        labelPlacement="outside"
        placeholder="Enter tour cancellation policy"
        {...register('cancellationPolicy')}
        isInvalid={!!errors.cancellationPolicy}
        errorMessage={errors.cancellationPolicy?.message}
        defaultValue={getValues('cancellationPolicy') || ''}
      />
      <ActivitiesList
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        selectedGenres={selectedGenres}
      />
      <Input
        type="text"
        placeholder="Enter your name"
        label="Enter admin name"
        labelPlacement="outside"
        {...register('adminName')}
        isInvalid={!!errors.adminName}
        errorMessage={errors.adminName?.message}
        defaultValue={getValues('adminName') || ''}
      />
      <Checkbox isSelected={isSelected} onValueChange={setIsVerified}>
        <p className="text-[14px] p-1">
          I agree that all the tour information above are genuine and has been verified
        </p>
      </Checkbox>
    </div>
  );
};

export default AcceptTourForm;
