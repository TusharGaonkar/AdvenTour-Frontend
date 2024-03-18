/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Input } from '@nextui-org/react';
import adventourLogo from '/advenTourLogo.png';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import resetPasswordFormSchema, {
  ResetPasswordFormSchemaType,
} from '../validators/ResetPasswordValidator';
import { useResetPasswordMutation } from '../redux/slices/accountRecoverySlice';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [resetPassword] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const token = searchParams.get('token');

  if (!token) {
    toast.error('Invalid link', { className: 'text-xs font-semibold' });
    return;
  }

  const onSubmit = async (formData: ResetPasswordFormSchemaType) => {
    if (!token) {
      toast.error('Invalid link', { className: 'text-xs font-semibold' });
    }

    const toastID = toast.loading('Updating password...', { className: 'text-xs font-semibold' });
    try {
      const { password, confirmPassword } = formData;

      await resetPassword({
        token,
        password,
        confirmPassword,
      }).unwrap();

      toast.dismiss(toastID);
      toast.success('Password updated successfully', {
        className: 'text-xs font-semibold',
      });

      window.location.href = '/login';
    } catch (error) {
      toast.dismiss(toastID);
      toast.error((error?.data?.message as string) || 'Something went wrong, please try again...', {
        className: 'text-xs font-semibold',
      });
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-secondary/60 p-4">
      <form
        className="p-16 shadow-lg rounded-lg flex flex-shrink w-[570px] flex-col gap-6 items-center justify-center bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src={adventourLogo} alt="adventour logo" className="w-16 h-16" />
        <h1 className="self-start font-semibold text-2xl">Reset your password</h1>
        <Input
          type="text"
          label="Enter new password"
          placeholder="Enter password"
          labelPlacement="outside"
          {...register('password')}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
        <Input
          type="password"
          label="Confirm new password"
          placeholder="Enter new password"
          labelPlacement="outside"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword}
        />
        <Button type="submit" className=" bg-black text-white  self-end">
          Update password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
