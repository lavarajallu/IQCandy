// coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mySearchSlice = createSlice({
  name: 'mySearch',
  initialState: {
    searchData: {},
    topicDetails: {},
    chapterDetails: {},
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setTopicDetails: (state, action) => {
      state.topicDetails = action.payload;
    },
    setChapterDetails: (state, action) => {
      state.chapterDetails = action.payload;
    },
  },
});

export const { setSearchData, setTopicDetails, setChapterDetails } =
  mySearchSlice.actions;
export default mySearchSlice.reducer;
