// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myReferandEarnSlice = createSlice({
  name: 'myReferandEarn',
  initialState: {
    referCode: {},
    registeredUsers: {},
    payoutData: {},
    postPayout: {},
    loading: false,
  },
  reducers: {
    setReferalCode: (state, action) => {
      state.referCode = action.payload;
    },
    setRegisteredUsers: (state, action) => {
      state.registeredUsers = action.payload;
    },
    setPayoutData: (state, action) => {
      state.payoutData = action.payload;
    },
    setPostPayouts: (state, action) => {
      state.postPayout = action.payload;
    },
  },
});

export const {
  setReferalCode,
  setRegisteredUsers,
  setPayoutData,
  setPostPayouts,
} = myReferandEarnSlice.actions;
export default myReferandEarnSlice.reducer;
