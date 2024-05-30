import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LearningCard from '../../components/LearningCard';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../constants/colors';

import CardHeaderLabel from '../../components/CardHeaderLabel';

import { textContent } from '../../constants/content';
import ItemSeparator from '../../components/ItemSeparator';
const window = Dimensions.get('window');

import { navigateToScreen } from '../../utils/myLearningUtils';
const PAGE_WIDTH = window.width;
const MyLearning = () => {
  const navigation = useNavigation();
  const { learningData } = textContent;

  const gotoLearningType = (item) => {
    if (item?.type) {
      const screenName = navigateToScreen(item.type);
      if (screenName) {
        navigation.navigate(screenName);
      } else {
        console.error(`Unknown screen type: ${item.type}`);
      }
    }
  };

  const learningRenderItem = ({ item }) => (
    <LearningCard
      item={item}
      onChange={() => {
        gotoLearningType(item);
      }}
    />
  );

  return (
    <>
      <CardHeaderLabel lHLabel={'My Learning'} />

      <FlatList
        data={learningData}
        keyExtractor={(item) => item?.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={learningRenderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: { height: 230 },
});
export default MyLearning;
