import apiSlice from './apiSlice';

const accountRecoverySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: '/auth/forgotPassword',
        body: {
          email,
        },
        method: 'POST',
      }),
    }),

    resetPassword: builder.mutation({
      query: ({
        token,
        password,
        confirmPassword,
      }: {
        token: string;
        password: string;
        confirmPassword: string;
      }) => ({
        url: '/auth/resetPassword',
        params: {
          token,
        },
        body: {
          password,
          confirmPassword,
        },
        method: 'POST',
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = accountRecoverySlice;

export default accountRecoverySlice;
