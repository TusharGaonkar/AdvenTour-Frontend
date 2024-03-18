import { z } from 'zod';

const contactUserFormSchema = z.object({
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 2 characters' })
    .max(100, { message: 'Subject must be at most 50 characters' }),
  message: z
    .string()
    .min(20, { message: 'Message must be at least 10 characters' })
    .max(10000, { message: 'Message must be at most 500 characters' }),
});

type ContactUserFormSchemaType = z.infer<typeof contactUserFormSchema>;

export { type ContactUserFormSchemaType };
export default contactUserFormSchema;
