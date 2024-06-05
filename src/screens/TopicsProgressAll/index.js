//Post Assessment

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
//import Pdf from 'react-native-pdf';

import { goBack } from '../../utils/navigationUtils';
import { COLORS } from '../../constants/colors';
import Header from '../../components/Header';
import { selectUser } from '../../store/authManagement/selector';
import { selectMyTopicsProgress } from '../../store/student/myTopicProgress/selector';
import ItemSeparator from '../../components/ItemSeparator';
import CoursesCard from '../../components/CoursesCard';
import { getChapterDetails } from '../../api/search';
import { selectSearch } from '../../store/student/search/selector';
import i18n from '../../i18n';

const TopicsProgressAll = ({ route, navigation }) => {
  const { progressTopics } = useSelector(selectMyTopicsProgress);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState({});
  const { chapterDetails } = useSelector(selectSearch);

  const backAction = () => {
    goBack(navigation);
  };
  useEffect(() => {
    if (
      chapterDetails &&
      Object.keys(chapterDetails).length > 0 &&
      Object.keys(selectedItem).length > 0
    ) {
      navigation.navigate('ActivityResources', {
        topicItem: { ...selectedItem },
        chapterItem: chapterDetails,
        from: 'progresstopics',
      });
    }
  }, [chapterDetails]);

  const renderItem = ({ item }) => (
    <CoursesCard
      item={item}
      onChange={gotoChaptersPage}
      title={'topics'}
      fromscreen={'Fullsubjects'}
    />
  );
  const gotoChaptersPage = (item) => {
    setSelectedItem(item);
    getChapterDetails({
      dispatch,
      userId: user?.userInfo?.userId,
      universityId: user?.userOrg?.universityId,
      subjectId: item.subjectId,
      chapterId: item.chapterId,
      branchId: user?.userOrg?.branchId,
      semesterId: user?.userOrg?.semesterId,
    });
    // navigation.navigate('ActivityResources', {
    //   topicItem: item,
    //   chapterItem: chapterItem,
    //   subjectItem: subjectItem,
    //   from: 'topics',
    // });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header
        backAction={backAction}
        headerTitle={i18n.t('mytopicsinprogress')}
      />
      <View style={[styles.container, styles.shadowProp]}>
        <FlatList
          data={progressTopics}
          keyExtractor={(item) => item.idx}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2} // Set the number of columns to 2
        />
      </View>
    </SafeAreaView>
  );
};

export default TopicsProgressAll;

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
