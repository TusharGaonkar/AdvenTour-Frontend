import apiSlice from './apiSlice';

const individualTourInfoSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIndividualTourInfo: build.query({
      query: (id) => ({
        url: `/tours/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetIndividualTourInfoQuery } = individualTourInfoSlice;

export default individualTourInfoSlice;
