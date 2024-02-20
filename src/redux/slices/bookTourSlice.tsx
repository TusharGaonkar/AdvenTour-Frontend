import apiSlice from './apiSlice';

const bookTourSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTourCost: build.query({
      query: ({
        tourID,
        startDate,
        peopleCount,
      }: {
        tourID: string;
        startDate: string;
        peopleCount: number;
      }) => {
        if (tourID && startDate && peopleCount) {
          return {
            url: `/tours/getTourCost?startDate=${startDate}&peopleCount=${peopleCount}&tourID=${tourID}`,
            method: 'GET',
          };
        }
      },
    }),
  }),
});

export const { useGetTourCostQuery } = bookTourSlice;
