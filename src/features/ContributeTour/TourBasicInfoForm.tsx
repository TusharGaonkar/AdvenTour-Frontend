/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import { Input, Textarea } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
  useFormContext,
  useFieldArray,
} from 'react-hook-form';
import { type ContributeTourFormSchemaType } from '../../validators/ContributeTourFormValidator';
import DropZone from '../../common/DropZone';

const TourBasicInfoForm = ({
  register,
  errors,
  getValues,
}: {
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => {
  const { control } = useFormContext();

  const { replace: replaceMainCoverImage } = useFieldArray({
    control,
    name: 'mainCoverImage',
  });

  const { replace: replaceAdditionalCoverImages } = useFieldArray({
    control,
    name: 'additionalCoverImages',
  });

  const [mainCoverImage, setMainCoverImage] = useState<undefined | string>(
    getValues('mainCoverImage')?.[0]
      ? URL.createObjectURL(getValues('mainCoverImage')[0])
      : undefined
  );

  const [additionalCoverImages, setAdditionalImages] = useState<string[]>(
    getValues('additionalCoverImages')?.map((image: File) => URL.createObjectURL(image)) || []
  );

  const handleMainCoverImage: DropzoneOptions['onDrop'] = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const imageURL = URL.createObjectURL(acceptedFiles[0]);
        setMainCoverImage(imageURL);
        replaceMainCoverImage(acceptedFiles[0]);
      }
    },
    [replaceMainCoverImage]
  );

  const handleAdditionalImages: DropzoneOptions['onDrop'] = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const imageURLs = acceptedFiles.map((image) => URL.createObjectURL(image));
        // select only first two images
        const newAdditionalImages = [...imageURLs, ...additionalCoverImages].slice(0, 2);
        setAdditionalImages(newAdditionalImages);

        const prevImageFiles = getValues('additionalCoverImages') || [];
        replaceAdditionalCoverImages([...acceptedFiles, ...prevImageFiles].slice(0, 2));
      }
    },
    [setAdditionalImages, replaceAdditionalCoverImages, additionalCoverImages, getValues]
  );

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="font-semibold text-md"> Add tour title and description</h1>

      <Input
        type="text"
        labelPlacement="outside"
        label="Tour Title"
        placeholder="Enter tour title"
        {...register('title')}
        isInvalid={!!errors.title}
        errorMessage={errors.title?.message}
        defaultValue={getValues('title') || ''}
      />
      <Textarea
        label="Tour Description"
        labelPlacement="outside"
        placeholder="Enter tour description"
        disableAnimation
        {...register('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        defaultValue={getValues('description') || ''}
      />
      <h1 className="font-semibold text-md">Select Main Cover Image</h1>
      {mainCoverImage && (
        <div className="flex flex-col gap-2">
          <img
            src={mainCoverImage}
            alt="main cover"
            width={70}
            className="object-cover h-20 rounded-xl"
          />
          <p className="text-xs text-slate-400">(Selected Image)</p>
        </div>
      )}
      {errors.mainCoverImage && (
        <p className="text-xs text-red-500">{errors.mainCoverImage.message as string}</p>
      )}
      <DropZone
        configuration={{
          onDrop: handleMainCoverImage,
          maxFiles: 1,
          accept: { 'image/png': ['.png', '.jpg', '.jpeg', '.webp'] },
        }}
      />

      <h1 className="font-semibold text-md">Add two more additional images of the tour</h1>
      <div className="flex flex-col gap-2">
        {additionalCoverImages.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              {additionalCoverImages.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="main cover"
                  width={70}
                  className="object-cover h-20 rounded-xl"
                />
              ))}

              <p className="self-end text-xs text-slate-400">(Selected images)</p>
            </div>
          </div>
        )}
        {errors.additionalCoverImages && (
          <p className="text-xs text-red-500">{errors.additionalCoverImages.message as string}</p>
        )}
        <DropZone
          configuration={{
            onDrop: handleAdditionalImages,
            maxFiles: 2,
            accept: { 'image/png': ['.png', '.jpg', '.jpeg', '.webp'] },
          }}
        />
      </div>
    </div>
  );
};

export default TourBasicInfoForm;
