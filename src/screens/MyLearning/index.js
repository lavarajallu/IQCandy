import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LearningCard from '../../components/LearningCard';
import Swiper from 'react-native-swiper'
import { COLORS } from '../../constants/colors';

import CardHeaderLabel from '../../components/CardHeaderLabel';

import { textContent } from '../../constants/content';
import ItemSeparator from '../../components/ItemSeparator';
const window = Dimensions.get("window");

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

  const learningRenderItem = (item) => (
    <View style={{ height: 150, justifyContent: "center", alignItems: "center", marginVertical: 10, backgroundColor: "red" }}>
      <LearningCard
        item={item}
        onChange={() => {
          gotoLearningType(item);
        }}
      /></View>
  );

 
  return (
    <>
      <CardHeaderLabel
        lHLabel={'My Learning'}
      // rHLabel={'See All'}
      /// onPress={seeAll}
      />
      <Swiper
        style={styles.wrapper}
        dotColor={"grey"}
        dot={
          <View
            style={{
              backgroundColor: 'grey',
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 18,

            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: COLORS.appSecondaryColor,
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 18,
            }}
          />
        }

        showsButtons={false}>
        {learningData?.map((res, index) => {
          return (
            <View style={{ height: 170, justifyContent: "center", alignItems: "center", }}>
              <LearningCard
                item={res}
                onChange={() => {
                  gotoLearningType(res);
                }}
              />
            </View>

          )
        })}

      </Swiper>
      {/* <FlatList
        data={learningData}
        keyExtractor={(item) => item?.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={learningRenderItem}
        ItemSeparatorComponent={ItemSeparator}
      /> */}
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: { height: 230, },

})
export default MyLearning;
