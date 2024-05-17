import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import { goBack } from '../../../utils/navigationUtils';
import Header from '../../../components/Header';
import RankProfileCard from '../../../components/RankProfileCard';
import RankListItem from '../../../components/RankListItem';
import { COLORS } from '../../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

import {
  getLeaderBoardData,
  getRuleBookCriteria,
} from '../../../api/myLearning';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
import { selectUser } from '../../../store/authManagement/selector';

const LeaderBoard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [ruleVisible, setRuleVisible] = useState(false);
  const { leaderBoardData, rulBookCriteria } = useSelector(selectMyLearning);

  useEffect(() => {
    if (user) {
      getLeaderBoardData({
        dispatch,
        userId: user.userInfo.userId,
        universityId: user.userOrg.universityId,
        collegeId: user.userOrg.collegeId,
        role: user.role.roleName,
      });
    }
  }, [user]);

  useEffect(() => {
    getRuleBookCriteria({
      dispatch,
    });
  }, []);

  const backAction = () => {
    goBack(navigation);
  };

  const onRuleBook = () => {
    setRuleVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backAction={backAction}
        onRuleBook={() => onRuleBook()}
        headerTitle={'Leader Board'}
        rightIcon={true}
      />
      {leaderBoardData?.leaderBoard?.length > 0 ? (
        <>
          <View style={styles.rankContainer}>
            <RankProfileCard
              rank={2}
              imageSource={
                (leaderBoardData?.leaderBoard.slice(0, 3)[1]).profilePic
                  ? {
                      uri: leaderBoardData?.leaderBoard.slice(0, 3)[1]
                        .profilePic,
                    }
                  : require('../../../../assets/images/leaderBoard/avatar.jpeg')
              }
              points={leaderBoardData?.leaderBoard.slice(0, 3)[1].points}
              profileName={
                leaderBoardData?.leaderBoard.slice(0, 3)[1].firstName +
                ' ' +
                leaderBoardData?.leaderBoard.slice(0, 3)[1].lastName
              }
              userId={
                leaderBoardData?.leaderBoard.slice(0, 3)[1].userId ===
                user.userInfo.userId
                  ? '(YOU)'
                  : null
              }
            />
            <RankProfileCard
              rank={1}
              imageSource={
                (leaderBoardData?.leaderBoard.slice(0, 3)[0]).profilePic
                  ? {
                      uri: leaderBoardData?.leaderBoard.slice(0, 3)[0]
                        .profilePic,
                    }
                  : require('../../../../assets/images/leaderBoard/avatar.jpeg')
              }
              userId={
                leaderBoardData?.leaderBoard.slice(0, 3)[0].userId ===
                user.userInfo.userId
                  ? '(YOU)'
                  : null
              }
              points={leaderBoardData?.leaderBoard.slice(0, 3)[0].points}
              profileName={
                leaderBoardData?.leaderBoard.slice(0, 3)[0].firstName +
                ' ' +
                leaderBoardData?.leaderBoard.slice(0, 3)[0].lastName
              }
              crownIconSource={require('../../../../assets/images/leaderBoard/crown.png')}
            />
            <RankProfileCard
              rank={3}
              imageSource={
                (leaderBoardData?.leaderBoard.slice(0, 3)[2]).profilePic
                  ? {
                      uri: leaderBoardData?.leaderBoard.slice(0, 3)[2]
                        .profilePic,
                    }
                  : require('../../../../assets/images/leaderBoard/avatar.jpeg')
              }
              userId={
                leaderBoardData?.leaderBoard.slice(0, 3)[2].userId ===
                user.userInfo.userId
                  ? '(YOU)'
                  : null
              }
              points={leaderBoardData?.leaderBoard.slice(0, 3)[2].points}
              profileName={
                leaderBoardData?.leaderBoard.slice(0, 3)[2].firstName +
                ' ' +
                leaderBoardData?.leaderBoard.slice(0, 3)[2].lastName
              }
            />
          </View>

          <View style={[styles.flatListContainer, styles.shadowProp]}>
            <View style={styles.listHeaderView}>
              <Text style={styles.listHeaderText}>UserName</Text>
              <Text style={styles.listHeaderText}>Points</Text>
              <Text style={styles.listHeaderText}>Rank</Text>
            </View>
            <FlatList
              data={leaderBoardData?.leaderBoard}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RankListItem item={item} user={user} />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      ) : (
        <View style={[styles.loadingView, { backgroundColor: 'white' }]}>
          <Text>Loading..</Text>
        </View>
      )}
      {rulBookCriteria ? (
        <Modal isVisible={ruleVisible}>
          <View style={styles.modalMainView}>
            <View style={styles.modalsubview}>
              <View style={styles.modaltopview}>
                <Text style={styles.modalheadtext}>Rule Book</Text>
                <TouchableOpacity onPress={() => setRuleVisible(false)}>
                  <Image
                    source={require('../../../../assets/images/cancel.png')}
                    style={styles.modalcancelimage}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: 'white' }}>
                {rulBookCriteria && rulBookCriteria.length > 0 ? (
                  <ScrollView>
                    {rulBookCriteria?.map((res, i) => (
                      <View key={i} style={styles.modallistview}>
                        <View style={styles.modalsublistview}>
                          <View style={styles.modallistleftview}>
                            <Text style={styles.modallistlefttext}>
                              {res?.description}
                            </Text>
                          </View>
                          <View style={styles.modallistrightview}>
                            <View style={styles.modallistbutton}>
                              <Text
                                style={styles.modalpointstext}
                              >{`${res?.points} pts`}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <View style={styles.loadingView}>
                    <Text>No data</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appSecondaryColor,
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  flatListContainer: {
    flex: 0.95,
    marginHorizontal: 10,
    borderRadius: 4,
    marginVertical: 10,
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  listHeaderView: {
    width: width * 0.98,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 12,
  },
  listHeaderText: {
    fontFamily: 'mulish-bold',
    fontSize: 14,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalsubview: {
    width: width / 1.2,
    height: height / 1.5,
    backgroundColor: 'white',
    marginVertical: 15,
  },
  modaltopview: {
    paddingVertical: 20,
    backgroundColor: COLORS.appSecondaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  modalheadtext: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  modalcancelimage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  modallistview: {
    padding: 20,
    margin: 10,
    flexDirection: 'row',
  },
  modalsublistview: {
    flex: 1,
    flexDirection: 'row',
  },
  modallistleftview: {
    flex: 0.7,
    justifyContent: 'center',
  },
  modallistlefttext: {
    color: COLORS.appSecondaryColor,
    fontSize: 12,
  },
  modallistrightview: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modallistbutton: {
    backgroundColor: COLORS.appSecondaryColor,
    width: 70,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalpointstext: {
    color: 'white',
    fontSize: 12,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LeaderBoard;
