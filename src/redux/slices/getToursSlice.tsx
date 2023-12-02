import apiSlice from './apiSlice';

const getToursSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllTours: build.query<any, string>({
      query: (queryString = '') => ({
        url: `/tours?${queryString}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllToursQuery } = getToursSlice;

export default getToursSlice;
