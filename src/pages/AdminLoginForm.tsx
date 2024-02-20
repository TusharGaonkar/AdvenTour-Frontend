/* eslint-disable operator-linebreak */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import { Input, Button, Progress } from '@nextui-org/react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import coolAdmin from '/3d-casual-life-man-in-front-of-laptop-and-graph-on-web-browser-in-background(1).png';
import loginFormSchema, { type LoginFormSchemaType } from '../validators/LoginFormValidator';
import { useLoginAdminMutation } from '../redux/slices/authSlice';
import { setCredentials } from '../redux/slices/userSlice';

const AdminLoginForm = () => {
  const [loginAdmin, { isLoading, isError, isSuccess, data: response, error }] =
    useLoginAdminMutation();

  const { isLoggedIn, user } = useSelector<any>((state) => state.userInfo);
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
  const onSubmit: SubmitHandler<LoginFormSchemaType> = (formData: LoginFormSchemaType) => {
    loginAdmin(formData);
  };

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

  return (
    <div className="flex flex-row justify-center bg-white rounded-lg bg-red p-7 md:flex-row">
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
              <NavLink to="#" className="self-center text-blue-500 text-[0.9em] font-semibold">
                Forgot Password?
              </NavLink>
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
    </div>
  );
};

export default AdminLoginForm;
