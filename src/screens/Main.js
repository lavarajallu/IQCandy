// MainPage.js
//Created By Allu Lavaraju
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarPage';
import SearchScreen from './SearchPage';
import ProfilePage from './ProfilePage';

import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: COLORS.tabBarLabelActiveColor,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Home',

          tabBarIcon: ({ color, size }) => (
            <Icon name='home' size={size} color={color} />
          ),
          title: 'My Professor',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.tabBarLabelActiveColor, // Set your desired background color here
          },
          headerTitleStyle: {
            color: '#ffff', // Set your desired title color here
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => console.log('WelcomeMenu', 'Operations menu')}
              style={{ marginLeft: 10 }}
            >
              <IonIcon name='menu' size={24} color='white' />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log('Notifications')}
              style={{ marginRight: 10 }}
            >
              <IonIcon name='notifications' size={24} color='white' />
            </TouchableOpacity>
          ),
        })}
      />

      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name='search' size={size} color={color} />
          ),
          title: 'Search',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.tabBarLabelActiveColor, // Set your desired background color here
          },
          headerTitleStyle: {
            color: '#ffff', // Set your desired title color here
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfilePage}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name='user' size={size} color={color} />
          ),
          title: 'Profile',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.tabBarLabelActiveColor, // Set your desired background color here
          },
          headerTitleStyle: {
            color: '#ffff', // Set your desired title color here
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        }}
      />
      <Tab.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Icon name='calendar' size={size} color={color} />
          ),
          title: 'Calendar',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.tabBarLabelActiveColor, // Set your desired background color here
          },
          headerTitleStyle: {
            color: '#ffff', // Set your desired title color here
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
