//KnowledgeMapList.js

import { Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import ItemSeparator from '../../../components/ItemSeparator';
import { COLORS } from '../../../constants/colors';
import { _ } from 'lodash';

const KnowledgeMapList = (props) => {
  const { gotoActivity, data, heatMapData, sortOrderKnowledgeMapData } = props;
  const colorObjects = COLORS.colorObjects;
  const checkActivity = (item) => {
    gotoActivity(item);
  };

  const renderItem = ({ item }) => {
    const progressTopicInfo = heatMapData?.find(
      (topic) => topic?.topicId === item?.topicId
    );

    const getColorStyles = (score) => {
      if (score >= 80) return colorObjects.high;
      if (score >= 60 && score < 80) return colorObjects.medium;
      if (score >= 40 && score <= 60) return colorObjects.low;
      return colorObjects.veryLow;
    };

    const { text: textStatusColor, background: bgStatusColor } =
      progressTopicInfo
        ? getColorStyles(progressTopicInfo?.score)
        : colorObjects?.default;

    return (
      <TouchableOpacity
        style={[
          styles.cardContainer,
          styles.shadowProp,
          { backgroundColor: bgStatusColor },
        ]}
        onPress={() => checkActivity(item)}
      >
        <Text
          numberOfLines={3}
          style={[styles.cardTitle, { color: 'white' }]}
        >
          {item?.topicName || 'Test Topic'}
        </Text>
        <Text style={[styles.cardPercentage, { color: 'white' }]}>
          {`${progressTopicInfo?.score | 0}%`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={sortOrderKnowledgeMapData}
        keyExtractor={(item) => item.topicId}
        numColumns={2}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default KnowledgeMapList;
