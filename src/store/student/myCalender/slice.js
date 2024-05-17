// coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myCalenderSlice = createSlice({
  name: 'myCalender',
  initialState: {
    scheduledata: {},
  },
  reducers: {
    setschedulefiltered: (state, action) => {
      state.scheduledata = action.payload;
    },
  },
});

export const { setschedulefiltered } = myCalenderSlice.actions;
export default myCalenderSlice.reducer;
