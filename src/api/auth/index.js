// auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import {
  setBranches,
  setNewUser,
  setUserEmail,
  setSemesters,
  setUniversities,
  setReSendOtpTime,
  setChnagePassword,
  setUser,
  setloginthrought
} from '../../store/authManagement/slice';

const loginUser = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.login;
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    const authToken = data.jwt;
    // Save the authToken to AsyncStorage or secure storage
    if (data?.loginResponse === 'session_exists') {
      Alert.alert(
        'Session Already Exists',
        'Do you want to terminate the existing session?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Terminate Session',
            onPress: () => {
              const reqPayload = {
                userIdentifier: payload.data.userIdentifier,
                password: payload.data.password,
                killSession: true,
                deviceType: data.deviceType,
                deviceToken: payload.data.deviceToken,
              };
              loginUser({
                data: reqPayload,
                navigation: payload.navigation,
                dispatch: payload.dispatch,
              });
            },
          },
        ]
      );
    } else {
      await AsyncStorage.setItem('userToken', authToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      // Dispatch the setUser action to update the user state in Redux

      payload.dispatch(setUser(data));
      payload.dispatch(setloginthrought(true))
      payload.dispatch(setUserEmail(data.userInfo.email));
      payload.navigation.navigate('DrawerNavigation');
    }
  }
};

const createNewUser = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.register;
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    // Dispatch the setUser action to update the user state in Redux
    payload.dispatch(setNewUser(data));
    payload.dispatch(setUserEmail(payload.data.email));
    payload.navigation.navigate('OTPVerification', { userId: data.user.id });
  }
};

const forgotPassword = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.forgotPassword;
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setUserEmail(data.email));
    payload.dispatch(setReSendOtpTime(30));
    payload.navigation.navigate('ResetPassword', {
      userId: data.id,
      emailOrMobile: payload.data.emailOrMobile,
    });
  }
};

const resendOTP = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.forgotPassword;
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setUserEmail(data.email));
    payload.dispatch(setReSendOtpTime(30));
  }
};

const resetPassword = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.resetPassword;
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    Alert.alert('My Professor', 'Password Updated Successfully', [
      {
        text: 'OK',
        onPress: () => {
          payload.navigation.navigate('Login');
        },
      },
    ]);
  }
};

//afterRegistration ValidateAccountOtp
const verifyOtp = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.verifyOtp(payload.userId);
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    Alert.alert('My Professor', 'User Registered successfully');
    payload.navigation.navigate('Login');
  }
};

//regenerate OTP
const generateOtp = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.generateOtp(payload.userId);
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
  }
};

//changePassword
const changePassword = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.changePassword;
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setChnagePassword(data));
    Alert.alert('My Professor', 'Password updated successfully');
    payload.navigation.navigate('Home');
  }
};

const getUniversities = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.allUniversities;
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    // Dispatch the setUser action to update the user state in Redux
    payload.dispatch(setUniversities(data?.items));
    payload.dispatch(setBranches([]));
    payload.dispatch(setSemesters([]));
  }
};

const getBranches = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.allBranches(payload.universityId);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    // Dispatch the setUser action to update the user state in Redux
    payload.dispatch(setBranches(data?.items));
  }
};

const getSemesters = async (payload) => {
  const { auth } = apiEndPoints;
  const endpoint = auth.allSemesters(payload.universityId, payload.branchId);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    // Dispatch the setUser action to update the user state in Redux
    payload.dispatch(setSemesters(data?.items));
  }
};

export {
  loginUser,
  createNewUser,
  verifyOtp,
  getUniversities,
  getBranches,
  getSemesters,
  generateOtp,
  forgotPassword,
  resetPassword,
  resendOTP,
  changePassword,
};
