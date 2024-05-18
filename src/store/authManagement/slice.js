// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    newUser: null,
    universities: [],
    semesters: [],
    branches: [],
    states: [],
    reSendOtpTime: 0,
    userEmail: null,
    verifyOtpLoading: false,
    userLoading: false,
    loginthrought:false,
    changePassworddata: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setloginthrought: (state, action) => {
      state.loginthrought = true;
    },
    setNewUser: (state, action) => {
      state.newUser = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setChnagePassword: (state, action) => {
      state.changePassworddata = action.payload;
    },
    setUniversities: (state, action) => {
      state.universities = action.payload;
    },
    setSemesters: (state, action) => {
      state.semesters = action.payload;
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setReSendOtpTime(state, action) {
      state.reSendOtpTime = action.payload;
    },
    setVerifyOtpLoading(state, action) {
      state.verifyOtpLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUser,
  setNewUser,
  setUserEmail,
  clearUser,
  setUniversities,
  setSemesters,
  setBranches,
  setStates,
  setReSendOtpTime,
  setVerifyOtpLoading,
  setChnagePassword,
  setloginthrought,
} = authSlice.actions;
export default authSlice.reducer;
