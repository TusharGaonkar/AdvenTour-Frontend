/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type UserSliceInitialStateType = {
  user: {
    _id: string;
    userName: string;
    avatar?: string;
    email: string;
    role: 'admin' | 'user' | 'local-guide';
  } | null;
  token: string | null;
  isLoggedIn: boolean;
};

const userSliceInitialState: UserSliceInitialStateType = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
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
});

export const { logoutUser, setCredentials } = userSlice.actions;
export default userSlice;
