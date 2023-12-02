import apiSlice from './apiSlice';

const autocompleteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (inputString: string) => ({
        url: `tours/suggestions/?query=${inputString}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSuggestionsQuery } = autocompleteSlice;

export default autocompleteSlice;
