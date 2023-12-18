/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import {
  Chip,
  Input,
  Slider,
  RadioGroup,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Dropdown,
  Radio,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import languages from '../../utils/languagesList';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { ContributeTourFormSchemaType } from '../../validators/ContributeTourFormValidator';

const SelectLanguagesDropDown = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['English']));
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const selectedValue = useMemo(() => Array.from(selectedKeys), [selectedKeys]);

  useEffect(() => {
    setSelectedLanguages(selectedValue);
  }, [selectedValue, selectedLanguages]);

  return (
    <div className="flex flex-col items-start w-full gap-3">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="max-w-md capitalize">
            Select Languages
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          className="max-h-[300px] overflow-y-auto"
        >
          {languages.map(({ name }) => (
            <DropdownItem key={name}>{name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className="flex flex-wrap items-center gap-1">
        {selectedLanguages.map((language) => (
          <Chip key={language} color="primary" variant="flat">
            {language}
          </Chip>
        ))}
      </div>
    </div>
  );
};

const TourPriceLocationForm = ({
  register,
  errors,
  getValues,
}: {
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => {
  const [days, setDays] = useState<Date[]>([]);

  const getMinDate = useCallback(() => {
    const maxDaysToVerify = 1;
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + maxDaysToVerify - 1);
    return minDate;
  }, []);

  const handleDateChange: SelectMultipleEventHandler = (selectedDays) => {
    const minDate = getMinDate();
    const allDays = [...selectedDays];
    allDays.sort((day1, day2) => day1.getTime() - day2.getTime());

    const minDayDifference = 3;
    const minDiffInMilliSeconds = minDayDifference * 24 * 60 * 60 * 1000; // in milliseconds since 1970!!

    const filteredDays = allDays.reduce((acc: Date[], day: Date) => {
      const lastDay = acc[acc.length - 1];

      if (!lastDay && day.getTime() > minDate.getTime()) {
        acc.push(day);
      } else if (lastDay && day.getTime() - lastDay.getTime() >= minDiffInMilliSeconds) {
        acc.push(day);
      }
      return acc;
    }, []); //  filter out days based on the tour day length in the interval

    setDays(filteredDays);
  };

  return (
    <div className="grid items-start grid-cols-2 gap-6">
      <Input
        type="text"
        label="Tour address"
        placeholder="Enter tour location"
        labelPlacement="outside"
        className="col-span-1"
        {...register('address')}
        isInvalid={!!errors.address}
        errorMessage={errors.address?.message}
        defaultValue={getValues('address')}
      />

      <div className="grid grid-cols-2 gap-1">
        <Input
          type="number"
          label="Latitude"
          placeholder="Enter latitude"
          labelPlacement="outside"
        />
        <Input
          type="number"
          label="Longitude"
          placeholder="Enter longitude"
          labelPlacement="outside"
        />
      </div>

      <Input
        type="number"
        label="Tour Price (per individual in INR)"
        placeholder="Enter tour price in INR"
        labelPlacement="outside"
        {...register('priceInRupees', {
          valueAsNumber: true,
        })}
        isInvalid={!!errors.priceInRupees}
        errorMessage={errors.priceInRupees?.message}
        defaultValue={getValues('priceInRupees').toString()}
      />

      <Input
        type="number"
        label="Tour Discount in INR"
        placeholder="Enter tour discount in INR"
        labelPlacement="outside"
        {...register('discountInRupees', { valueAsNumber: true })}
        isInvalid={!!errors.discountInRupees}
        errorMessage={errors.discountInRupees?.message}
        defaultValue={getValues('discountInRupees').toString()}
      />

      <div className="">
        <Input
          type="number"
          label="Tour Duration in days"
          placeholder="Enter tour duration in days"
          labelPlacement="outside"
          className="col-span-1 "
          {...register('tourDurationInDays', {
            valueAsNumber: true,
          })}
          isInvalid={!!errors.tourDurationInDays}
          errorMessage={errors.tourDurationInDays?.message}
          defaultValue={getValues('tourDurationInDays').toString()}
        />
      </div>

      <Input
        type="time"
        label="Tour Start Time"
        labelPlacement="outside"
        placeholder="Enter tour start time"
        {...register('tourStartTime')}
        isInvalid={!!errors.tourStartTime}
        errorMessage={errors.tourStartTime?.message}
      />
      <Input
        type="number"
        label="Tour total capacity"
        placeholder="Enter tour total capacity"
        labelPlacement="outside"
        {...register('tourMaxCapacity', {
          valueAsNumber: true,
        })}
        isInvalid={!!errors.tourMaxCapacity}
        errorMessage={errors.tourMaxCapacity?.message}
        defaultValue={getValues('tourMaxCapacity').toString()}
      />

      <Input
        type="number"
        label="Max people per booking"
        placeholder="Enter max people per booking"
        labelPlacement="outside"
        {...register('maxPeoplePerBooking', { valueAsNumber: true })}
        isInvalid={!!errors.maxPeoplePerBooking}
        errorMessage={errors.maxPeoplePerBooking?.message}
        defaultValue={getValues('maxPeoplePerBooking').toString()}
      />
      <div className="flex flex-col">
        <p className="text-sm">
          Select Tour start dates
          <span className="ml-1 text-xs text-slate-400">(Only valid tour dates will be added)</span>
        </p>
        <DayPicker
          mode="multiple"
          selected={days}
          onSelect={handleDateChange}
          modifiersStyles={{
            selected: { backgroundColor: '#3FC1C9', color: 'white' },
          }}
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm">Select Tour Difficulty</p>
          <RadioGroup defaultValue="Easy">
            <Radio value="Easy">Easy</Radio>
            <Radio value="Medium">Medium</Radio>
            <Radio value="Hard">Hard</Radio>
          </RadioGroup>
        </div>

        <Slider
          label="Age Group Allowed"
          step={1}
          minValue={0}
          maxValue={100}
          defaultValue={[12, 70]}
        />
        <div className="flex flex-col justify-start gap-1">
          <p className="text-sm">Tour Guide Languages</p>
          <SelectLanguagesDropDown />
        </div>
      </div>
    </div>
  );
};

export default TourPriceLocationForm;
