// coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const validatePackageSlice = createSlice({
  name: 'validatePackage',
  initialState: {
    validatePackage: {},
    getpackages: {},
    activatioapidata: {},
    promocodeapidata: {},
    paymentapidata: {},
    razorpaydata: {},
  },
  reducers: {
    setValidPackages: (state, action) => {
      state.validatePackage = action.payload;
    },
    setValidpackages: (state, action) => {
      state.getpackages = action.payload;
    },
    setactivatioapi: (state, action) => {
      state.activatioapidata = action.payload;
    },
    setpromoCodeapi: (state, action) => {
      state.promocodeapidata = action.payload;
    },
    setpaymentapidata: (state, action) => {
      state.paymentapidata = action.payload;
    },
    setrazorapyapi: (state, action) => {
      state.razorpaydata = action.payload;
      state.paymentapidata = {};
    },
  },
});

export const {
  setValidPackages,
  setValidpackages,
  setactivatioapi,
  setpromoCodeapi,
  setpaymentapidata,
  setrazorapyapi,
} = validatePackageSlice.actions;
export default validatePackageSlice.reducer;
