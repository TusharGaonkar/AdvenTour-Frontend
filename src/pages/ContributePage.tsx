import { Button, Chip, Divider } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import NavBar from '../common/Navbar';
import useCustomMultiForm from '../hooks/useCustomMultiForm';
import TourBasicInfoForm from '../features/ContributeTour/TourBasicInfoForm';
import TourPriceLocationForm from '../features/ContributeTour/TourPriceLocationForm';
import TourAdditionalInfoForm from '../features/ContributeTour/TourAdditionalInfoForm';
import DetailedItineraryForm from '../features/ContributeTour/TourDetailedItineraryForm';
import {
  contributeTourFormSchema,
  type ContributeTourFormSchemaType,
} from '../validators/ContributeTourFormValidator';
import { useEffect, useState } from 'react';

const ContributeMultiStepForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<ContributeTourFormSchemaType>({
    resolver: zodResolver(contributeTourFormSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      priceInRupees: 2000,
      discountInRupees: 0,
      maxPeoplePerBooking: 2,
      tourDurationInDays: 1,
      tourMaxCapacity: 30,
      whatsIncluded: 'Accommodation, Food, Transportation, Activities, Guide',
      whatsNotIncluded: 'Travel Insurance, Tour Guide Certification, Personal Expenses',
    },
    mode: 'onChange',
  });

  const items = [
    {
      label: 'Tour Basic Info',
      content: TourBasicInfoForm,
    },
    {
      label: 'Tour Price & Location',
      content: TourPriceLocationForm,
    },
    {
      label: 'Tour Additional Info',
      content: TourAdditionalInfoForm,
    },
    {
      label: 'Tour Detailed Itinerary',
      content: DetailedItineraryForm,
    },
  ];

  const { activeIndex, activeItem, isStart, isEnd, handleNext, handlePrev, jumpToIndex } =
    useCustomMultiForm(items);

  return (
    <div className="flex flex-col items-center justify-center w-full min-w-full gap-6 mx-auto">
      <div className="flex items-center w-full justify-evenly">
        {items.map(({ label }, index) => (
          <div className="flex items-center" key={label}>
            <Chip
              variant="shadow"
              color={activeIndex === index ? 'danger' : 'default'}
              className="cursor-pointer"
              onClick={() => jumpToIndex(index)}
              size="lg"
            >
              {label}
            </Chip>
            {index !== items.length - 1 && <Divider key={label} />}
          </div>
        ))}
      </div>
      <form className="flex flex-col w-full gap-5">
        <activeItem.content register={register} errors={errors} getValues={getValues} />
      </form>
      <div className="flex justify-end min-w-full gap-3">
        <Button onClick={handlePrev} disabled={isStart}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={isEnd}>
          Next
        </Button>
      </div>
    </div>
  );
};

const ContributePage = () => {
  return (
    <div className="flex flex-col w-full max-w-5xl gap-6 mx-auto">
      <NavBar />
      <h1 className="text-xl font-bold">Add a new tour</h1>
      <ContributeMultiStepForm />
    </div>
  );
};

export default ContributePage;
