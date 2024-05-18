import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
const { width, height } = Dimensions.get('window');

const RankProfileCard = ({
  rank,
  imageSource,
  points,
  profileName,
  crownIconSource,
  userId,
}) => {
  const middleProfileContainerStyle = crownIconSource
    ? { top: -(height * 0.015) } // Adjust the multiplier as needed
    : {};

  return (
    <View style={[styles.profileContainer, middleProfileContainerStyle]}>
      <Text style={styles.rankText}>{rank}</Text>
      {crownIconSource && (
        <Image source={crownIconSource} style={styles.crownIcon} />
      )}
      <Image
        source={imageSource}
        style={!crownIconSource ? styles.profileImage : styles.rankProfileImage}
      />

      <Text style={!crownIconSource ? styles.points : styles.rankPoints}>
        {points} points
      </Text>
      <Text
        style={!crownIconSource ? styles.profileName : styles.rankProfileName}
        numberOfLines={2}
      >
        {profileName}
        {'\n'}
        {userId ? userId : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rankText: {
    fontFamily: 'mulish-bold',
    fontSize: 16,
    color: COLORS.whiteColor,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  rankProfileImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  crownIcon: {
    width: 24,
    height: 24,
  },
  profileName: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'mulish-medium',
    color: COLORS.whiteColor,
  },
  points: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  rankPoints: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  rankProfileName: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',

    fontFamily: 'mulish-medium',
    color: COLORS.whiteColor,
  },
});

export default RankProfileCard;
