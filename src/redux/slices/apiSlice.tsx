import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:2000/api/v-1.0';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }), // include credentials as true , else cookies will not be set if you are requesting from adventour api
  endpoints: () => ({}),
});

export default apiSlice;
