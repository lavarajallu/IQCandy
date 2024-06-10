import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LearningCard from '../../components/LearningCard';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../constants/colors';
import i18n from '../../i18n/index1';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/authManagement/selector';

import CardHeaderLabel from '../../components/CardHeaderLabel';
import { getTopicsProgress } from '../../api/myTopicsInProgress';

import { textContent } from '../../constants/content';
import ItemSeparator from '../../components/ItemSeparator';
import { useTranslation } from 'react-i18next';

import { selectMyTopicsProgress } from '../../store/student/myTopicProgress/selector';

import { navigateToScreen } from '../../utils/myLearningUtils';
const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;
const MyLearning = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { progressTopics } = useSelector(selectMyTopicsProgress);
  const { t } = useTranslation();

  const [learningdata, setlearningdata] = useState('');
  const { learningData } = textContent;
  useEffect(() => {
    setlearningdata(learningData);
    getTopicsProgress({
      dispatch,
      userId: user?.userInfo?.userId,
    });
  });
  useEffect(() => {}, [progressTopics]);

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
      <CardHeaderLabel lHLabel={t('mylearning')} />

      <FlatList
        data={learningdata}
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
