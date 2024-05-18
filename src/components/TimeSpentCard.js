import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import TimeSpentChart from './TimeSpentChart';
import { SHADOW_STYLES } from '../constants/helpers';

const { width, height } = Dimensions.get('window');

const TimeSpentCard = ({ cardTitle, testResult }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{cardTitle}</Text>
      <TimeSpentChart testResult={testResult.questions} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.86, //width:332
    //  height: height * 0.29, //height:245
    top: 30,
    paddingBottom: 20,
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

export default TimeSpentCard;
