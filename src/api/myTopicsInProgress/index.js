// MyCourses API.js

import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import { setTopicProgress } from '../../store/student/myTopicProgress/slice';

const getTopicsProgress = async (payload) => {
  const { topicsinProgress } = apiEndPoints;
  const endpoint = topicsinProgress.getTopicsProgress(payload.userId);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTopicProgress(data));
  }
};

export { getTopicsProgress };
