import { z } from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const contributeTourFormSchema = z
  .object({
    title: z.string().min(15).max(30),
    description: z.string().min(15).max(500),
    mainCoverImage: z
      .any()
      .refine((file) => {
        if (file.length > 0) {
          return file[0]?.size <= MAX_FILE_SIZE;
        }
        return true;
      }, 'Max image size is 3MB , please upload less than 3MB.')
      .refine((file) => {
        if (file.length > 0) {
          return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
        }
        return true;
      }, 'Only .jpg, .jpeg, .png and .webp formats are supported for main cover image.'),
    additionalCoverImages: z
      .array(z.any())
      .length(2)
      .refine((fileList) => {
        if (fileList.length > 0) {
          return fileList.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
        }
        return false;
      }, 'Only .jpg, .jpeg, .png and .webp formats are supported for additional images.')
      .refine((fileList) => {
        if (fileList.length > 0) {
          return fileList.every((file) => file.size <= MAX_FILE_SIZE);
        }
        return false;
      }, 'Max additional image size is 3MB , please upload less than 3MB.'),

    tourLocation: z.object({
      type: z.literal('Point').optional(),
      address: z.string().min(6).max(300),
      coordinates: z
        .array(z.number())
        .length(2)
        .refine((coordinates) => {
          if (coordinates.length === 2) {
            return (
              coordinates[0] >= -180 &&
              coordinates[0] <= 180 &&
              coordinates[1] >= -90 &&
              coordinates[1] <= 90
            );
          }
          return false;
        }, 'Invalid coordinates in activities. Longitude and Latitude must be between -180 and 180 , -90 and 90 respectively.'),
    }),
    priceInRupees: z.number().min(1),
    discountInRupees: z.number().min(0),
    tourDurationInDays: z.number().min(1),
    tourStartTime: z.string().min(1),
    tourMaxCapacity: z.number().min(1),
    maxPeoplePerBooking: z.number().min(1),
    tourDifficulty: z.enum(['Easy', 'Medium', 'Hard']),
    ageGroups: z
      .object({
        minAge: z.number().min(1),
        maxAge: z.number().min(1),
      })
      .refine(({ minAge, maxAge }) => minAge <= maxAge, {
        message: 'Minimum age cannot be greater than maximum age',
      }),
    liveGuideLanguages: z.array(z.string()).min(1),
    tourStartDates: z.array(z.string()).min(1),
    whatsIncluded: z
      .string()
      .trim()
      .regex(/^[ a-zA-Z ]+(?:,[ a-zA-Z]+)*$/, {
        message: 'Only letters, numbers spaces and commas are allowed',
      })
      .min(1),
    whatsNotIncluded: z
      .string()
      .trim()
      .regex(/^[ a-zA-Z ]+(?:,[ a-zA-Z]+)*$/, {
        message: 'Only letters, numbers spaces and commas are allowed',
      })
      .min(1),
    FAQ: z
      .array(
        z.object({
          question: z.string().min(15).max(200),
          answer: z.string().min(15).max(500),
        })
      )
      .min(1),

    itinerary: z.array(
      z.object({
        day: z.number().min(1),
        description: z.string().min(10).max(300),
        activities: z.array(
          z.object({
            activityName: z.string().min(10).max(50),
            place: z.string().min(2).max(50),
            location: z.object({
              type: z.literal('Point').optional(),
              coordinates: z
                .array(z.number())
                .length(2)
                .refine((coordinates) => {
                  if (coordinates.length === 2) {
                    return (
                      coordinates[0] >= -180 &&
                      coordinates[0] <= 180 &&
                      coordinates[1] >= -90 &&
                      coordinates[1] <= 90
                    );
                  }
                  return false;
                }, 'Invalid coordinates in activities. Longitude and Latitude must be between -180 and 180 , -90 and 90 respectively.'),
            }),

            image: z
              .any()
              .refine((file) => {
                if (file.length > 0) {
                  return file[0]?.size <= MAX_FILE_SIZE;
                }
                return false;
              }, 'Max image size is 3MB in activity, please upload less than 3MB.')
              .refine((file) => {
                if (file.length > 0) {
                  return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
                }
                return false;
              }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
          })
        ),
        foodIncluded: z.string().min(2).max(40),
        accommodationIncluded: z.string().min(2).max(40),
      })
    ),
  })
  .refine(({ priceInRupees, discountInRupees }) => priceInRupees >= discountInRupees, {
    message: 'Discount cannot be greater than price',
    path: ['discountInRupees'],
  });

type ContributeTourFormSchemaType = z.infer<typeof contributeTourFormSchema>;

export { contributeTourFormSchema, type ContributeTourFormSchemaType };
export default contributeTourFormSchema;
