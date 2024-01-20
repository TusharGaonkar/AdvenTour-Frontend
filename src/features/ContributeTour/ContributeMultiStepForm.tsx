/* eslint-disable react/jsx-props-no-spreading */
import { Button, Chip, Divider } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useCustomMultiForm from '../../hooks/useCustomMultiForm';
import TourBasicInfoForm from './TourBasicInfoForm';
import TourPriceLocationForm from './TourPriceLocationForm';
import TourAdditionalInfoForm from './TourAdditionalInfoForm';
import DetailedItineraryForm from './TourDetailedItineraryForm';
import {
  contributeTourFormSchema,
  type ContributeTourFormSchemaType,
} from '../../validators/ContributeTourFormValidator';

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

const ContributeMultiStepForm = () => {
  const methods = useForm<ContributeTourFormSchemaType>({
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
      tourDifficulty: 'Easy',
      ageGroups: {
        minAge: 12,
        maxAge: 60,
      },
    },
    mode: 'onChange',
  });

  const {
    register,
    getValues,
    formState: { errors },
  } = methods;

  const { activeIndex, activeItem, isStart, isEnd, handleNext, handlePrev, jumpToIndex } =
    useCustomMultiForm(items);

  const FAQList = useSelector(
    (state: { FAQList: { question: string; answer: string }[] }) => state.FAQList
  );

  const handleContributeFormSubmission = () => {
    const formData = getValues();

    const whatsIncluded = formData.whatsIncluded?.split(',').map((item) => item.trim());
    const whatsNotIncluded = formData.whatsNotIncluded?.split(',').map((item) => item.trim());
    const itineraryWithDates = formData.itinerary?.map((item, index) => ({
      ...item,
      day: index + 1,
    }));

    const transformedFormData: Record<string, unknown> = {
      ...formData,
      FAQ: FAQList,
      itinerary: itineraryWithDates,
    };
    const validate = contributeTourFormSchema.safeParse(transformedFormData);

    if (!validate.success) {
      validate.error?.errors?.forEach((error) => {
        toast.error(error.message, {
          className: 'text-xs font-medium',
        });
      });
    } else {
      transformedFormData.whatsIncluded = whatsIncluded;
      transformedFormData.whatsNotIncluded = whatsNotIncluded;

      toast.success('Your form has been submitted successfully', {
        className: 'text-xs font-medium',
      });
    }
  };

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

      <FormProvider {...methods}>
        <form className="flex flex-col w-full gap-5 p-4">
          <activeItem.content register={register} errors={errors} getValues={getValues} />
        </form>
      </FormProvider>
      <div className="flex justify-end min-w-full gap-3 mb-8">
        <Button onClick={handlePrev} disabled={isStart}>
          Previous
        </Button>
        <Button
          onClick={!isEnd ? handleNext : handleContributeFormSubmission}
          className={isEnd ? 'bg-accent text-white' : ''}
        >
          {isEnd ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default ContributeMultiStepForm;
