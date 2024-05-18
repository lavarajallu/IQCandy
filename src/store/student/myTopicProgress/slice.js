// coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myTopicsProgressSlice = createSlice({
  name: 'myTopicsProgress',
  initialState: {
    progressTopics: {},
  },
  reducers: {
    setTopicProgress: (state, action) => {
      state.progressTopics = action.payload;
    },
  },
});

export const { setTopicProgress } = myTopicsProgressSlice.actions;
export default myTopicsProgressSlice.reducer;
