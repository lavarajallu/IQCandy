// Login.js created by Allu Lavaraju

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { imagePaths } from '../../constants/path';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Button from '../../components/Button';
import styles from './styles';
import { selectUser } from '../../store/authManagement/selector';
import { resendOTP, resetPassword } from '../../api/auth';
import { COLORS } from '../../constants/colors';

const ResetPassword = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userId, emailOrMobile } = route.params;
  const { userEmail, reSendOtpTime } = useSelector(selectUser);
  const { authentiCation } = imagePaths;
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    setSeconds(reSendOtpTime);
  }, [reSendOtpTime]);

  //Inside the component where you handle ResetPassword Logic
  const handleResetPassword = async () => {
    if (otp === '' || otp === null || otp === undefined) {
      Alert.alert('IQ Candy', 'Please enter OTP');
    } else if (password === '' || password === null || password === undefined) {
      Alert.alert('IQ Candy', 'Please enter password');
    } else if (
      confirmPassword === '' ||
      confirmPassword === null ||
      confirmPassword === undefined
    ) {
      Alert.alert('IQ Candy', 'Please enter password');
    } else {
      const payload = {
        otp: otp,
        userId: userId,
        emailOrMobile: emailOrMobile,
        password: password,
        confirmPassword: confirmPassword,
      };
      await resetPassword({
        data: payload,
        navigation,
      });
    }
  };

  const handleResendOtp = async () => {
    if (userEmail != null) {
      let payload = {
        emailOrMobile: emailOrMobile,
      };
      await resendOTP({
        data: payload,
        dispatch,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={authentiCation.loginBanner}
          resizeMode='cover'
          style={styles.imageBackground}
        />
      </View>
      <View style={styles.curvedLineContainer}>
        <ImageBackground
          source={require('../../../assets/images/shape.png')}
          resizeMode='cover'
          style={styles.curvedLine}
        >
          <View style={styles.logoContainer}>
            <Image source={authentiCation.appCircleLogo} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.createAccountText, { marginHorizontal: 20 }]}>
              {seconds > 0 ? (
                <Text style={styles.createAccountLink}>
                  {`Resend OTP in ${minutes}:${
                    seconds < 10 ? `0${seconds}` : seconds
                  }`}
                </Text>
              ) : (
                <Text style={styles.createAccountLink}>{'Reset Password'}</Text>
              )}
            </Text>

            <ValidatedTextInput
              label='OTP'
              placeholder='Enter OTP'
              value={otp}
              onChangeText={setOtp}
              keyboardType={'number-pad'}
              inputMode='numeric'
              validation={{
                showErrorMessage: setOtp === '',
                errorMessage: 'OTP cannot be empty',
              }}
              iconName='medical-outline'
            />

            <ValidatedTextInput
              label='Password'
              placeholder='Enter Password'
              value={password}
              onChangeText={setPassword}
              keyboardType={'default'}
              inputMode='text'
              secureTextEntry
              validation={{
                showErrorMessage: setPassword === '',
                errorMessage: 'Password cannot be empty',
              }}
              iconName='lock-closed-outline'
            />

            <ValidatedTextInput
              label='Confirm Password'
              placeholder='Enter Confirm Password'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              keyboardType={'default'}
              inputMode='text'
              secureTextEntry
              validation={{
                showErrorMessage: setConfirmPassword === '',
                errorMessage: 'Confirm Password cannot be empty',
              }}
              iconName='lock-closed-outline'
            />
          </View>

          <View
            style={[styles.buttonContainer, { justifyContent: 'space-evenly' }]}
          >
            <Button
              title={'UPDATE'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={() => handleResetPassword()} // Call the function to handle login
            />
            {minutes === 0 && seconds === 0 && (
              <Button
                title={'RESEND'}
                colors={[COLORS.secondary, COLORS.dark]}
                style={[styles.button]}
                textStyle={styles.buttonText}
                onPress={() => handleResendOtp()} // Call the function to handle login
              />
            )}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.createAccountText}>
                Remember Password?{' '}
                <Text style={styles.createAccountLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ResetPassword;
