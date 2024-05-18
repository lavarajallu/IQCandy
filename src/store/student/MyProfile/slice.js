// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState: {
    userDetails: {},
    updateProfiledata: {},
    loading: false,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.updateProfiledata = {};
    },
    setUpdateProfile: (state, action) => {
      state.updateProfiledata = action.payload;
    },
  },
});

export const { setUserDetails, setUpdateProfile } = myProfileSlice.actions;
export default myProfileSlice.reducer;
