// ValidatedTextInput.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateZipCode,
} from '../../constants/helpers';

import styles from './styles';

const ValidatedTextInput = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  editable,
  validation,
  iconName,
  keyboardType = 'default',
  inputMode = 'text',
  maxLength = 45,
  prevpassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localValidation, setLocalValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  useEffect(() => {
    if (validation.showErrorMessage) {
      setLocalValidation(validation);
    }
  }, [validation.showErrorMessage]);

  const handleTextChange = (text) => {
    onChangeText(text);
    // Clear error message when text changes
    setLocalValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
    // Validate the input dynamically
    validateInput(
      label,
      text,
      getValidationFunction(label),
      setLocalValidation
    );
  };

  const validateInput = (
    label,
    value,
    validationFunction,
    setLocalValidation
  ) => {
    if (label !== 'Referral Code') {
      if (!value.trim()) {
        setLocalValidation({
          showErrorMessage: true,
          errorMessage: `${label} cannot be empty`,
        });
      } else {
        setLocalValidation({
          showErrorMessage: false,
          errorMessage: '',
        });

        if (validationFunction && !validationFunction(value)) {
          if (label === 'Password') {
            setLocalValidation({
              showErrorMessage: true,
              errorMessage: `Invalid ${label.toLowerCase()},Password must contain at least 8 different characters and can include letters, numbers, and special characters`,
            });
          } else if (label === 'Zip Code') {
            setLocalValidation({
              showErrorMessage: true,
              errorMessage: `Invalid ${label.toLowerCase()} please enter valid zipCode with minimum 6 numbers`,
            });
          } else if (label === 'Confirm Password') {
            setLocalValidation({
              showErrorMessage: true,
              errorMessage: `Invalid ${label.toLowerCase()},Password must contain at least 8 different characters and can include letters, numbers, and special characters`,
            });
          } else if (label === 'New Password') {
            setLocalValidation({
              showErrorMessage: true,
              errorMessage: `Invalid ${label.toLowerCase()},Password must contain at least 8 different characters and can include letters, numbers, and special characters`,
            });
          } else {
            setLocalValidation({
              showErrorMessage: true,
              errorMessage: `Invalid ${label.toLowerCase()}`,
            });
          }
        }
      }
    }
  };

  const handleBlur = () => {
    validateInput(
      label,
      value,
      getValidationFunction(label),
      setLocalValidation
    );

    // Propagate the local validation state to the parent component
    validation.showErrorMessage = localValidation.showErrorMessage;
    validation.errorMessage = localValidation.errorMessage;
  };

  const getValidationFunction = (label) => {
    // Define your validation functions based on label
    switch (label) {
      case 'Email':
        return validateEmail;
      case 'Password':
        return validatePassword;
      case 'Confirm Password':
        return validatePassword;
      case 'Contact':
        return validatePhoneNumber;
      case 'Zip Code':
        return validateZipCode;
      // Add more cases as needed
      default:
        return null;
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.textInputWrapper}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color='grey'
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={'grey'}
          inputMode={inputMode}
          maxLength={maxLength}
          secureTextEntry={!showPassword && secureTextEntry}
          value={value}
          onChangeText={handleTextChange}
          keyboardType={keyboardType}
          onBlur={handleBlur}
          editable={editable === false ? editable : true}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color='grey'
            />
          </TouchableOpacity>
        )}
      </View>
      {localValidation.showErrorMessage && (
        <Text style={styles.errorMessage}>{localValidation.errorMessage}</Text>
      )}
    </View>
  );
};

export default ValidatedTextInput;
