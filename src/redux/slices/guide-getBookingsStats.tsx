import apiSlice from './apiSlice';

const getStatsForGuideSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStatsForGuide: build.query({
      query: () => ({
        url: '/guide/bookingStats',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStatsForGuideQuery } = getStatsForGuideSlice;

export default getStatsForGuideSlice;
