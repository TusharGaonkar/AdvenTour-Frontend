import apiSlice from './apiSlice';

const getSimilarToursSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSimilarTours: build.query({
      query: (tourID: string) => ({
        url: '/tours/getSimilarTours',
        params: {
          tourID,
        },
      }),
    }),
  }),
});

export const { useGetSimilarToursQuery } = getSimilarToursSlice;
export default getSimilarToursSlice;
