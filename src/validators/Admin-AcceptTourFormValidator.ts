import { z } from 'zod';

const adminAcceptTourFormSchema = z.object({
  additionalInformation: z.string().max(300).optional(),
  cancellationPolicy: z.string().min(10).max(300),
  tourCategory: z.array(z.string()).nonempty({
    message: 'Please select at least one tour genre.',
  }),
  adminName: z.string().min(2).max(50),
});

export type AdminAcceptFormSchemaType = z.infer<typeof adminAcceptTourFormSchema>;

export default adminAcceptTourFormSchema;
