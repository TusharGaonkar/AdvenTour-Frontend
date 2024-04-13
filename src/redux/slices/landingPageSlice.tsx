import apiSlice from './apiSlice';

const landingPageSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    topTours: build.query({
      query: ({ limit = 10 }) => ({
        url: '/tours/topTours',
        method: 'GET',
        params: { limit },
      }),
    }),

    topReviews: build.query({
      query: ({ limit = 3 }) => ({
        url: '/tours/topReviews',
        method: 'GET',
        params: {
          limit,
        },
      }),
    }),
  }),
});

export const { useTopToursQuery, useTopReviewsQuery } = landingPageSlice;
