//Post Assessment
import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import { textContent } from '../../../constants/content';
import ItemSeparator from '../../../components/ItemSeparator';
import ParcticeCard from '../../../components/PracticeCard';

import { getAssessmentSubjects } from '../../../api/myLearning';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
import { selectUser } from '../../../store/authManagement/selector';

const MyPractice = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { subjectsInfo } = useSelector(selectMyLearning);

  useEffect(() => {
    if (user) {
      const payload = {
        universityId: user.userOrg.universityId,
        branchId: user.userOrg.branchId,
        semesterId: user.userOrg.semesterId,
      };
      getAssessmentSubjects({
        data: payload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  }, [user]);

  const backAction = () => {
    goBack(navigation);
  };

  const gotoChaptersPage = (item) => {
    navigation.navigate('MyPracticeChapters', { subjectItem: item });
  };

  const renderItem = ({ item }) => (
    <ParcticeCard item={item} onChange={() => gotoChaptersPage(item)} />
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'My Practice'} />
      <View style={[styles.container, styles.shadowProp]}>
        <FlatList
          data={subjectsInfo?.items}
          keyExtractor={(item) => item.idx}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2} // Set the number of columns to 2
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPractice;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  container: {
    flex: 0.85,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.whiteColor,
    borderRadius: 4,
    marginVertical: 10,
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
