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
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import {
  Controller,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFormContext,
} from 'react-hook-form';
import { ContributeTourFormSchemaType } from '../../validators/ContributeTourFormValidator';
import languages from '../../utils/languagesList';

const SelectLanguagesDropDown = ({
  selectedLanguages,
  setSelectedLanguages,
  setValue,
}: {
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>(selectedLanguages));

  const selectedValue = useMemo(() => Array.from(selectedKeys), [selectedKeys]);

  useEffect(() => {
    setSelectedLanguages(selectedValue);
    setValue('liveGuideLanguages', [...selectedValue]);
  }, [selectedValue, selectedLanguages, setSelectedLanguages, setValue]);

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
  const { setValue, control } = useFormContext();

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    getValues('liveGuideLanguages') ? [...getValues('liveGuideLanguages')] : ['English']
  );

  const [days, setDays] = useState<Date[]>(
    getValues('tourStartDates') ? getValues('tourStartDates').map((date) => new Date(date)) : []
  );

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

    const tourDuration = getValues('tourDurationInDays');

    if (tourDuration === 0) return;

    const minDayDifference = tourDuration;
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

    // Set the tourStartDates array in the hook form as well in the format 'YYYY-MM-DD'
    setValue(
      'tourStartDates',
      filteredDays.map((date: Date) => format(date, 'yyyy-MM-dd'))
    );
  };

  return (
    <div className="grid items-start grid-cols-2 gap-6">
      <Input
        type="text"
        label="Tour address"
        placeholder="Enter tour location"
        labelPlacement="outside"
        className="col-span-1"
        {...register('tourLocation.address')}
        isInvalid={!!errors?.tourLocation?.address}
        errorMessage={errors?.tourLocation?.address?.message}
        defaultValue={getValues('tourLocation.address') || ''}
      />

      <div className="grid grid-cols-2 gap-1">
        <Input
          type="number"
          label="Latitude"
          placeholder="Enter latitude"
          defaultValue={getValues('tourLocation.coordinates')?.[0] || '0'}
          labelPlacement="outside"
          {...register('tourLocation.coordinates.0', { valueAsNumber: true })}
        />
        <Input
          type="number"
          label="Longitude"
          placeholder="Enter longitude"
          labelPlacement="outside"
          defaultValue={getValues('tourLocation.coordinates')?.[1] || '0'}
          {...register('tourLocation.coordinates.1', { valueAsNumber: true })}
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
            onChange: () => setDays([]),
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
        defaultValue={getValues('tourStartTime') || '07:00'}
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
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                defaultValue={value}
                onValueChange={(selectedValue) => onChange(selectedValue)}
              >
                <Radio value="Easy">Easy</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="Hard">Hard</Radio>
              </RadioGroup>
            )}
            name="tourDifficulty"
          />
        </div>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Slider
              label="Age Group Allowed"
              step={1}
              minValue={0}
              maxValue={100}
              defaultValue={[value.minAge, value.maxAge]}
              onChange={(updatedRange: number | number[]) => {
                if (Array.isArray(updatedRange)) {
                  onChange({ minAge: updatedRange[0], maxAge: updatedRange[1] });
                }
              }}
            />
          )}
          name="ageGroups"
        />

        <div className="flex flex-col justify-start gap-1">
          <p className="text-sm">Tour Guide Languages</p>
          <SelectLanguagesDropDown
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            setValue={setValue}
          />
        </div>
      </div>
    </div>
  );
};

export default TourPriceLocationForm;
