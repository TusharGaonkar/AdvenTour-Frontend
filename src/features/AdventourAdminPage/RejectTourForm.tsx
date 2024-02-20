/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Checkbox, Input, Textarea } from '@nextui-org/react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { AdminRejectFormSchemaType } from '../../validators/Admin-RejectTourFormValidator';

const RejectTourForm = ({
  register,
  errors,
  isSelected,
  setIsVerified,
  getValues,
}: {
  register: UseFormRegister<AdminRejectFormSchemaType>;
  errors: FieldErrors<AdminRejectFormSchemaType>;
  isSelected: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  getValues: UseFormGetValues<AdminRejectFormSchemaType>;
}) => (
  <div className="flex flex-col gap-4">
    <Textarea
      label="Enter tour remarks"
      labelPlacement="outside"
      placeholder="Enter tour rejection remarks"
      {...register('tourRemarks')}
      isInvalid={!!errors.tourRemarks}
      errorMessage={errors.tourRemarks?.message}
      defaultValue={getValues('tourRemarks') || ''}
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
        I confirm that I have thoroughly reviewed the provided information and opting not to proceed
        with the tour.
      </p>
    </Checkbox>
  </div>
);

export default RejectTourForm;
