import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const ProgressBarSection = ({ label, progress, color, backgroundColor }) => (
  <View style={styles.container}>
    <Text style={[styles.label, { color: color }]}>{label}</Text>
    <ProgressBar
      progress={progress}
      width={200}
      height={6}
      color={color}
      backgroundColor={backgroundColor}
    />
    <Text style={[styles.percent, { color: color }]}>{`${(
      progress * 100
    ).toFixed(0)}%`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: 'mulish-medium',
    fontWeight: '700',
    textAlign: 'left',
  },
  percent: {
    fontSize: 12,
    fontFamily: 'mulish-regular',
    fontWeight: '300',
    textAlign: 'left',
  },
});

export default ProgressBarSection;
