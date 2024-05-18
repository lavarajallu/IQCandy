import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS } from '../constants/colors';
import styles from '../styles/onboardStyles';
import { slides } from '../constants/config';
import { setUser } from '../store/authManagement/slice';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { selectUser } from '../store/authManagement/selector';
function OnboardingScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { user, loginthrought } = useSelector(selectUser);

  const [thisscreen, setthisscreen] = useState(false)
  const renderItem = ({ item, index }) => (
    <ImageBackground source={require('./../../assets/images/Logo.jpg')} style={styles.image}>
      {/* <View style={styles.logoContainer}>
        <Image source={item?.logo} />
      </View>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/Union.png')}
          style={styles.textContainer}
        >
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.text}>{item?.text}</Text>
        </ImageBackground>

        <TouchableOpacity
          style={styles.nextArrowView}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Image source={item?.nextArrow} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          marginBottom: Platform.OS === 'ios' ? 20 : 10,
          alignItems: 'center',
        }}
        onPress={() => {
          // Your onPress logic goes here
          console.log('Touchable pressed');
          navigation.navigate('Login');
        }}
      >
        <Text
          style={{
            color: COLORS.whiteColor,
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'mulish-regular',
          }}
        >
          Already have an account?{' '}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'mulish-bold',
              textDecorationLine: 'underline',
            }}
          >
            LOGIN
          </Text>
        </Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );

  const handleDone = () => {
    navigation.navigate('OnboardStarted');
  };

  const handleNextSlide = () => {
    // Move to the next slide by incrementing the current slide index
    const nextSlideIndex = currentSlideIndex + 1;

    // Check if there is a next slide to navigate to
    if (nextSlideIndex < slides.length) {
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const handleSlideChange = (index) => {
    // Update the state with the current slide index
    setCurrentSlideIndex(index);
  };

  const handleSkip = () => {
    navigation.navigate('Login');
    console.log('User skipped the onboarding.');
  };

  useEffect(() => {
    if(loginthrought){
    // alert("ifffff"+loginthrought)
    }else{
     // alert("elseeeeeee"+loginthrought)
      setTimeout(() => {
        getData();
      }, 7000);
    }
    
  }, [])
  getData = () => {
    if (user) {
      navigation.navigate('DrawerNavigation');

    } else {
      navigation.navigate('Login');

    }
  }

  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Image
      source={require('./../../assets/images/iq.gif')}
      style={{ width: 300, height: 300, alignSelf: 'center' }}
    />
  </View>
  );
}

export default OnboardingScreen;
