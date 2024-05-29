/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

type UserSliceInitialStateType = {
  user: {
    _id: string;
    userName: string;
    avatar?: string;
    email: string;
    role?: 'admin' | 'user' | 'local-guide' | null;
  } | null;
  token?: string | null;
  isLoggedIn: boolean;
};

const userSliceInitialState: UserSliceInitialStateType = {
  user: null,
  token: null,
  isLoggedIn: false,
};

export const reAuthenticate = createAsyncThunk(
  'userInfo/reAuthenticate',
  async (): Promise<unknown> => {
    const response = await fetch(`${import.meta.env.VITE_ADVENTOUR_BACKEND_URL}/auth/verifyToken`, {
      credentials: 'include',
      cache: 'no-store',
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    }

    throw new Error('Jwt integrity verification failed logging out...');
  }
);

export const logoutUser = createAsyncThunk('userInfo/logoutUser', async (): Promise<unknown> => {
  const toastID = toast.loading('Logging out user...', { className: 'text-xs font-medium' });
  const response = await fetch(`${import.meta.env.VITE_ADVENTOUR_BACKEND_URL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  toast.dismiss(toastID);
  if (response.ok) {
    toast.success('Logged out successfully', { className: 'text-xs font-medium' });
    const data = await response.json();
    return data;
  }

  toast.error('Failed to logout user', { className: 'text-xs font-medium' });
  throw new Error('Something went wrong while logging out user...');
});

const userSlice = createSlice({
  name: 'userInfo',
  initialState: userSliceInitialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = { ...user };
      state.token = token;
      state.isLoggedIn = true;
    },
  },

  extraReducers: (build) => {
    build
      .addCase(reAuthenticate.fulfilled, (state, action) => {
        const { user } = action.payload.data;
        if (user) {
          state.user = { ...user };
          state.isLoggedIn = true;
        }
      })
      .addCase(reAuthenticate.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        window.location.reload();
      });
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice;
