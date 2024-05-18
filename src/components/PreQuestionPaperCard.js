import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import { imagePaths } from '../constants/path';

const PreQuestionPaperCard = (props) => {
  const { item, onPress } = props;
  const { previousQuesionPapers } = imagePaths;

  const goForward = (item) => {
    onPress(item);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => goForward(item)}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={previousQuesionPapers?.videoIcon} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.questionPaperTitle}</Text>
        </View>

        <View style={[styles.imageContainer, styles.outlineCircle]}>
          <IonIcon
            name='arrow-forward-outline'
            size={24}
            color={COLORS.appSecondaryColor}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 5, // Add elevation for shadow on Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 5,
  },

  imageContainer: {
    flex: 0.15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.mediumGray, // Set your
  },
  textContainer: {
    flex: 0.7,
    marginLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'left',
    fontFamily: 'mulish-bold',
    fontWeight: '600',
    color: COLORS.black,
    fontSize: 14, // Adjust font size as needed
  },
  smallText: {
    textAlign: 'left',
    fontFamily: 'mulish-regular',
    fontWeight: '600',
    color: COLORS.lightGray,
    fontSize: 12,
    marginTop: 4,
  },
  outlineCircle: {
    backgroundColor: COLORS.mediumGray,
    borderRadius: 8,
    height: 36,
    width: 36,
  },
});

export default PreQuestionPaperCard;
