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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
