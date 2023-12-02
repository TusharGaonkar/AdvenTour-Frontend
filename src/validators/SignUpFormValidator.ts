import { z } from 'zod';

const signUpFormSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .max(50, 'Username should be lesser than 50 characters'),
    email: z.string().trim().email().min(1, 'Email is required'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(60, 'Password should be lesser than 60 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm Password is required')
      .max(60, 'Confirm Password should be lesser than 60 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export { signUpFormSchema, type SignUpFormSchemaType };
export default signUpFormSchema;
