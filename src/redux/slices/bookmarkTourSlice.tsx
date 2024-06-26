import apiSlice from './apiSlice';

const bookmarkTourSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBookmarks: build.query<unknown, void>({
      query: ({ searchString, page }: { searchString: string; page: number } = {}) => ({
        url: '/user/bookmarks',
        method: 'GET',
        params: {
          search: searchString || undefined,
          page,
        },
      }),
      providesTags: ['Bookmarks'],
    }),

    createBookmark: build.mutation<unknown, string>({
      query: (tourId) => ({
        url: '/user/bookmarks',
        method: 'POST',
        body: {
          tourId,
        },
      }),
      invalidatesTags: ['Bookmarks'],
    }),

    deleteBookmark: build.mutation<unknown, { tourId: string; invalidate: string[] }>({
      query: ({ tourId }) => ({
        url: '/user/bookmarks',
        method: 'DELETE',
        body: {
          tourId,
        },
      }),
      invalidatesTags: (_, error, arg) => {
        if (!error) {
          return [...arg.invalidate];
        }
        return [];
      },
    }),
  }),
});

export const { useGetAllBookmarksQuery, useCreateBookmarkMutation, useDeleteBookmarkMutation } =
  bookmarkTourSlice;

export default bookmarkTourSlice;
