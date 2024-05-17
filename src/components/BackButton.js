import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';

const BackButton = (props) => {
  const { backAction, type } = props;
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={backAction}>
        <IonIcon name={type ? type : 'chevron-back'} size={20} color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    height: 32,
    width: 32,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    // position: 'absolute',
    left: 15,
    // zIndex: 1,
    top: 10,
    backgroundColor: COLORS.whiteColor,
  },
});
