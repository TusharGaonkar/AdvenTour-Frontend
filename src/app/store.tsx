import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../redux/slices/apiSlice';
import userSlice from '../redux/slices/userSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
