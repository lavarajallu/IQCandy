import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SHADOW_STYLES } from '../../constants/helpers';
const { width, height } = Dimensions.get('window');

const RankListItem = ({ item, user }) => (
  <View style={[styles.listItem, styles.shadowProp]}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Image
        source={
          item.profilePic
            ? {
                uri: item.profilePic,
              }
            : require('../../../assets/images/leaderBoard/avatar.jpeg')
        }
        style={styles.listItemImage}
      />
      <Text style={styles.listItemUsername}>
        {item.firstName ? item.firstName + ' ' + item.lastName : 'Test User'}
        {item.userId === user.userInfo.userId ? '(YOU)' : null}
      </Text>
    </View>
    <View style={styles.rankDetailsContainer}>
      <Text style={styles.listItemPoints}>{item.points}</Text>
      <Text style={styles.listItemRank}>0{item.rank}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: 47,
    width: width * 0.9,
    borderRadius: 7,
    backgroundColor: COLORS.whiteColor,
  },
  listItemImage: {
    width: 25,
    height: 25,
    left: 15,
    borderRadius: 25 / 2,
  },
  listItemUsername: {
    width: 107,
    // height: 15,
    left: 30,
  },
  listItemPoints: {
    height: 15,
  },
  listItemRank: {
    height: 15,
  },
  shadowProp: {
    ...SHADOW_STYLES,
  },
  rankDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default RankListItem;
