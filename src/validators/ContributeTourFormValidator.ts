import { z } from 'zod';

const contributeTourFormSchema = z
  .object({
    title: z.string().min(15).max(30),
    description: z.string().min(15).max(100),
    mainCoverImage: z.string().min(1), // base64 image string
    additionalCoverImages: z.array(z.string().min(1)).min(1).max(10), // base64 image string
    address: z.string().min(6).max(300),
    tourLocation: z.object({
      type: z.literal('Point'),
      coordinates: z.array(z.number()).length(2),
    }),
    priceInRupees: z.number().min(1),
    discountInRupees: z.number().min(0),
    tourDurationInDays: z.number().min(1),
    tourStartTime: z.string().min(1),
    tourMaxCapacity: z.number().min(1),
    maxPeoplePerBooking: z.number().min(1),
    tourDifficulty: z.string().min(1),
    // ageGroups: z
    //   .object({
    //     minAge: z.number().min(1),
    //     maxAge: z.number().min(1),
    //   })
    //   .refine(({ minAge, maxAge }) => minAge <= maxAge, {
    //     message: 'Minimum age cannot be greater than maximum age',
    //   }),
    liveGuideLanguages: z.array(z.string()).min(1),
    tourStartDates: z.array(z.date()).min(1),
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
              type: z.literal('Point'),
              coordinates: z.array(z.number()).length(2),
            }),

            image: z.string().min(1),
          })
        ),
        foodIncluded: z.string().min(1),
        accommodationIncluded: z.string().min(1),
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
