// MyCourses API.js

import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import {
  setSearchData,
  setTopicDetails,
  setChapterDetails,
} from '../../store/student/search/slice';

const getSearchData = async (payload) => {
  const { searchPage } = apiEndPoints;
  const endpoint = searchPage.getSearchData(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSearchData(data));
  }
};
const getTopicDetails = async (payload) => {
  const { searchPage } = apiEndPoints;
  const endpoint = searchPage.getTopicDetails(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTopicDetails(data));
  }
};
const getChapterDetails = async (payload) => {
  const { searchPage } = apiEndPoints;
  const endpoint = searchPage.getChapterDetails(payload);
  const method = 'GET';
  const body = payload.data;
 
  
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly

  if (response) {
    const { data } = response;
    payload.dispatch(setChapterDetails(data));
  }
};

export { getSearchData, getTopicDetails, getChapterDetails };
