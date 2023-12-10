/* eslint-disable react/jsx-props-no-spreading */
import { Input, Textarea } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

const DropZone = ({ handleChange }: { handleChange: DropzoneOptions['onDrop'] }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleChange });

  return (
    <div className="flex items-center justify-center w-full" {...getRootProps()}>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input {...getInputProps()} />
      </label>
    </div>
  );
};

const TourImagesForm = () => {
  const [mainCoverImage, setMainCoverImage] = useState<undefined | string>(undefined);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const handleMainCoverImage: DropzoneOptions['onDrop'] = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setMainCoverImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const handleAdditonalImages: DropzoneOptions['onDrop'] = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of acceptedFiles) {
        setAdditionalImages((prev) => [...prev, URL.createObjectURL(file)]);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="font-semibold text-md"> Add tour title and description</h1>

      <Input
        type="text"
        labelPlacement="outside"
        label="Tour Title"
        placeholder="Enter tour title"
      />
      <Textarea
        label="Tour Description"
        labelPlacement="outside"
        placeholder="Enter tour description"
      />
      <h1 className="font-semibold text-md">Select Main Cover Image</h1>
      <DropZone handleChange={handleMainCoverImage} />
      {mainCoverImage && (
        <div className="flex flex-col gap-2">
          <img src={mainCoverImage} alt="main cover" width={70} className="rounded-xl" />
          <p className="text-xs text-slate-400">Selected Image</p>
        </div>
      )}

      <h1 className="font-semibold text-md">Add three more additional images of the tour</h1>
      <div className="flex flex-col gap-2">
        {additionalImages.length > 0 && (
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-400">Selected Images:</p>
            <div className="flex flex-row gap-2">
              {additionalImages.map((image) => (
                <img src={image} alt="main cover" width={50} className="rounded-xl" />
              ))}
            </div>
          </div>
        )}
        <DropZone handleChange={handleAdditonalImages} />
      </div>
    </div>
  );
};

export default TourImagesForm;
