import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { imagePaths } from '../constants/path';
import CircleProgressIndicator from './ProgressIndicator';
const { width, height } = Dimensions.get('window');

const LearningCard = (props) => {
  const { item, onChange } = props;
  const { learningCard } = imagePaths;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        onChange();
      }}
    >
      <View style={[styles.container, { backgroundColor: item?.color }]}>
        <Image
          source={item?.image_uri}
          resizeMode='contain'
          style={styles.learningTypeIcon}
        />
        <Text style={styles.cardTitle}>{item?.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  cardContainer: {
    flex: 1,
    width: width / 1.65,
    height: 80,
  },
  cardTitle: {
    color: COLORS.whiteColor,
    fontFamily: 'mulish-bold',
    fontSize: 16,
    textAlign: 'left',
  },
  learningTypeIcon: { height: 25, width: 25, tintColor: 'white' },
};

export default LearningCard;
