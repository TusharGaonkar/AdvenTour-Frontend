import apiSlice from './apiSlice';

const tourVerificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToursForAdmin: builder.query({
      query: ({ status, page = 1 }: { status: string; page: number }) => ({
        url: `/admin/getTours?status=${status}&page=${page}`,
        method: 'GET',
      }),
    }),

    getTourForAdminWithID: builder.query({
      query: (id: string) => ({
        url: `/admin/tours/${id}`,
        method: 'GET',
      }),

      providesTags: ['AdminTourPreview'],
    }),

    acceptTour: builder.mutation({
      query: (formData) => ({
        url: '/admin/tours/acceptTour',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['AdminTourPreview'],
    }),

    rejectTour: builder.mutation({
      query: (formData) => ({
        url: '/admin/tours/rejectTour',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['AdminTourPreview'],
    }),
  }),
});

export const {
  useGetToursForAdminQuery,
  useGetTourForAdminWithIDQuery,
  useAcceptTourMutation,
  useRejectTourMutation,
} = tourVerificationSlice;

export default tourVerificationSlice;
