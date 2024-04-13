/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-trailing-spaces */
// eslint-disable-next-line import/no-absolute-path
import signUpFormSchema, { type SignUpFormSchemaType } from '../validators/SignUpFormValidator';
import { Input, Button, Progress } from '@nextui-org/react';
import coolGirl from '/3d-casual-life-happy-woman-makes-heart-shape-by-her-hand.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from '../redux/slices/authSlice';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [registerUser, { isLoading, isError, isSuccess, data: response, error }] =
    useRegisterUserMutation();

  const onSubmit: SubmitHandler<SignUpFormSchemaType> = useCallback(
    (formData: SignUpFormSchemaType) => {
      registerUser(formData);
    },
    [registerUser]
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
    if (isError) {
      const errMessage =
        error?.data?.message ||
        'Something went wrong while registering the user please try again...';

      toast.error(errMessage, {
        className: 'text-xs font-medium',
        duration: 1000,
      });
    } else if (isSuccess) {
      toast.success('Registration successful please login to continue...', {
        className: 'text-xs font-medium',
        duration: 5000,
      });
      navigate(-1);
    }
  }, [isError, isSuccess, response, error, navigate]);

  return (
    <div className="flex flex-row justify-center bg-white rounded-lg bg-red p-7 md:flex-row">
      <Progress
        isIndeterminate={isLoading}
        size="sm"
        color="danger"
        className="fixed top-0 w-screen"
      />
      <div className="items-start justify-between p-12 md:flex md:flex-col">
        <div className="flex flex-col items-start gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Register to AdvenTour</h1>
          </div>
          <p className="text-xl">Sign Up to book your next adventure!</p>

          <div className="flex flex-col w-full gap-6">
            <Input
              isClearable
              type="text"
              label="Full Name"
              variant="bordered"
              placeholder="Enter your full name"
              {...register('userName')}
              isInvalid={!!errors.userName}
              errorMessage={errors.userName?.message}
            />
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
            <Input
              type="password"
              label="Confirm Password"
              variant="bordered"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>

          <div className="flex flex-col w-full">
            <Button
              isLoading={isLoading}
              className="text-[0.937rem] p-7 bg-teal-300 "
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </div>
          <div className="w-full">
            <div className="w-full h-[0.3px] bg-slate-500" />

            <h2 className="mt-2 text-xs text-center text-blue-100 text-slate-500">
              Or sign up with
            </h2>
            <div className="flex flex-col mt-6 space-y-3 md:flex-row md:space-y-0 md:space-x-3">
              <a
                href="https://adventour.live/api/v-1.0/auth/google"
                className="w-full p-4 border border-gray-500 rounded-xl hover:ring-2 hover:ring-white"
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

      <div className="md:flex md:flex-col md:justify-center md:items-center md:p-4 md:mt-6 bg-white w-[30rem] hidden md:rounded-lg">
        <img
          src={coolGirl}
          alt="cool girl"
          className="self-center hidden object-cover w-96 md:block"
        />
      </div>
    </div>
  );
};

export default SignupForm;
