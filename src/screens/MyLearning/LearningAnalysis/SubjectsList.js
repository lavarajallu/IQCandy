import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

const SubjectsList = (props) => {
  const { subjectsList, onSubjectClick } = props;
  console.log('subjectsList', subjectsList);
  const [activeIndex, setActiveIndex] = useState(0);
  const gradientColors = [
    ['#86D4F6', '#C4EDFF'],
    ['#E4FFC3', '#C6EF94'],
    ['#FEDCBD', '#EBA463'],
  ];

  const images = [
    require('../../../../assets/images/learningAnalysis/learningAnalysis01.png'),
    require('../../../../assets/images/learningAnalysis/learningAnalysis2.png'),
    require('../../../../assets/images/learningAnalysis/learningAnalysis3.png'),
  ];

  const handleCardPress = (index) => {
    setActiveIndex(index);
    onSubjectClick(index);
  };

  const backgroundColors = ['#86D4F6', '#E4FFC3', '#FEDCBD'];

  const repeatedBackgroundColors = Array.from(
    { length: subjectsList.length },
    (_, index) => backgroundColors[index % backgroundColors.length]
  );

  const calculateCardStyles = (index) => ({
    marginLeft: index === 0 ? 8 : 0,
    marginRight: 0,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor:
      activeIndex === index
        ? COLORS.primary
        : gradientColors[index]?.[0] || 'transparent',
  });

  return (
    <FlatList
      data={subjectsList}
      keyExtractor={(item) => item.subjectId}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item, index }) => {
        const isActive = index === activeIndex;
        const cardStyles = calculateCardStyles(index);
        const currentGradientColors =
          gradientColors[index % gradientColors.length] || []; // Provide a default empty array
        const currentBackgroundColor = repeatedBackgroundColors[index];

        const borderColor = isActive
          ? COLORS.appSecondaryColor
          : currentGradientColors.length > 0
          ? currentGradientColors[0]
          : undefined;

        return (
          <TouchableOpacity onPress={() => handleCardPress(index)}>
            <View
              style={{
                width: 120,
                height: 120,
                marginLeft: index === 0 ? 8 : 0,
                marginRight: 8,
                borderRadius: 10,
                borderWidth: 2,
                padding: 2,
                borderColor: borderColor,
              }}
            >
              <LinearGradient
                colors={currentGradientColors}
                style={{ flex: 1, borderRadius: 10 }}
              >
                {/* Icon */}
                <View
                  style={{
                    width: 52,
                    height: 52,
                    backgroundColor: currentBackgroundColor,
                    borderRadius: 26,
                    alignSelf: 'center',
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{ uri: item.image ? item.image : null }}
                    style={{ width: 52, height: 52, borderRadius: 26 }}
                  />
                </View>

                {/* Subject Title Text */}
                <Text
                  style={{
                    color: COLORS?.black,
                    fontSize: 12,
                    textAlign: 'center',
                    fontWeight: '500',
                    fontFamily: 'mulish-regular',
                    marginTop: 20,
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </LinearGradient>
              {isActive && (
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: COLORS.primary,
                    alignSelf: 'center',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      }}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
};

export default SubjectsList;
