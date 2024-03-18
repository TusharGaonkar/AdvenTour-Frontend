import format from 'date-fns/format';
import apiSlice from './apiSlice';

const getAllBookingsInfoSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: ({
        selectedDate,
        sortBy,
        status,
        page,
      }: {
        selectedDate: Date | null;
        sortBy: string;
        status: string;
        page: number;
      }) => ({
        url: '/admin/getAllBookingsInfo',
        method: 'GET',
        params: {
          selectedDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined,
          sortBy: sortBy || 'latest',
          status,
          page,
        },
      }),

      providesTags: ['adminBookingsInfo'],
    }),

    getPaymentInfo: build.query({
      query: (paymentID: string) => ({
        url: '/admin/getPaymentInfo',
        method: 'GET',
        params: {
          paymentID,
        },
      }),
    }),

    cancelAndRefundBooking: build.mutation({
      query: (bookingID: string) => ({
        url: 'admin/cancelBooking',
        method: 'POST',
        body: {
          bookingID,
        },
      }),
      invalidatesTags: ['adminBookingsInfo'],
    }),
  }),
});

export const { useGetAllBookingsQuery, useGetPaymentInfoQuery, useCancelAndRefundBookingMutation } =
  getAllBookingsInfoSlice;

export default getAllBookingsInfoSlice;
