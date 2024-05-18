// Login.js created by Allu Lavaraju

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { imagePaths } from '../../constants/path';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Button from '../../components/Button';
import { generateOtp, verifyOtp } from '../../api/auth';
import styles from './styles';
import { selectUser } from '../../store/authManagement/selector';
import { COLORS } from '../../constants/colors';

const OTPVerification = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userId } = route.params;
  const { user, reSendOtpTime } = useSelector(selectUser);

  const { authentiCation } = imagePaths;
  const [otp, setOtp] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  //Inside the component where you handle login logic
  const nextOtp = async () => {
    console.log('userId', userId);
    const payload = {
      otp: otp,
    };
    await verifyOtp({
      data: payload,
      navigation,
      userId: userId,
    });
  };

  const reSendOtp = () => {
    const payload = {};
    setSeconds(30);
    generateOtp({
      data: payload,
      userId: userId,
    });
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      setSeconds((seconds) => {
        // Check if time is up
        if (seconds <= 0) {
          // if (minutes === 0) {
          //   clearInterval(myInterval);
          // } else {
          //   setMinutes(minutes - 1);
          //   setSeconds(59);
          // }
          // clearInterval(myInterval); // Stop the timer
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    //setSeconds(reSendOtpTime);
  }, [reSendOtpTime]);

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
              OTP Verification{' '}
              {seconds > 0 && (
                <Text style={styles.createAccountLink}>
                  Resend OTP in {minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              )}
            </Text>
            <ValidatedTextInput
              label='OTP'
              placeholder='Enter OTP'
              value={otp}
              onChangeText={setOtp}
              validation={{
                showErrorMessage: setOtp === '',
                errorMessage: 'OTP cannot be empty',
              }}
              iconName='mail-outline'
            />
          </View>

          <View
            style={[styles.buttonContainer, { justifyContent: 'space-evenly' }]}
          >
            <Button
              title={'NEXT'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={() => nextOtp()} // Call the function to handle login
            />
            {seconds === 0 && (
              <Button
                title={'RESEND OTP'}
                colors={[COLORS.secondary, COLORS.dark]}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => reSendOtp()} // Call the function to handle login
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

export default OTPVerification;
