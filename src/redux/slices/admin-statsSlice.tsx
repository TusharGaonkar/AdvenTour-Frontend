import apiSlice from './apiSlice';

const statsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStats: build.query({
      query: () => ({
        url: '/admin/getStats',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statsSlice;

export default statsSlice;
