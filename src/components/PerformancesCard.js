import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import { COLORS } from '../constants/colors';
import { SHADOW_STYLES } from '../constants/helpers';

const { width, height } = Dimensions.get('window');

const PerformancesCard = ({
  cardTitle,
  size,
  minValue,
  maxValue,
  easeDuration,
  value,
  currentValueText,
  needleHeightRatio,
  ringWidth,
  needleTransitionDuration,
  needleTransition,
  needleColor,
  segmentColors,
  labelNoteStyle,
  labelsList,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{cardTitle}</Text>

     

      <RNSpeedometer
        size={size}
        minValue={0}
        maxValue={90}
        value={value ? value : 0}
        currentValueText="Score-o-meter"
        needleHeightRatio={0.7}
        ringWidth={80}
        needleTransitionDuration={3000}
        needleTransition="easeElastic"
        needleColor={COLORS.appSecondaryColor}
        segmentColors={[
          '#c44921',
          '#d88414',
          '#a3ba6d',
          '#016313',
        ]}
        labelNoteStyle={{ fontSize: 15 }}
        labels={[
          {
            name: 'Poor',
            labelColor: '#c44921',

            activeBarColor: '#c44921',
          },

          {
            name: 'Average',
            labelColor: '#d88414',
            activeBarColor: '#d88414',
          },
          {
            name: 'Good',
            labelColor: '#a3ba6d',
            activeBarColor: '#a3ba6d',
          },
          {
            name: 'Excellent',
            labelColor: '#016313',
            activeBarColor: '#016313',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.86, //width:332
    height: height * 0.29, //height:245
    top: 10,
    left: 14,
    borderRadius: 7,
    backgroundColor: COLORS.whiteColor,
    ...SHADOW_STYLES,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.coursesColor,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default PerformancesCard;
