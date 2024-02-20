import apiSlice from './apiSlice';

const getAllUsersInfoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({
        role = 'local-guide',
        page = 1,
        limit = 10,
        searchQuery = '',
      }: {
        role: 'local-guide' | 'user';
        page: number;
        limit: number;
        searchQuery: string;
      }) => ({
        url: `/admin/getAllUsersInfo?role=${role}&searchQuery=${searchQuery}&page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllUserQuery } = getAllUsersInfoSlice;

export default getAllUsersInfoSlice;
