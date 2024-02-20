import { z } from 'zod';

const adminRejectFormSchema = z.object({
  tourRemarks: z.string().min(10).max(500),
  adminName: z.string().min(2).max(50),
});

export type AdminRejectFormSchemaType = z.infer<typeof adminRejectFormSchema>;

export default adminRejectFormSchema;
