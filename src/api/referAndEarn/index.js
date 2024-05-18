import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';

import {
  setReferalCode,
  setRegisteredUsers,
  setPayoutData,
  setPostPayouts,
} from '../../store/student/referAndEarn/slice';

const getReferalCode = async (payload) => {
  const { referAndEarn } = apiEndPoints;
  const endpoint = referAndEarn.getReferalCode(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setReferalCode(data));
  }
};
const getRegisteredUsers = async (payload) => {
  const { referAndEarn } = apiEndPoints;
  const endpoint = referAndEarn.getRegisteredUsers(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setRegisteredUsers(data));
  }
};
const getPayoutData = async (payload) => {
  const { referAndEarn } = apiEndPoints;
  const endpoint = referAndEarn.getPayoutData(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPayoutData(data));
  }
};
const postPayouts = async (payload) => {
  const { referAndEarn } = apiEndPoints;
  const endpoint = referAndEarn.postPayouts;

  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  if (response) {
    const { data } = response;
    payload.dispatch(setPostPayouts(data));
  }
};
export { getReferalCode, getRegisteredUsers, getPayoutData, postPayouts };
