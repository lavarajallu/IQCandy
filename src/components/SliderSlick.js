import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SliderSlick = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 5000,
  //     useNativeDriver: true,
  //   }).start();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/dashboardrect.png')}
        style={{
          width: windowWidth,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ImageBackground
          source={require('../../assets/images/dashboardimg.png')}
          style={{
            width: 170,
            height: 170,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/leaderBoard/avatar.jpeg')}
            style={{ width: 130, height: 130, borderRadius: 130 / 2 }}
          />
        </ImageBackground>
      </ImageBackground>
      <Animated.View
        style={{
          opacity: fadeAnim,
          height: 50,
          width: 100,
          backgroundColor: 'red',
          position: 'absolute',
        }}
      />
      <View
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'red',
          position: 'absolute',
          alignSelf: 'flex-end',
        }}
      />
      <View
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'red',
          position: 'absolute',
          top: 100,
        }}
      />
      <View
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'red',
          position: 'absolute',
          alignSelf: 'flex-end',
          top: 100,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default SliderSlick;
