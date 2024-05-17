/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { serialize } from 'object-to-formdata';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import DropZone from '../../common/DropZone';
import { usePostTourReviewMutation } from '../../redux/slices/tourReviewSlice';
import tourReviewFormSchema, {
  TourReviewFormSchemaType,
} from '../../validators/TourReviewFormValidator';
import type { RootState } from '../../redux/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const ReviewModal = ({ tourID }: { tourID: string }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.userInfo) || {};
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reviewImages, setReviewImages] = useState<File[] | undefined>(undefined);
  const [verified, setVerified] = useState(false);
  const [postReview] = usePostTourReviewMutation();

  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
    handleSubmit,
  } = useForm<TourReviewFormSchemaType>({
    defaultValues: {
      rating: 4,
      travelGroup: 'Solo',
      reviewImages: undefined,
    },
    resolver: zodResolver(tourReviewFormSchema),
    mode: 'onChange',
  });

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      const { pathname } = window.location;
      toast.error('Please login in or sign up to write a review', {
        className: 'text-xs font-medium',
      });

      navigate(`/login?redirect=${pathname}`);
    } else onOpen();
  };

  const handleReviewImages = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setReviewImages((prevImages) => {
        const oldImages = prevImages || [];
        return [...acceptedFiles, ...oldImages].slice(0, 2);
      });
      setValue('reviewImages', acceptedFiles);
    }
  };

  const handlePostReview = async (reviewData: TourReviewFormSchemaType) => {
    const toastID = toast.loading('Posting review...', {
      className: 'text-xs font-medium',
    });

    try {
      const formData = serialize(reviewData);
      const response = await postReview({ formData, tourID });

      if (response.error) {
        throw new Error(
          response.error?.data?.message || 'Something went wrong while posting review'
        );
      }

      onOpenChange(false);
      toast.success('Review posted successfully', {
        className: 'text-xs font-medium',
      });
    } catch (error) {
      toast.error(error.message, {
        className: 'text-xs font-medium',
      });
    } finally {
      toast.dismiss(toastID);
    }
  };

  const handleDeleteImages = () => {
    setReviewImages(undefined);
    setValue('reviewImages', undefined);
  };

  return (
    <>
      <Button
        variant="flat"
        size="md"
        onPress={handleWriteReview}
        className="text-black rounded-full"
      >
        Write a review
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        className="mb-[120px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-2xl">Write a review</ModalHeader>
              <Divider />
              <ModalBody>
                <form className="flex flex-col gap-5 p-2">
                  <div className="flex flex-col gap-3">
                    <p>Review title</p>
                    <Input
                      type="text"
                      placeholder="Enter your review title"
                      errorMessage={errors?.title?.message}
                      isInvalid={!!errors?.title?.message}
                      id="title"
                      {...register('title')}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <p>Rating for your experience</p>
                    <RadioGroup
                      orientation="horizontal"
                      defaultValue="4"
                      onValueChange={(value) => {
                        setValue('rating', Number(value));
                      }}
                      errorMessage={errors?.rating?.message}
                      isInvalid={!!errors?.rating?.message}
                    >
                      <Radio value="1" description="Awful">
                        1
                      </Radio>
                      <Radio value="2" description="Bad">
                        2
                      </Radio>
                      <Radio value="3" description="Okay">
                        3
                      </Radio>
                      <Radio value="4" description="Very Good">
                        4
                      </Radio>
                      <Radio value="5" description="Excellent">
                        5
                      </Radio>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>Who did you travel with?</p>
                    <RadioGroup
                      orientation="horizontal"
                      defaultValue="Solo"
                      onValueChange={(value: string) => {
                        setValue('travelGroup', value as TourReviewFormSchemaType['travelGroup']);
                      }}
                      errorMessage={errors?.travelGroup?.message}
                      isInvalid={!!errors?.travelGroup?.message}
                    >
                      <Radio value="Family">Family</Radio>
                      <Radio value="Friends">Friends</Radio>
                      <Radio value="Solo">Solo</Radio>
                      <Radio value="Couples">Couples</Radio>
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p>Write your review</p>
                    <Textarea
                      labelPlacement="outside"
                      placeholder="Enter your review"
                      {...register('description')}
                      errorMessage={errors?.description?.message}
                      isInvalid={!!errors?.description?.message}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p>
                      Upload images
                      <span className="text-slate-400 text-xs mx-2">
                        (Optional - Max two images)
                      </span>
                    </p>
                    {!!errors?.reviewImages?.message && (
                      <p className="text-red-500 text-xs">{errors?.reviewImages?.message}</p>
                    )}
                  </div>

                  {reviewImages && reviewImages?.length > 0 && (
                    <div className="flex flex-row gap-2 items-end">
                      {reviewImages.map((image, index) => (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="preview"
                          key={index}
                          className="object-cover border-1 rounded-xl h-[80px] w-[80px]"
                        />
                      ))}

                      <Chip
                        variant="flat"
                        color="warning"
                        size="sm"
                        onClick={() => {
                          clearErrors('reviewImages');
                          handleDeleteImages();
                        }}
                        className="cursor-pointer"
                      >
                        Delete all
                      </Chip>
                    </div>
                  )}
                  <DropZone
                    configuration={{
                      onDrop: handleReviewImages,
                      maxFiles: 2,
                      accept: {
                        'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
                      },
                    }}
                  />
                  <Checkbox onChange={() => setVerified((prev) => !prev)} isSelected={verified}>
                    <p className="text-xs text-slate-600">
                      I agree that my review is based on my own experience and I have no personal or
                      financial relationship with the guide
                    </p>
                  </Checkbox>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit(handlePostReview)}
                  isDisabled={!verified}
                  className="bg-accent"
                >
                  Post Review
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
