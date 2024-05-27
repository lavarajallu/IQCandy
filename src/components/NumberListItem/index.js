import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
const { width } = Dimensions.get('window');
const NumberedListItem = ({ number, text }) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <Text style={styles.listItemText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginVertical: 5,
    width: '90%',
  },
  numberCircle: {
    backgroundColor: COLORS.appSecondaryColor,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberText: {
    backgroundColor: COLORS.appSecondaryColor,
    padding: 5,
    borderRadius: 5,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listItemText: {
    marginLeft: 10,
    marginTop: 5,
    color: COLORS.tabBarLabelInactiveColor,
    fontFamily: 'mulish-medium',
  },
});

export default NumberedListItem;
