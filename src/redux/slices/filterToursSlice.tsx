import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceInRupees: [700, 30000],
  tourDifficulty: {
    Easy: false,
    Medium: false,
    Hard: false,
  },
  tourDurationInDays: {
    1: false,
    2: false,
    3: false,
    4: false,
  },

  ageGroup: {
    Children: true,
    Teenagers: true,
    Adults: true,
    Seniors: true,
  },
  tourRating: null,
  searchToursString: '',
};

const filterToursSlice = createSlice({
  name: 'filterToursQueryString',
  initialState,
  reducers: {
    setPrice(state, action) {
      state.priceInRupees = [...action.payload];
    },
    setTourDifficulty(state, action) {
      const { difficulty, value } = action.payload;
      state.tourDifficulty[difficulty] = value;
    },
    setTourDuration(state, action) {
      const { duration, value } = action.payload;
      state.tourDurationInDays[duration] = value;
    },
    setAgeGroup(state, action) {
      const { ageGroup, value } = action.payload;
      state.ageGroup[ageGroup] = value;
    },
    setTourRating(state, action) {
      state.tourRating = action.payload;
    },

    setSearchToursString(state, action) {
      if (typeof action.payload === 'string') state.searchToursString = action.payload;
    },
  },
});

export const {
  setPrice,
  setTourDifficulty,
  setTourDuration,
  setAgeGroup,
  setTourRating,
  setSearchToursString,
} = filterToursSlice.actions;

export default filterToursSlice;
