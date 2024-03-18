import apiSlice from './apiSlice';

const contactUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contactUser: builder.mutation({
      query: ({ to, subject, message }: { to: string; subject: string; message: string }) => ({
        url: '/contactUser',
        method: 'POST',
        body: {
          message,
          subject,
          to,
        },
      }),
    }),
  }),
});

export const { useContactUserMutation } = contactUserSlice;

export default contactUserSlice;
