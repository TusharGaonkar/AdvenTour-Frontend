import { z } from 'zod';

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, 'Password should be at least 6 characters')
      .max(60, 'Password should be lesser than 60 characters'),
    confirmPassword: z
      .string()
      .trim()
      .min(6, 'Password should be at least 6 characters')
      .max(60, 'Password should be lesser than 60 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormSchemaType = z.infer<typeof resetPasswordFormSchema>;

export { type ResetPasswordFormSchemaType };

export default resetPasswordFormSchema;
