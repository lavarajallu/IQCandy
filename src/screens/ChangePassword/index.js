import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Button from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { validatePassword } from '../../constants/helpers';
import { changePassword } from '../../api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/authManagement/selector';

const { width, height } = Dimensions.get('window');

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, changePassworddata } = useSelector(selectUser);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [oldPasswordValidation, setOldPasswordValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });
  const [newPasswordValidation, setNewPasswordValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const validteoldPassword = (oldPassword, setOldPasswordValidation) => {
    if (!oldPassword.trim() || !validatePassword(password)) {
      setOldPasswordValidation({
        showErrorMessage: true,
        errorMessage:
          'Invalid password, please enter 8 characters, at least one number, one letter, and one special character',
      });
      return false;
    }
    return true;
  };

  const validtepassword = (password, setPasswordValidation) => {
    if (!password.trim() || !validatePassword(password)) {
      setPasswordValidation({
        showErrorMessage: true,
        errorMessage:
          'Invalid password, please enter 8 characters, at least one number, one letter, and one special character',
      });
      return false;
    }
    // check password is match with confirm password   or not
    if (oldPassword === password.trim()) {
      setPasswordValidation({
        showErrorMessage: true,
        errorMessage: 'New password must be different from old password',
      });
      return false;
    }
    return true;
  };

  const validtecnfpassword = (
    confirmPassword,
    setConfirmPasswordValidation
  ) => {
    if (!confirmPassword.trim() || !validatePassword(confirmPassword)) {
      setConfirmPasswordValidation({
        showErrorMessage: true,
        errorMessage:
          'Invalid confirm password, please enter 8 characters, at least one number, one letter, and one special character',
      });
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordValidation({
        showErrorMessage: true,
        errorMessage: 'Passwords must match',
      });
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    const isPasswordValid = validtepassword(password, setNewPasswordValidation);
    const isConfrimPasswordValid = validtecnfpassword(
      confirmPassword,
      setConfirmPasswordValidation
    );
    const isOldPasswordValid = validteoldPassword(
      oldPassword,
      setOldPasswordValidation
    );

    // If any validation fails, display an error or alert
    if (!isPasswordValid || !isConfrimPasswordValid || !isOldPasswordValid) {
      return;
    }

    const payload = {
      userId: user?.userInfo?.userId,
      oldPassword: oldPassword,
      newPassword: password,
      confirmPassword: confirmPassword,
    };
    // Perform password update logic here
    // You can make an API call, update the database, etc.
    await changePassword({
      data: payload,
      dispatch,
      navigation,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/changepwd.jpeg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <ValidatedTextInput
          label='Old Password'
          placeholder='Enter old password'
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
          validation={oldPasswordValidation}
          iconName='lock-closed-outline'
        />

        <ValidatedTextInput
          label='New Password'
          placeholder='Enter new password'
          secureTextEntry
          value={password}
          keyboardType={'default'}
          inputMode={'text'}
          onChangeText={setPassword}
          validation={newPasswordValidation}
          iconName='lock-closed-outline'
        />

        <ValidatedTextInput
          label='Confirm Password'
          placeholder='Confirm password'
          secureTextEntry
          value={confirmPassword}
          keyboardType={'default'}
          inputMode={'text'}
          onChangeText={setConfirmPassword}
          validation={confirmPasswordValidation}
          iconName='lock-closed-outline'
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={'Update Password'}
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => handleChangePassword()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
  },
  logoContainer: {
    flex: 0.36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.35,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.appSecondaryColor,
  },
  buttonText: {
    color: COLORS.whiteColor,
    fontSize: 20,
    fontFamily: 'mulish-bold',
  },
  logo: { height: height * 0.3, width: width * 0.9, marginTop: 10 },
});

export default ChangePassword;
