// MainPage.js
//Created By Allu Lavaraju
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../i18n/index1';
import { CalendarPage, HomeScreen, SearchPage, ProfilePage } from '../screens';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../constants/colors';
import Notifications from '../screens/Notifications';

//import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 90 : 60,
    backgroundColor: COLORS.whiteColor,
  },
  tabBarActiveTintColor: COLORS.tabBarLabelActiveColor,
};

const BottomTabNavigation = ({ route }) => {
  const { t } = useTranslation(); //i18n instance

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{ tabBarActiveTintColor: COLORS.appSecondaryColor }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarLabel: t('home'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' size={size} color={color} />
          ),
          title: 'Home',
          headerTitleAlign: 'center', // Align title in the center
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        })}
      />

      <Tab.Screen
        name='Search'
        component={SearchPage}
        options={{
          headerShown: false,
          tabBarLabel: t('search'),
          tabBarIcon: ({ color, size }) => (
            <Icon name='search' size={size} color={color} />
          ),
          title: 'Search',
          headerTitleAlign: 'center', // Align title in the center
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        }}
      />

      <Tab.Screen
        name='Calendar'
        component={CalendarPage}
        options={{
          headerShown: false,
          tabBarLabel: t('calendar'),
          tabBarIcon: ({ color, size }) => (
            <Icon name='calendar' size={size} color={color} />
          ),
          title: 'Calendar',
          headerTitleAlign: 'center', // Align title in the center
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        }}
      />
      {/* Notifications commented at present */}
      {/* <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          headerShown: false,
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Icon name='bell' size={size} color={color} />
          ),
          title: 'Notifications',
          headerTitleAlign: 'center', // Align title in the center
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
