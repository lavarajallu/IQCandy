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
        minValue={minValue}
        maxValue={maxValue}
        easeDuration={easeDuration}
        value={value ? value : 0}
        currentValueText={currentValueText}
        needleHeightRatio={needleHeightRatio}
        ringWidth={ringWidth}
        needleTransitionDuration={needleTransitionDuration}
        needleTransition={needleTransition}
        needleColor={needleColor}
        segmentColors={segmentColors}
        labelNoteStyle={labelNoteStyle}
        labels={labelsList}
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
