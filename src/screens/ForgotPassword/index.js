// Login.js created by Allu Lavaraju

import React, { useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { imagePaths } from '../../constants/path';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Button from '../../components/Button';
import { forgotPassword } from '../../api/auth';
import styles from './styles';

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { authentiCation } = imagePaths;
  const [emailorPhoneValue, setEmailorPhoneValue] = useState('');

  //Inside the component where you handle login logic
  const handleForgotPassword = async () => {
    if (emailorPhoneValue === '' || emailorPhoneValue === null) {
      Alert.alert('IQ Candy', 'Please enter Email or Phone');
    } else {
      let payload = {
        emailOrMobile: emailorPhoneValue,
      };
      await forgotPassword({
        data: payload,
        dispatch,
        navigation,
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
              Please Enter your{' '}
              <Text style={styles.createAccountLink}>Email / Phone</Text>
            </Text>
            <ValidatedTextInput
              label='EmailorPhone'
              placeholder='Enter your Email or Phone'
              value={emailorPhoneValue}
              onChangeText={setEmailorPhoneValue}
              keyboardType={'default'}
              inputMode='text'
              validation={''}
              iconName='mail-outline'
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={'SUBMIT'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={handleForgotPassword} // Call the function to handle login
            />

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

export default ForgotPassword;
