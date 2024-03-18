import apiSlice from './apiSlice';

const bookingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBookings: builder.query({
      query: ({ page, type }: { page: number; type: 'upcoming' | 'past' }) => ({
        url: '/user/bookings',
        method: 'GET',
        params: {
          page,
          type,
        },
      }),

      providesTags: ['userBookings'],
    }),

    cancelBooking: builder.mutation({
      query: (bookingID) => ({
        url: '/user/cancelBooking',
        method: 'POST',
        body: {
          bookingID,
        },
      }),
      invalidatesTags: ['userBookings'],
    }),
  }),
});

export const { useGetUserBookingsQuery, useCancelBookingMutation } = bookingSlice;

export default bookingSlice;
