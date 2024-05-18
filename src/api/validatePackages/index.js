// MyCourses API.js

import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import {
  setValidPackages,
  setValidpackages,
  setactivatioapi,
  setrazorapyapi,
  setpaymentapidata,
  setpromoCodeapi,
} from '../../store/student/validatePackages/slice';

const getValidaPackages = async (payload) => {
  const { validatepackages } = apiEndPoints;
  const endpoint = validatepackages.validatepackages(payload.userId);
  const method = 'GET';
  const body = null;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setValidPackages(data));
  }
};
const getsubjectpackages = async (payload) => {
  const { validatepackages } = apiEndPoints;
  const endpoint = validatepackages.getsubjectpackages(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setValidpackages(data));
  }
};
const activationapi = async (payload) => {
  const { validatepackages } = apiEndPoints;
  const endpoint = validatepackages.activationapi(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setactivatioapi(data));
  }
};
const promoCodeapi = async (payload) => {
  const { validatepackages } = apiEndPoints;
  const endpoint = validatepackages.promoCodeapi(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setpromoCodeapi(data));
  }
};
const paymentapi = async (payload) => {
  const { validatepackages } = apiEndPoints;
  const endpoint = validatepackages.paymentapi(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly

  if (response) {
    const { data } = response;
    payload.dispatch(setpaymentapidata(data));
  }
};
const razorapyapi = async (payload) => {
  const { validatepackages } = apiEndPoints;
  const endpoint = validatepackages.razorapyapi(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setrazorapyapi(data));
  }
};

export {
  getValidaPackages,
  paymentapi,
  getsubjectpackages,
  promoCodeapi,
  activationapi,
  razorapyapi,
};
