// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import logger from 'redux-logger'; // Import the logger middleware

// Ensure you import the required modules properly
const middleware = (getDefaultMiddleware) => {
  return __DEV__
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware();
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
