/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Chip, Divider } from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import useCustomMultiForm from '../../hooks/useCustomMultiForm';
import TourBasicInfoForm from './TourBasicInfoForm';
import TourPriceLocationForm from './TourPriceLocationForm';
import TourAdditionalInfoForm from './TourAdditionalInfoForm';
import DetailedItineraryForm from './TourDetailedItineraryForm';
import {
  contributeTourFormSchema,
  type ContributeTourFormSchemaType,
} from '../../validators/ContributeTourFormValidator';
import { useUploadNewTourMutation } from '../../redux/slices/contributeNewTourSlice';

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

const ContributeMultiStepForm = ({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const methods = useForm<ContributeTourFormSchemaType>({
    resolver: zodResolver(contributeTourFormSchema),
    defaultValues: {
      title: '',
      description: '',
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

  const [uploadNewTour] = useUploadNewTourMutation();

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

  const uploadNewTourHandler = async (
    tourData: Omit<ContributeTourFormSchemaType, 'whatsIncluded' | 'whatsNotIncluded'> & {
      whatsIncluded: string[];
      whatsNotIncluded: string[];
      jsonTourData: string;
    }
  ) => {
    const toastID = toast.loading('Uploading tour...', { className: 'text-xs font-medium' });
    try {
      setStatus(true);
      tourData.jsonTourData = JSON.stringify(tourData);
      const serializedTourData = serialize(tourData, {
        indices: true,
      });

      await uploadNewTour(serializedTourData);
    } catch (error) {
      toast.error('Something went wrong while uploading the tour', {
        className: 'text-xs font-medium',
      });
    } finally {
      toast.dismiss(toastID);
      setStatus(false);
    }
  };

  const handleContributeFormSubmission = () => {
    const formData = getValues();

    const whatsIncluded = formData.whatsIncluded?.split(',').map((item) => item.trim());
    const whatsNotIncluded = formData.whatsNotIncluded?.split(',').map((item) => item.trim());
    const itineraryWithDates = formData.itinerary?.map((item, index) => ({
      ...item,
      day: index + 1,
    }));

    const transformedFormData: Omit<
      ContributeTourFormSchemaType,
      'whatsIncluded' | 'whatsNotIncluded'
    > & { whatsIncluded: string[]; whatsNotIncluded: string[] } = {
      ...formData,
      FAQ: FAQList,
      itinerary: itineraryWithDates,
    };

    console.log(transformedFormData);
    const validate = contributeTourFormSchema.safeParse(transformedFormData);

    console.log(validate);
    if (!validate.success) {
      toast.error('Please fill all the required fields...', { className: 'text-xs font-medium' });
    } else {
      transformedFormData.whatsIncluded = whatsIncluded;
      transformedFormData.whatsNotIncluded = whatsNotIncluded;

      uploadNewTourHandler(transformedFormData);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-3 mb-20 -mt-6 md:mt-0">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {items.map(({ label }, index) => (
          <div className="flex items-center" key={label}>
            <Chip
              variant="shadow"
              color={activeIndex === index ? 'danger' : 'default'}
              className="cursor-pointer text-center md:min-w-[195px] min-w-full"
              onClick={() => jumpToIndex(index)}
              size="lg"
            >
              {label}
            </Chip>
            {index !== items.length - 1 && <Divider key={label} className="hidden md:block" />}
          </div>
        ))}
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col w-full gap-5">
          <activeItem.content register={register} errors={errors} getValues={getValues} />
        </form>
      </FormProvider>
      <div className="flex justify-end min-w-full gap-3">
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
