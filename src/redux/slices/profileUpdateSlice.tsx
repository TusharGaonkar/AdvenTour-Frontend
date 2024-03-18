import apiSlice from './apiSlice';

const updateProfileSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateAvatar: build.mutation({
      query: ({ formData }) => ({
        url: '/user/updateProfile',
        method: 'PATCH',
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation } = updateProfileSlice;

export default updateProfileSlice;
