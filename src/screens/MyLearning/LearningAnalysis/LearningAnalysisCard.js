import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/colors';
import ProgressBarSection from '../../../components/ProgressBarSection';
import { SHADOW_STYLES } from '../../../constants/helpers';

const { width, height } = Dimensions.get('window');

const LearningAnalysisCard = (props) => {
  const { cardTitle, data } = props;
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{data.name}</Text>
      {/* Icons Row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 15,
          marginTop: 20,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/images/learningAnalysis/correct.png')}
          />
          <Text style={styles.iconLabel}>{'Correct'}</Text>
          <Text style={styles.iconValue}>
            {data.correctAnswer}/{data.totalQuestions}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/images/learningAnalysis/attempt.png')}
          />
          <Text style={styles.iconLabel}>{'Attempted'}</Text>
          <Text style={styles.iconValue}>{data.testAttempts}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/images/learningAnalysis/avgspeed.png')}
          />
          <Text style={styles.iconLabel}>{'Avg.Speed'}</Text>
          <Text style={styles.iconValue}>{data.avgQueTime}s</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <ProgressBarSection
        label='Easy'
        progress={Math.round(data.easy) / 100}
        color={'#88C506'}
        backgroundColor={'rgba(136, 197, 6, 0.17)'}
      />
      <ProgressBarSection
        label='Med'
        progress={Math.round(data.medium) / 100}
        color={'#087FD6'}
        backgroundColor={'rgba(8, 127, 214, 0.17)'}
      />

      <ProgressBarSection
        label='Hard'
        progress={Math.round(data.hard) / 100}
        color={'#DD2834'}
        backgroundColor={'#FEDCDE'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.86,
    paddingBottom: 10,
    top: 20,
    marginVertical: 10,
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

  iconLabel: {
    fontSize: 14,
    fontFamily: 'mulish-bold',
    color: COLORS.black,
    fontWeight: '700',
    top: 5,
  },

  iconValue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'mulish-bold',
    color: COLORS.lightGray,
  },
});

export default LearningAnalysisCard;
