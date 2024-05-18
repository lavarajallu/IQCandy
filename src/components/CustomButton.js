import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const CustomButton = ({ title, onPress, disabled, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: COLORS.whiteColor, // Customize the text color
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'mulish-bold',
  },
});

export default CustomButton;
