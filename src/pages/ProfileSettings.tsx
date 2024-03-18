import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Input,
} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RootState } from '../app/store';
import { useUpdateAvatarMutation } from '../redux/slices/profileUpdateSlice';
import { reAuthenticate } from '../redux/slices/userSlice';

const ProfileSettings = ({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}) => {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const { userName = '', email = '', avatar = '', role = '' } = user || {};
  const [userImageURL, setUserImageURL] = useState(avatar);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [updateAvatar] = useUpdateAvatarMutation();
  const dispatch = useDispatch();

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('avatar', userImage!);
    const toastID = toast.loading('Updating profile...', { className: 'text-xs font-medium' });
    try {
      const response = await updateAvatar({ formData });
      if (response.error) {
        throw new Error(response.error?.data?.message);
      }
      toast.success('Profile updated successfully', {
        className: 'text-xs font-medium',
      });
      onOpenChange();
      dispatch(reAuthenticate());
    } catch (error) {
      toast.error((error?.message as string) || 'Failed to update profile', {
        className: 'text-xs font-medium',
      });
    } finally {
      toast.dismiss(toastID);
    }
  };

  const handleUpdateAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event?.target?.files?.[0];
    if (image && image.type.includes('image/') && image.size <= 3 * 1024 * 1024) {
      const imageURL = URL.createObjectURL(image);
      setUserImageURL(imageURL);
      setUserImage(image);
    } else {
      toast.error('Please upload image of size less than 3MB and of type PNG, JPEG, JPG or WEBP', {
        className: 'text-xs font-medium',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col">Profile Settings</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Username"
                value={userName}
                disabled
                labelPlacement="outside"
              />
              <Input type="email" label="Email" value={email} disabled labelPlacement="outside" />
              <div className="flex flex-col gap-3">
                <p className="text-sm">Avatar</p>
                <div className="flex flex-row items-center gap-2">
                  <Avatar
                    showFallback
                    name={userName}
                    src={userImageURL}
                    className="w-20 h-20 text-large"
                  />
                  <label className="inline-block text-xs font-medium max-w-max text-white p-2 rounded-lg bg-neutral cursor-pointer self-center mb-2">
                    Update Avatar
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/png, image/jpeg , image/jpg , image/webp , image/avif"
                      onChange={handleUpdateAvatar}
                    />
                  </label>
                </div>
                <Input
                  type="text"
                  disabled
                  label="Account Type"
                  labelPlacement="outside"
                  value={role === 'local-guide' ? 'LOCAL GUIDE' : role?.toUpperCase()}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={() => updateProfile()} disabled={!userImage}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileSettings;
