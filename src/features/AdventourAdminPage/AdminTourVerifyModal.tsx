/* eslint-disable @typescript-eslint/indent */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import adminAcceptTourFormSchema, {
  type AdminAcceptFormSchemaType,
} from '../../validators/Admin-AcceptTourFormValidator';

import AcceptTourForm from './AcceptTourForm';
import RejectTourForm from './RejectTourForm';
import adminRejectFormSchema, {
  AdminRejectFormSchemaType,
} from '../../validators/Admin-RejectTourFormValidator';
import {
  useAcceptTourMutation,
  useRejectTourMutation,
} from '../../redux/slices/admin-TourVerificationSlice';

export const AcceptTourModal = ({ tourID }: { tourID: string | undefined }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<AdminAcceptFormSchemaType>({
    resolver: zodResolver(adminAcceptTourFormSchema),
    mode: 'all',
  });

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVerified, setIsVerified] = useState(false);
  const [uploadVerifiedTour, { isError, isSuccess }] = useAcceptTourMutation();

  const handleSubmit = async () => {
    const formData: AdminAcceptFormSchemaType &
      Partial<{
        isVerified: boolean;
        isAccepted: boolean;
        tourID: string | undefined;
      }> = {
      ...getValues(),
      tourCategory: Array.from(selectedKeys) as [string, ...string[]],
    };

    const validate = adminAcceptTourFormSchema.safeParse(formData);

    if (!validate.success) {
      toast.error('Please fill all the fields correctly', { className: 'text-xs font-medium' });
    } else {
      formData.isVerified = true;
      formData.isAccepted = true;
      formData.tourID = tourID;

      onOpenChange();

      await uploadVerifiedTour(formData);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong, please try again...', {
        className: 'text-xs font-medium',
      });
    } else if (isSuccess) {
      toast.success('Tour accepted successfully', { className: 'text-xs font-medium' });
    }
  }, [isError, isSuccess]);

  return (
    <>
      <Button onPress={onOpen} className="rounded-full bg-blue-500 text-white">
        Accept submission
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Accept submission</ModalHeader>
              <ModalBody>
                <AcceptTourForm
                  register={register}
                  errors={errors}
                  isSelected={isVerified}
                  setIsVerified={setIsVerified}
                  selectedKeys={selectedKeys}
                  setSelectedKeys={setSelectedKeys}
                  getValues={getValues}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="success"
                  variant="flat"
                  disabled={!isVerified}
                  className="disabled:cursor-not-allowed disabled:bg-zinc-200"
                  onClick={handleSubmit}
                >
                  Publish tour
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const RejectTourModal = ({ tourID }: { tourID: string | undefined }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<AdminRejectFormSchemaType>({
    resolver: zodResolver(adminRejectFormSchema),
    mode: 'all',
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVerified, setIsVerified] = useState(false);
  const [uploadRejectedTour, { isError, isSuccess }] = useRejectTourMutation();

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while rejecting tour...', {
        className: 'text-xs font-medium',
      });
    } else if (isSuccess) {
      toast.success('Tour rejected successfully', { className: 'text-xs font-medium' });
    }
  }, [isError, isSuccess]);

  const handleSubmit = () => {
    const formData: AdminRejectFormSchemaType &
      Partial<{ isVerified: boolean; isRejected: boolean; tourID: string }> = getValues();
    const validate = adminRejectFormSchema.safeParse(formData);
    if (!validate.success) {
      toast.error('Please fill all the fields correctly', { className: 'text-xs font-medium' });
    } else {
      // valid data submit form
      formData.isVerified = true;
      formData.isRejected = true;
      formData.tourID = tourID;

      onOpenChange();
      uploadRejectedTour(formData);
    }
  };

  return (
    <>
      <Button className="rounded-full bg-red-500 text-white" onPress={onOpen} variant="flat">
        Reject tour
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Reject tour</ModalHeader>
              <ModalBody>
                <RejectTourForm
                  register={register}
                  errors={errors}
                  isSelected={isVerified}
                  setIsVerified={setIsVerified}
                  getValues={getValues}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white disabled:cursor-not-allowed disabled:bg-red-300"
                  onClick={() => handleSubmit()}
                  disabled={!isVerified}
                >
                  Reject & Delete tour
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
