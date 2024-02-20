/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { ContributeTourFormSchemaType } from '../../validators/ContributeTourFormValidator';

const Activity = ({
  day,
  register,
  getValues,
  errors,
}: {
  day: number;
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => {
  const { control, watch } = useFormContext();
  const { remove } = useFieldArray({ control, name: `itinerary.${day}.activities` });

  const [activityCount, setActivityCount] = useState<number>(
    getValues(`itinerary.${day}.activities`)?.length || 1
  );

  const handleAddActivity = () => {
    setActivityCount((prevActivityCount) => prevActivityCount + 1);
  };

  const handleDeleteActivity = () => {
    if (activityCount > 1) {
      setActivityCount((prevActivityCount) => prevActivityCount - 1);
      // removes the registered activity index from the hook form as well!
      remove(activityCount - 1);
    }
  };

  const activities = watch(`itinerary.${day}.activities`);

  return (
    <div className="flex flex-col gap-4 items-start justify-center w-full">
      {Array.from({ length: activityCount })
        .fill(0)
        .map((_, index) => (
          <div className="flex flex-col items-start gap-4 w-full" key={index}>
            <h1 className="text-sm font-semibold text-slate-600">{`Activity ${index + 1}`}</h1>
            <div className="flex items-start justify-center gap-3 w-full">
              <Input
                type="text"
                label="Activity name"
                labelPlacement="outside"
                placeholder="Enter activity name"
                {...register(`itinerary.${day}.activities.${index}.activityName`)}
                errorMessage={errors?.itinerary?.[day]?.activities?.[index]?.activityName?.message}
                isInvalid={!!errors?.itinerary?.[day - 1]?.activities?.[index]?.activityName}
                defaultValue={getValues(`itinerary.${day}.activities.${index}.activityName`) || ''}
              />
              <Input
                type="text"
                label="Location name"
                labelPlacement="outside"
                placeholder="Enter location name"
                {...register(`itinerary.${day}.activities.${index}.place`)}
                errorMessage={errors?.itinerary?.[day]?.activities?.[index]?.place?.message}
                isInvalid={!!errors?.itinerary?.[day]?.activities?.[index]?.place}
                defaultValue={getValues(`itinerary.${day}.activities.${index}.place`) || ''}
              />
              <Input
                type="number"
                label="Enter latitude"
                labelPlacement="outside"
                placeholder="Enter latitude"
                {...register(`itinerary.${day}.activities.${index}.location.coordinates.0`, {
                  valueAsNumber: true,
                })}
                errorMessage={
                  errors?.itinerary?.[day]?.activities?.[index]?.location?.coordinates?.[0]?.message
                }
                isInvalid={
                  !!errors?.itinerary?.[day]?.activities?.[index]?.location?.coordinates?.[0]
                }
                defaultValue={
                  getValues(`itinerary.${day}.activities.${index}.location.coordinates.0`) || 0
                }
              />
              <Input
                type="number"
                label="Enter longitude"
                labelPlacement="outside"
                placeholder="Enter Longitude"
                {...register(`itinerary.${day}.activities.${index}.location.coordinates.1`, {
                  valueAsNumber: true,
                })}
                errorMessage={
                  errors?.itinerary?.[day]?.activities?.[index]?.location?.coordinates?.[1]?.message
                }
                isInvalid={
                  !!errors?.itinerary?.[day]?.activities?.[index]?.location?.coordinates?.[1]
                }
                defaultValue={
                  getValues(`itinerary.${day}.activities.${index}.location.coordinates.1`) || 0
                }
              />
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex flex-col gap-2">
                <label
                  className="inline-block text-xs font-medium max-w-max text-white p-2 rounded-lg bg-neutral cursor-pointer"
                  htmlFor={`uploadImage-${day}-${index}`}
                >
                  Upload Image
                  <input
                    type="file"
                    id={`uploadImage-${day}-${index}`}
                    style={{ display: 'none' }}
                    {...register(`itinerary.${day}.activities.${index}.image`)}
                    accept="image/png, image/jpeg , image/jpg , image/webp"
                  />
                </label>

                <p className="text-xs text-slate-400">
                  PNG, JPG, JPEG, WebP (Max image size is 3MB)
                </p>
                <p className="text-xs text-slate-700">
                  {activities?.[index]?.image?.length > 0
                    ? `Selected image : ${activities[index]?.image[0].name}`
                    : 'No image selected'}
                </p>
                {errors?.itinerary?.[day]?.activities?.[index]?.image && (
                  <p className="text-xs text-red-500">
                    {errors?.itinerary?.[day]?.activities?.[index]?.image?.message as string}
                  </p>
                )}
              </div>
            </div>
            {index === activityCount - 1 && (
              <div className="flex gap-2 items-center">
                <Button
                  variant="flat"
                  className="bg-primary text-white"
                  onClick={handleAddActivity}
                >
                  Add activity
                </Button>
                {index !== 0 && (
                  <Button color="danger" variant="flat" onClick={handleDeleteActivity}>
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

const DayPlan = ({
  index,
  register,
  getValues,
  errors,
}: {
  index: number;
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => (
  <div className="flex flex-col items-start justify-center w-full gap-3">
    <h1 className="text-md font-semibold text-slate-800">{`Day ${index + 1}`}</h1>
    <Textarea
      label="Description"
      labelPlacement="outside"
      placeholder="Enter tour day plan"
      {...register(`itinerary.${index}.description`)}
      errorMessage={errors?.itinerary?.[index]?.description?.message}
      isInvalid={!!errors?.itinerary?.[index]?.description}
      defaultValue={getValues(`itinerary.${index}.description`) || ''}
    />
    <Activity day={index} register={register} getValues={getValues} errors={errors} />
    <div className="flex items-start gap-3 w-full">
      <Input
        type="text"
        label={`Accommodation Included for Day ${index + 1} ?`}
        labelPlacement="outside"
        placeholder="Type accommodation place name if included, else type No"
        {...register(`itinerary.${index}.accommodationIncluded`)}
        errorMessage={errors?.itinerary?.[index]?.accommodationIncluded?.message}
        isInvalid={!!errors?.itinerary?.[index]?.accommodationIncluded}
        defaultValue={getValues(`itinerary.${index}.accommodationIncluded`)}
      />
      <Input
        type="text"
        label={`Food Included for Day ${index + 1} ?`}
        labelPlacement="outside"
        placeholder="Type if any of Breakfast, Lunch, Dinner included, else type No"
        {...register(`itinerary.${index}.foodIncluded`)}
        errorMessage={errors?.itinerary?.[index]?.foodIncluded?.message}
        isInvalid={!!errors?.itinerary?.[index]?.foodIncluded}
        defaultValue={getValues(`itinerary.${index}.foodIncluded`) || ''}
      />
    </div>
  </div>
);

const DetailedItineraryForm = ({
  register,
  errors,
  getValues,
}: {
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => {
  const totalDays = getValues('tourDurationInDays') || 1;
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: totalDays })
        .fill(0)
        .map((_, index) => (
          <DayPlan
            index={index}
            key={index}
            register={register}
            getValues={getValues}
            errors={errors}
          />
        ))}
    </div>
  );
};

export default DetailedItineraryForm;
