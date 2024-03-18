import apiSlice from './apiSlice';

const tourReviewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postTourReview: builder.mutation({
      query: ({ formData, tourID }) => ({
        url: `/tourReviews/${tourID}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['TourReviews'],
    }),
  }),
});

export const { usePostTourReviewMutation } = tourReviewSlice;
export default tourReviewSlice;
