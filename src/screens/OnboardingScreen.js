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
import i18n from './../i18n';
import { selectUser } from '../store/authManagement/selector';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
function OnboardingScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { user, loginthrought } = useSelector(selectUser);
  const [viewlanguage, setviewlanguage] = useState(false);
  const [thisscreen, setthisscreen] = useState(false);

  useEffect(() => {
    if (loginthrought) {
    } else {
      setTimeout(() => {
        getData();
      }, 7000);
    }
  }, []);
  getData = () => {
    if (user) {
      navigation.navigate('DrawerNavigation');
    } else {
      setviewlanguage(true);
      //navigation.navigate('Login');
    }
  };

  const onLanguage = async (value) => {
    i18n.locale = value;
    await AsyncStorage.setItem('@localevalue', value);
    navigation.navigate('Login');
  };

  return viewlanguage ? (
    <>
      <ImageBackground
        source={require('./../../assets/images/Mobile_bg_1.png')}
        style={{ width: '100%', height: '100%', opacity: 0.5 }}
      />
      <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../../assets/images/iqlogo.png')}
            style={{ width: 1048 / 10, height: 1048 / 10, alignSelf: 'center' }}
          />
          <TouchableOpacity
            onPress={() => onLanguage('en')}
            style={{
              height: 50,
              paddingHorizontal: 10,
              backgroundColor: COLORS.appSecondaryColor,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Text style={{ color: 'white' }}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onLanguage('th')}
            style={{
              height: 50,
              paddingHorizontal: 10,
              backgroundColor: COLORS.appSecondaryColor,
              width: 100,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>Thai</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('./../../assets/images/iqcandygif.gif')}
        style={{ width: windowWidth, height: windowHeight }}
      />
    </View>
  );
}

export default OnboardingScreen;
