import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const BASE_URL = 'https://172.105.60.154:2000/api/v-1.0';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }); // include credentials to allow cookies to be sent with requests

const interceptorAllowList = (url: string) => {
  const allowList = ['login', 'register', 'forgotPassword', 'resetPassword'];
  return allowList.some((allowedUrl) => url.includes(allowedUrl));
};

// intercept auth errors which are incase unhandled by protected route pages and redirect to login
const interceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && !interceptorAllowList(args.url)) {
    if (args.url.includes('admin')) {
      window.location.href = '/admin/login';
    } else {
      window.location.href = '/login';
    }
  }
  return result;
};

const apiSlice = createApi({
  tagTypes: ['Bookmarks', 'Tours', 'adminBookingsInfo', 'TourReviews', 'userBookings'],
  reducerPath: 'api',
  baseQuery: interceptor,
  endpoints: () => ({}),
});

export default apiSlice;
