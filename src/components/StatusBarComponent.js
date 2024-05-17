import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { COLORS } from '../constants/colors';

// here, we add the spacing for iOS
// and pass the rest of the props to React Native's StatusBar

const StatusBarComponent = (props) => {
  return (
    <StatusBar
      hidden={Platform.OS === 'android' ? true : false}
      backgroundColor={COLORS.appSecondaryColor} // Set the status bar background color to transparent
      translucent // Make the status bar translucent
    />
  );
};

export default StatusBarComponent;
