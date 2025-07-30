// Login.js created by Allu Lavaraju

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';

import { useDispatch, useSelector } from 'react-redux';
import { imagePaths } from '../../constants/path';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Button from '../../components/Button';
import { loginUser } from '../../api/auth';
import { validateEmail, validatePassword } from '../../constants/helpers';
import styles from './styles';
import Loader from '../../components/Loader';
import { COLORS } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n/index1';
const Login = ({ navigation }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { authentiCation } = imagePaths;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Loading state
  const [pushtoken, setPushToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // State fo   r email validation
  const [emailValidation, setEmailValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  // State for password validation
  const [passwordValidation, setPasswordValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });
  useEffect(() => {
    //AsyncStorage.getItem('pushtoken')
    AsyncStorage.getItem('pushtoken').then((token) => {
      if (token) {
        setPushToken(JSON.stringify(token));
      }
    });
  }, []);

  const handleLoader = () => {
    setLoading(false);
  };

  //Inside the component where you handle login logic
  const handleLogin = async () => {
    // Validate email
    setEmailValidation({
      showErrorMessage: !email.trim(),
      errorMessage: 'Email cannot be empty',
    });

    // Validate password
    setPasswordValidation({
      showErrorMessage: !password.trim(),
      errorMessage: 'Password cannot be empty',
    });

    // If either email or password is empty, exit the function
    if (!email.trim() || !password.trim()) {
      return;
    }

    // Check for email validation error
    if (!validateEmail(email)) {
      setEmailValidation({
        showErrorMessage: true,
        errorMessage: 'Invalid email/mobile number',
      });
      return;
    }

    // Check for password validation error
    if (!validatePassword(password)) {
      setPasswordValidation({
        showErrorMessage: true,
        errorMessage:
          'Password must contain at least 8 different characters and can include letters, numbers, and special characters',
        // 'Password must be at least 8 characters with at least one number and one letter',
      });
      return;
    }
    setLoading(true);
    const reqPayload = {
      userIdentifier: email,
      password,
      killSession: false,
      deviceType: Platform.OS === 'android' ? 'android' : 'ios',
      deviceToken: pushtoken,
    };

    await loginUser({ data: reqPayload, navigation, dispatch, handleLoader });
    setLoading(false);
  };
  const onCheck = async (value) => {
    setChecked(value);
    if (value === true) {
      //user wants to be remembered.

      AsyncStorage.setItem('@email', email);
      AsyncStorage.setItem('@password', password);
    } else {
      try {
        await AsyncStorage.removeItem('@email');
        await AsyncStorage.removeItem('@password');
        setEmail('');
        setPassword('');
      } catch (error) {
        // Error removing
      }
    }
  };

  useEffect(() => {
    const getEmailAndPassword = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('@email');
        const storedPassword = await AsyncStorage.getItem('@password');
        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
          setChecked(true); // Set the checkbox to checked if values are found
        }
      } catch (error) {
        console.log('Error retrieving email and password:', error);
      }
    };

    getEmailAndPassword();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

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
            <ValidatedTextInput
              label='Email/Mobile Number'
              placeholder={t('emailtextinput')}
              value={email}
              onChangeText={setEmail}
              validation={emailValidation}
              iconName='mail-outline'
            />

            <ValidatedTextInput
              label='Password'
              placeholder={t('passwordtextinput')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              validation={passwordValidation}
              iconName='lock-closed-outline'
            />
            <View style={styles.middleView}>
              <View style={styles.middleLeftView}>
                {checked ? (
                  <TouchableOpacity
                    onPress={() => onCheck(false)}
                    style={styles.checkboxview}
                  >
                    <Image
                      source={require('../../../assets/images/check.png')}
                      style={styles.checkbox}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => onCheck(true)}
                    style={styles.checkboxview}
                  >
                    <Image
                      source={require('../../../assets/images/uncheck.png')}
                      style={styles.checkbox}
                    />
                  </TouchableOpacity>
                )}

                <Text style={styles.remembertext}>{t('rememberme')}</Text>
              </View>
              <TouchableOpacity
                style={{ flex: 0.5 }}
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}
              >
                <Text style={styles.forgotPasswordText}>
                  {t('forgotpassword')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={t('login')}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={handleLogin} // Call the function to handle login
            />

            {/* Register Page Navigation */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.createAccountText}>
                Don’t have an account?{' '}
                <Text style={styles.createAccountLink}>Create Account</Text>
              </Text>
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
        {/* Use the Loader component */}
        {loading && <Loader loading={loading} />}
      </View>
    </View>
  );
};

export default Login;
