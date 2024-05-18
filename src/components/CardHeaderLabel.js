import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const CardHeaderLabel = ({ lHLabel, rHLabel, onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        marginHorizontal: 12,
      }}
    >
      <Text
        style={{
          fontFamily: 'mulish-bold',
          fontSize: 17,
          textAlign: 'left',
          fontWeight: '700',
          color: COLORS.appSecondaryColor,
        }}
      >
        {lHLabel}
      </Text>
      {/* You can wrap the "See All" text in a TouchableOpacity to make it tappable */}
      <TouchableOpacity onPress={() => onPress()}>
        <Text
          style={{
            color: COLORS.appSecondaryColor,
            textDecorationLine: 'underline',
            fontSize: 14,
            fontWeight: '600',
          }}
        >
          {rHLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardHeaderLabel;
