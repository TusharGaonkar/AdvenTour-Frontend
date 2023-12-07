import apiSlice from './apiSlice';

const getToursSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllTours: build.query<Record<string, unknown>, string>({
      query: (queryString = '') => ({
        url: `/tours?${queryString}`,
        method: 'GET',
      }),

      providesTags: ['Tours'],
    }),
  }),
});

export const { useGetAllToursQuery } = getToursSlice;

export default getToursSlice;
