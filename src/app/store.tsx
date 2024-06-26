import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../redux/slices/apiSlice';
import userSlice from '../redux/slices/userSlice';
import filterToursSlice from '../redux/slices/filterToursSlice';
import FAQSlice from '../redux/slices/FAQSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [filterToursSlice.name]: filterToursSlice.reducer,
    [FAQSlice.name]: FAQSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
