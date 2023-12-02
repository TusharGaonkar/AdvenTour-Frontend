/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    const response = await fetch('http://localhost:2000/api/v-1.0/auth/verifyToken', {
      credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    }

    throw new Error('Jwt integrity verification failed logging out...');
  }
);

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

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
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
      });
  },
});

export const { logoutUser, setCredentials } = userSlice.actions;
export default userSlice;
