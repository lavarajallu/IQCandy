import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

const SubjectsList = (props) => {
  const { subjectsList, onSubjectClick } = props;
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
        const currentGradientColors =
          gradientColors[index % gradientColors.length] || []; // Provide a default empty array

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
                borderRadius: 4,
                borderWidth: isActive ? 4 : 1,
                padding: 0,
                borderColor: borderColor,
              }}
            >
              <ImageBackground
                style={{ flex: 1 }}
                source={{ uri: item.image ? item.image : null }}
              >
                {/* Subject Title Text */}
                <View style={styles.absview}>
                  <Text
                    style={{
                      color: COLORS?.whiteColor,
                      fontSize: 12,
                      textAlign: 'center',
                      fontFamily: 'mulish-bold',
                      padding: 4,
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        );
      }}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  absview: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});

export default SubjectsList;
