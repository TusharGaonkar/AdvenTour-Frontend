import apiSlice from './apiSlice';

const getTourReviewsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTourReviews: builder.query({
      query: ({ tourID, sortBy, page }) => ({
        url: `/tourReviews/${tourID}`,
        method: 'GET',
        params: { sortBy, page },
      }),
      providesTags: ['TourReviews'],
    }),

    getTourRatingDistribution: builder.query({
      query: (tourID) => ({
        url: `/tourReviews/ratingDistribution/${tourID}`,
        method: 'GET',
      }),

      providesTags: ['TourReviews'],
    }),
  }),
});

export const { useGetTourReviewsQuery, useGetTourRatingDistributionQuery } = getTourReviewsSlice;

export default getTourReviewsSlice;
