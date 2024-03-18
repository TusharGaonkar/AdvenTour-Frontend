import format from 'date-fns/format';
import apiSlice from './apiSlice';

const guideBookingSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBookingsForGuide: build.query({
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
        url: '/guide/allBookings',
        method: 'GET',
        params: {
          selectedDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined,
          sortBy: sortBy || 'latest',
          status,
          page,
        },
      }),
    }),
  }),
});

export const { useGetAllBookingsForGuideQuery } = guideBookingSlice;
export default guideBookingSlice;
