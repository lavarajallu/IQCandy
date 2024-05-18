import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  setUserDetails,
  setUpdateProfile,
} from '../../store/student/MyProfile/slice';
import { setUser } from '../../store/authManagement/slice';
const getUserData = async (payload) => {
  const { profile } = apiEndPoints;
  const endpoint = profile.getUserData(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly

  if (response) {
    const { data } = response;
    payload.dispatch(setUserDetails(data));
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    payload.dispatch(setUser(data));
    payload.navigation.navigate('DrawerNavigation');
  }
};
const updateProfile = async (payload) => {
  const { profile } = apiEndPoints;
  const endpoint = profile.updateProfile(payload);

  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setUpdateProfile(data));

    // payload.navigation.navigate('DrawerNavigation');
  }
};
export { getUserData, updateProfile };
