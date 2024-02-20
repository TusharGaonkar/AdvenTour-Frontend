import apiSlice from './apiSlice';

const contributeNewTourSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadNewTour: builder.mutation<unknown, FormData>({
      query: (tourData) => ({
        url: '/tourValidation',
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: tourData,
      }),
    }),
  }),
});

export const { useUploadNewTourMutation } = contributeNewTourSlice;

export default contributeNewTourSlice;
