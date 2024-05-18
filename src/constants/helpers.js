import { COLORS } from './colors';

const SHADOW_STYLES = {
  shadowColor: COLORS.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const upperCaseText = (str) => {
  return str.toUpperCase();
};

// Validate email format
const validateEmail = (email) => {
  if (email.match(/^[0-9]{10}$/)) {
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(email);
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};
const validateZipCode = (zipcode) => {
  //  return /(^\d{6}$)/.test(val);
  const zipCodeRegex = /(^\d{6}$)/;
  return zipCodeRegex.test(zipcode);
};
const validatePassword = (password) => {
  // Password requirements: min 8 characters, at least one number, one letter, and one special character
  const passwordRegex =
    // return /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/.test(val);
    ///^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/;
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&()\-.+,/]).{8,16}$/;
   // /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/;

  // Check for the minimum length separately
  const hasMinLength = password.length >= 8;

  return passwordRegex.test(password) && hasMinLength;
};

const validatePhoneNumber = (phoneNumber) => {
  // Use a regular expression to check if the phone number is in a valid format
  const phoneNumberRegex = /^[0-9]{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};
const validateAccountPoint = (accountpoints) => {
  return accountpoints.match(/^[0-9\s]+$/);
};

export {
  SHADOW_STYLES,
  capitalizeFirstLetter,
  upperCaseText,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateAccountPoint,
  validateZipCode,
};
