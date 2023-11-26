import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters')
    .max(60, 'Password should be lesser than 60 characters'),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export { loginFormSchema, type LoginFormSchemaType };
export default loginFormSchema;
