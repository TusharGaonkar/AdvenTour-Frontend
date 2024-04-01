import apiSlice from './apiSlice';

type GetAllToursQueryType = {
  page: number;
  limit: number;
  queryString: string;
};

const getToursSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllTours: build.query<unknown, GetAllToursQueryType>({
      query: ({ queryString = '', page = 1, limit = 6 }) => ({
        url: `/tours?${queryString}&page=${page}&limit=${limit}`,
        method: 'GET',
      }),

      providesTags: ['Tours'],
    }),
  }),
});

export const { useGetAllToursQuery } = getToursSlice;

export default getToursSlice;
