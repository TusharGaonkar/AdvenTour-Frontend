/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = [{ question: '', answer: '' }];

const FAQSlice = createSlice({
  initialState,
  name: 'FAQList',
  reducers: {
    addQuestion: (state) => {
      state.push({ question: '', answer: '' });
    },

    deleteQuestion: (state) => {
      state.pop();
    },

    updateQuestion: (state, action) => {
      const { index, value } = action.payload;
      state[index].question = value;
    },

    updateAnswer: (state, action) => {
      const { index, value } = action.payload;
      state[index].answer = value;
    },

    resetFAQ: () => initialState,
  },
});

export const { addQuestion, deleteQuestion, updateQuestion, updateAnswer, resetFAQ } =
  FAQSlice.actions;

export default FAQSlice;
