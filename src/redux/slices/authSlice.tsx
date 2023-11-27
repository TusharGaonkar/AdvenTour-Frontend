import apiSlice from './apiSlice';

export interface LoginResponse {
  status: string;
  data: Data;
}

interface Data {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  authProvider: string;
  role: string;
  __v: number;
}

type UserCredentialsType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const authSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponse, UserCredentialsType>({
      query: (userCredentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: userCredentials,
      }),
    }),
    registerUser: build.mutation<
      LoginResponse,
      Required<Pick<UserCredentialsType, 'email' | 'password' | 'confirmPassword'>>
    >({
      query: (userCredentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: userCredentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authSlice;

export default authSlice;
