import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { SHADOW_STYLES } from '../constants/helpers';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const AttemptsAnalysisCard = ({
  title,
  data1,
  data2,
  backgroundColor1,
  backgroundColor2,

  testResult,
}) => {
  const { t } = useTranslation(); //i18n instance

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.rowContainer}>
        {renderBox(
          testResult.correctAnsCount ? testResult.correctAnsCount : 0,
          backgroundColor1,
          [
            testResult?.lighteningCount
              ? t('lightiningfast') + ': ' + testResult?.lighteningCount
              : t('lightiningfast') + ': ' + 0,
            testResult?.shotCount
              ? t('whatatimeshot') + ': ' + testResult?.shotCount
              : t('whatatimeshot') + ': ' + 0,
            testResult?.extraInningCount
              ? t('extrainnings') + ': ' + testResult?.extraInningCount
              : t('extrainnings') + ': ' + 0,
          ]
        )}
        {renderBox(
          testResult.wrongAnsCount ? testResult.wrongAnsCount : 0,
          backgroundColor2,
          [
            testResult?.lostCount
              ? 'Lost: ' + testResult?.lostCount
              : 'Lost: ' + 0,
            testResult?.extraCount
              ? 'Extra Time: ' + testResult?.extraCount
              : 'Extra Time: ' + 0,
            testResult?.unAnsCount
              ? 'Un Answered: ' + testResult?.unAnsCount
              : 'Un Answered: ' + 0,
          ]
        )}
      </View>
    </View>
  );
};

const renderBox = (data, backgroundColor, infoTexts) => (
  <View style={styles.box}>
    <View style={[styles.circle, { backgroundColor }]}>
      <Text style={styles.viewText}>{data}</Text>
    </View>
    {infoTexts?.map((text, index) => (
      <Text key={index} style={styles.viewInfoText} numberOfLines={1}>
        {text}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.86,
    height: height * 0.26,
    top: 20,
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  box: {
    width: width * 0.39,
    height: height * 0.19,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //elevation: 5,
    // ...SHADOW_STYLES,
  },
  circle: {
    width: width * 0.15,
    height: height * 0.068, //height:60
    borderRadius: 8,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    textAlign: 'center',
    color: COLORS.whiteColor,
  },
  viewInfoText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    textAlign: 'left',
    color: COLORS.black,
  },
});

export default AttemptsAnalysisCard;
