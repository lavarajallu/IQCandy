import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
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
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
function OnboardingScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { user, loginthrought } = useSelector(selectUser);

  const [thisscreen, setthisscreen] = useState(false)


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
      source={require('./../../assets/images/iqcandygif.gif')}
      style={{ width: windowWidth, height: windowHeight, }}
    />
  </View>
  );
}

export default OnboardingScreen;
