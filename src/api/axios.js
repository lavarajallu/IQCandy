// ApiService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage or the storage library you're using
import { Alert } from 'react-native';
const apiBaseUrl ='https://api.iqcandy.com/api/iqcandy'// 'https://api.iqcandy.com/api/iqcandy';.

// const apiBaseUrl =
//   'http://myprofessor-lb-1079580533.ap-south-1.elb.amazonaws.com/api/my-professor';

// Create an instance of Axios with the desired configuration
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add any global request logic here, such as setting authentication headers
    const authToken = await AsyncStorage.getItem('userToken');
    if (authToken) {
      config.headers.jwt = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Check for successful HTTP status codes (200 or 201)
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      // Handle non-successful status codes here
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  },
  async (error) => {
    const errorInfo = error?.response?.data?.error;
    const errorMessage = errorInfo?.message || '';
    console.error('Error during API: ',  error?.response);
    // Session cleared whenever user session is expired
    if (errorMessage === 'Session Expired, please login.') {
      Alert.alert(
        'IQ Candy',
        'Session Expired, please logout and login again'
      );
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      dispatch(clearUser());
      navigation.replace('Login');
    } else {
     Alert.alert('IQ Candy', errorMessage);
    }
    // throw error;
  }
);

// Update makeApiCall to use Axios
const makeApiCall = async (endpoint, method = 'GET', body = null) => {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data: body,
    });

    return response;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};

export { makeApiCall };
