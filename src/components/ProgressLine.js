import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../constants/colors';

const ProgressLine = ({ progressPercentage, lineHeight }) => {
  const dynamicWidth = progressPercentage ? `${progressPercentage}%` : '100%';

  const remainingWidth = progressPercentage
    ? `${100 - parseFloat(dynamicWidth)}%`
    : '0%';

  return (
    <View
      style={{
        height: lineHeight ? lineHeight : 1.5,
        width: '96%',
        backgroundColor: COLORS.lightGray, // Default background color for the entire progress line
        overflow: 'hidden',
        marginVertical: 4,
      }}
    >
      <View
        style={{
          height: '100%',
          width: dynamicWidth,
          borderWidth: 1,
          borderColor:
            progressPercentage === 0
              ? 'lightgrey'
              : progressPercentage > 80
              ? 'green'
              : progressPercentage < 50
              ? 'red'
              : 'orange',
          backgroundColor: COLORS.appSecondaryColor, // Color for the filled portion
        }}
      />
      <View
        style={{
          height: '100%',
          width: remainingWidth, // Use the calculated remaining width
          backgroundColor: COLORS.lightGray, // Color for the unfilled portion
        }}
      />
    </View>
  );
};

export default ProgressLine;
