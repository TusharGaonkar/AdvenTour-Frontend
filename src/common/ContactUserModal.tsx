/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Textarea,
  Button,
  Chip,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ContactUserFormSchemaType } from '../validators/ContactUserFormValidator';
import contactUserFormSchema from '../validators/ContactUserFormValidator';
import { useContactUserMutation } from '../redux/slices/contactUserSlice';

const ContactUserModal = ({
  isOpen,
  onOpenChange,
  selectedUser,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedUser: { userName: string; email: string };
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactUserFormSchemaType>({
    resolver: zodResolver(contactUserFormSchema),
  });

  const [sendEmailToUser] = useContactUserMutation();

  const handleSendMessage = async (formData: ContactUserFormSchemaType) => {
    const toastID = toast.loading('Sending message...', { className: 'text-xs font-medium' });
    try {
      await sendEmailToUser({ ...formData, to: selectedUser.email }).unwrap();
      toast.success('Message sent successfully', {
        className: 'text-xs font-medium',
      });
      onOpenChange();
    } catch (error) {
      toast.error((error?.data?.message as string) || 'Something went wrong, please try again...', {
        className: 'text-xs font-medium',
      });
    } finally {
      toast.dismiss(toastID);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-2xl">Contact</h1>
              <Divider />
              <div className="flex items-center gap-2 mt-2">
                <p className="text-md text-gray-500">{selectedUser.userName}</p>
                <Chip variant="flat" color="warning" size="sm">
                  {selectedUser.email}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4 items-center">
                <Input
                  type="text"
                  placeholder="Enter the subject"
                  label="Subject"
                  labelPlacement="outside"
                  {...register('subject')}
                  isInvalid={!!errors.subject}
                  errorMessage={errors.subject?.message}
                />
                <Textarea
                  label="Message"
                  labelPlacement="outside"
                  placeholder="Enter the message"
                  {...register('message')}
                  isInvalid={!!errors.message}
                  errorMessage={errors.message?.message}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmit(handleSendMessage)}>
                Send
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ContactUserModal;
