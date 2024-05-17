import React from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image } from 'react-native';

import Button from '../components/Button';
import { textContent } from '../constants/content';
import { imagePaths } from '../constants/path';
import styles from '../styles/onBoardStartedStyles';

const OnBoardStartedScreen = ({ navigation }) => {
  const { introductionTitle, introductionDescription, buttonLabels } =
    textContent;
  const { introImage, logos, onBoardStarted } = imagePaths;

  return (
    <ImageBackground source={introImage} style={styles.imageBackground}>
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            <Image source={logos.myProfessorPrimaryLogo} />
          </View>
          <View style={styles.primaryLogoContainer}>
            <View style={styles.primaryLogoView}>
              <Image source={onBoardStarted.profileImage} />
            </View>
          </View>
        </View>
        <View style={styles.getStartedButtonContainer}>
          <Text style={styles.introTitleText}>{introductionTitle}</Text>
          <Text style={styles.introDescriptionText}>
            {introductionDescription}
          </Text>
          <Button
            title={buttonLabels.getStarted}
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{
              width: 215,
              height: 55,
              borderRadius: 50,
              marginTop: 20,
              alignContent: 'center',
              justifyContent: 'center',
              // Add more button styles as needed
            }}
            textStyle={{
              // Add more text styles as needed
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              lineHeight: 20,
              color: 'white',
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnBoardStartedScreen;
