/* eslint-disable operator-linebreak */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Input,
  Button,
  Progress,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import coolAdmin from '/3d-casual-life-man-in-front-of-laptop-and-graph-on-web-browser-in-background(1).png';
import loginFormSchema, { type LoginFormSchemaType } from '../validators/LoginFormValidator';
import { useLoginAdminMutation } from '../redux/slices/authSlice';
import { setCredentials } from '../redux/slices/userSlice';
import { RootState } from '../app/store';
import { useForgotPasswordMutation } from '../redux/slices/accountRecoverySlice';

const ResetAdminEmailModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [forgotPassword] = useForgotPasswordMutation();

  const validateEmail = (inputValue: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(inputValue);
  };

  const requestPasswordReset = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address', {
        className: 'text-xs font-medium',
      });
      return;
    }

    const toastID = toast.loading('Requesting password reset...', {
      className: 'text-xs font-medium',
    });

    try {
      const response = await forgotPassword(email).unwrap();

      if (response?.error) {
        throw new Error(response?.error?.data);
      }

      toast.dismiss(toastID);
      toast.success('Password reset email sent successfully, check your email', {
        className: 'text-xs font-medium',
      });
    } catch (error) {
      toast.dismiss(toastID);
      toast.error((error as Error)?.data?.message || 'Something went wrong, please try again...', {
        className: 'text-xs font-medium',
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Forgot your password?</ModalHeader>
            <ModalBody>
              <Input
                type="email"
                placeholder="Enter your email"
                label="Registered Email"
                labelPlacement="outside"
                onChange={(e) => setEmail(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  requestPasswordReset();
                }}
                className="bg-black text-white"
              >
                Reset Password
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const AdminLoginForm = () => {
  const [loginAdmin, { isLoading, isError, isSuccess, data: response, error }] =
    useLoginAdminMutation();

  const { isLoggedIn, user } = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const redirectURL = location.state?.redirectURL || '/admin';

  const { isOpen, onOpenChange } = useDisclosure();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = useCallback(
    (formData: LoginFormSchemaType) => {
      loginAdmin(formData);
    },
    [loginAdmin]
  );

  useEffect(() => {
    if (isError && error) {
      if (
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'message' in error.data
      ) {
        toast.error(error.data.message as string, {
          className: 'text-sm',
        });
      } else {
        toast.error('Something went wrong, please try again...');
      }
    } else if (isSuccess && response && response.data && 'user' in response.data) {
      const { user } = response.data;
      toast.success(`Welcome back ${user.userName}!`, {
        className: 'text-sm',
      });
      dispatch(setCredentials(response?.data));
    }
  }, [isError, isSuccess, response, error, dispatch]);

  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') navigate(redirectURL, { replace: true });
  }, [navigate, isLoggedIn, user, redirectURL]);

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit(onSubmit)();
      }
    };

    window.addEventListener('keydown', callback);
    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [handleSubmit, onSubmit]);

  return (
    <div className="flex flex-row justify-center bg-white rounded-lg bg-red p-7 md:flex-row mt-8">
      <Progress
        isIndeterminate={isLoading}
        size="sm"
        color="danger"
        className="fixed top-0 w-screen "
      />
      <div className="items-start justify-between p-12 md:flex md:flex-col max-w-[485px]">
        <div className="flex flex-col items-start gap-12">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Welcome back</h1>
          </div>
          <p className="max-w-lg text-lg text-start">
            Sign in to the admin account to manage users, bookings and more of Adventour.
          </p>

          <div className="flex flex-col w-full gap-6">
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            <div className="flex flex-col">
              <Button
                variant="light"
                className="self-center text-blue-500 font-semibold"
                onPress={onOpenChange}
              >
                Forgot Password?
              </Button>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <Button
              isLoading={isLoading}
              className="text-[0.937rem] p-7 bg-orange-400/60"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </div>
      </div>

      <div className="md:flex md:flex-col md:justify-center md:items-center md:p-4 md:mt-6 bg-secondary w-[30rem] hidden md:rounded-lg">
        <img
          src={coolAdmin}
          alt="cool boy"
          className="self-center hidden object-cover w-96 md:block bg-secondary"
        />
      </div>
      <ResetAdminEmailModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default AdminLoginForm;
