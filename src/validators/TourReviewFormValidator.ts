import { z } from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const tourReviewFormSchema = z.object({
  title: z.string().min(10).max(50),
  description: z.string().min(10).max(3000),
  rating: z.number().min(1).max(5),
  travelGroup: z.enum(['Family', 'Friends', 'Couple', 'Solo']),
  reviewImages: z
    .any()
    .optional()
    .refine((file) => {
      if (file?.length > 0) {
        return file?.[0]?.size <= MAX_FILE_SIZE;
      }
      return true;
    }, 'Max image size is 3MB , please upload less than 3MB.')
    .refine((file) => {
      if (file?.length > 0) {
        return ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type);
      }
      return true;
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported for main cover image.'),
});

export type TourReviewFormSchemaType = z.infer<typeof tourReviewFormSchema>;

export default tourReviewFormSchema;
