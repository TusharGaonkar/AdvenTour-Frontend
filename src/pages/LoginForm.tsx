/* eslint-disable operator-linebreak */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Input,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import coolBoy from '/3d-casual-life-face-scan.png';
import loginFormSchema, { type LoginFormSchemaType } from '../validators/LoginFormValidator';
import { useLoginUserMutation } from '../redux/slices/authSlice';
import { setCredentials } from '../redux/slices/userSlice';
import { RootState } from '../app/store';
import { useForgotPasswordMutation } from '../redux/slices/accountRecoverySlice';

const ResetEmailModal = ({
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
                className="text-white bg-black"
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

const LoginForm = () => {
  const { isOpen, onOpenChange } = useDisclosure();

  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect');

  const [loginUser, { isLoading, isError, isSuccess, data: response, error }] =
    useLoginUserMutation();

  const { isLoggedIn } = useSelector((state: RootState) => state.userInfo);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = useCallback(
    (formData: LoginFormSchemaType) => {
      loginUser(formData);
    },
    [loginUser]
  );

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

  useEffect(() => {
    if (isError && error) {
      if (
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'message' in error.data
      ) {
        toast.error(error.data.message as string, {
          className: 'text-xs font-medium',
        });
      } else {
        toast.error('Something went wrong, please try again...', {
          className: 'text-xs font-medium',
        });
      }
    } else if (isSuccess && response && response.data && 'user' in response.data) {
      const { user } = response.data;
      toast.success(`Welcome back ${user.userName}!`, {
        className: 'text-xs ont-medium',
      });
      dispatch(setCredentials(response?.data));
    }
  }, [isError, isSuccess, response, error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      if (redirect) {
        navigate(redirect);
      } else {
        navigate('/tours');
      }
    }
  }, [navigate, isLoggedIn, redirect]);

  return (
    <div className="flex flex-row justify-center items-stretch mt-10 bg-white bg-red p-7 md:flex-row">
      <Progress
        isIndeterminate={isLoading}
        size="sm"
        color="danger"
        className="fixed top-0 w-screen"
      />
      <div className="items-start justify-between p-12 md:flex md:flex-col max-w-[485px]  bg-gradient-to-r from-slate-50 to-slate-100 rounded-l-xl shadow-xl">
        <div className="flex flex-col items-start gap-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Welcome back</h1>
          </div>
          <p className="max-w-lg text-lg text-start">
            Sign in to your AdvenTour account, if you are a new user please
            <span>
              <NavLink to="/register" className="self-center ml-1 font-semibold text-orange-400">
                register here
              </NavLink>
            </span>
          </p>
          <div className="flex flex-col w-full  gap-6">
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              {...register('email')}
              defaultValue={import.meta.env?.VITE_USER_EMAIL}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              {...register('password')}
              defaultValue={import.meta.env?.VITE_USER_PASSWORD}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            <div className="flex flex-col">
              <Button
                variant="light"
                className="self-center font-semibold text-blue-500"
                onPress={onOpenChange}
              >
                Forgot Password?
              </Button>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <Button
              isLoading={isLoading}
              className="text-[0.937rem] p-7 bg-[#e77b98]"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
          <div className="w-full">
            <div className="w-full h-[0.3px] bg-slate-500" />

            <h2 className="mt-2 text-xs text-center text-slate-700"> Or login with</h2>
            <div className="flex flex-col mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-3">
              <a
                href="https://adventour.live/api/v-1.0/auth/google"
                className="w-full p-4 border border-gray-500 rounded-xl hover:ring-1 hover:ring-orange-300"
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  <img
                    src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                    className="object-cover w-10"
                    alt="google-logo"
                  />
                  <span>Google</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex md:flex-col md:justify-center md:items-center md:p-4  bg-black w-[30rem] hidden rounded-r-xl shadow-xl">
        <img
          src={coolBoy}
          alt="cool boy"
          className="self-center hidden object-cover w-96 md:block shadow-md"
        />
      </div>

      <ResetEmailModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default LoginForm;
