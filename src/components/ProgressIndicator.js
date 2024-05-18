import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { COLORS } from '../constants/colors';

const ProgressIndicator = (props) => {
  const { value } = props;
  const progressValue = value / 100;
  return (
    <Progress.Circle
      progress={progressValue}
      size={45}
      color={COLORS.coursesColor}
      unfilledColor={COLORS.tabBarLabelInactiveColor}
      borderColor={COLORS.tabBarLabelInactiveColor}
      showsText={true}
      formatText={() => `${Math.round(progressValue * 100)}%`}
      textStyle={{
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        textAlign: 'left',
      }}
    />
  );
};

export default ProgressIndicator;
