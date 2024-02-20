import apiSlice from './apiSlice';

export interface LoginResponse {
  status: string;
  data: Data;
  message?: string;
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

export interface RegisterResponse extends LoginResponse {}
export interface AdminLoginResponse extends LoginResponse {}

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

    loginAdmin: build.mutation<AdminLoginResponse, UserCredentialsType>({
      query: (userCredentials) => ({
        url: '/auth/admin/login',
        method: 'POST',
        body: userCredentials,
      }),
    }),
    registerUser: build.mutation<
      RegisterResponse,
      Required<Pick<UserCredentialsType, 'email' | 'password' | 'confirmPassword'>>
    >({
      query: (userCredentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: userCredentials,
      }),
    }),

    logoutUser: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLoginAdminMutation,
  useLogoutUserMutation,
} = authSlice;

export default authSlice;
