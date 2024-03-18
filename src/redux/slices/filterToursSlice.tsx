import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

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
  tourRating: '0',
  searchToursString: '',
  getNearbyTours: null,
  tourGroupSize: 1,
  tourStartDate: '',
  tourCategory: new Set<string>([]),
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

    setGetNearbyTours(state, action) {
      if (Array.isArray(action.payload) && action.payload.length === 2) {
        state.getNearbyTours = [...action.payload];
      } else state.getNearbyTours = null;
    },

    setTourGroupSize(state, action) {
      if (typeof action.payload === 'number') state.tourGroupSize = action.payload;
    },

    setTourStartDate(state, action) {
      if (typeof action.payload === 'string') state.tourStartDate = action.payload;
    },

    setTourCategory(state, action) {
      const category = action.payload;
      if (state.tourCategory.has(category)) {
        state.tourCategory.delete(category);
      } else {
        state.tourCategory.add(category as string);
      }
    },
    resetToursQueryString() {
      return initialState;
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
  setGetNearbyTours,
  setTourGroupSize,
  setTourStartDate,
  setTourCategory,
  resetToursQueryString,
} = filterToursSlice.actions;

export default filterToursSlice;
