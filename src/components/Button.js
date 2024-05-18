import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  colors = ['#6a5177', '#6a5177'],
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <LinearGradient colors={colors} style={[styles.button, style]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
    color: 'white',
  },
});

export default Button;
