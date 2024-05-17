import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import NumberedListItem from '../../components/NumberListItem';
import { SHADOW_STYLES, upperCaseText } from '../../constants/helpers';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const Instructions = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Referral Point Instructions</Text>
      </View>

      <NumberedListItem
        number='1'
        text='For every successful referral, the user will get 100 points. Each point is a Rupee.'
      />
      <NumberedListItem
        number='2'
        text='To redeem, the user should have a minimum of 500 points.'
      />
      <NumberedListItem number='3' text='Keep sharing to earn more points.' />

      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
          {upperCaseText(
            `Remember to tell your friends and family about the benests of the west and any special promotions that are curently avaliable and hick.`
          )}
        </Text>
      </View>

      <View style={styles.instructionsImage}>
        <Image source={require('../../../assets/images/Refer/tab1.png')}/>
      </View>
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#DEFCFF',
    width: "100%",
    borderRadius: 8,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
    ...SHADOW_STYLES,
  },
  cardText: {
    fontFamily: 'mulish-bold',
    fontWeight: '800',
    textAlign: 'justify',
    fontSize: 13,
    color: COLORS.coursesColor,
  },
  buttonContainer: {
    width:"100%",
    height: 38,
    backgroundColor: COLORS.coursesColor,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: COLORS.whiteColor,
    textAlign: 'center',
    fontFamily: 'mulish-bold',
    fontWeight: '800',
    fontSize: 15,
  },
  instructionsImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});
