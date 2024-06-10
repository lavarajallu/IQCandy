//My Courses.js

import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import CardHeaderLabel from '../../components/CardHeaderLabel';
import CoursesCard from '../../components/CoursesCard';

import ItemSeparator from '../../components/ItemSeparator';
import { selectMyTopicsProgress } from '../../store/student/myTopicProgress/selector';
import { selectSearch } from '../../store/student/search/selector';
import i18n from '../../i18n/index1';

import { getTopicsProgress } from '../../api/myTopicsInProgress';
import { selectUser } from '../../store/authManagement/selector';
import { getTopicDetails, getChapterDetails } from '../../api/search';
import { useTranslation } from 'react-i18next';

const TopicsInProgress = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { progressTopics } = useSelector(selectMyTopicsProgress);
  const { lhTitle } = props;
  const navigation = useNavigation();
  const { topicDetails, chapterDetails } = useSelector(selectSearch);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      const reqPayload = {
        universityId: user?.userOrg?.universityId,
        branchId: user?.userOrg?.branchId,
        semesterId: user?.userOrg?.semesterId,
        offset: 0,
        limit: 1000,
      };

      getTopicsProgress({
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  });
  useEffect(() => {}, [progressTopics]);
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
  };
  useEffect(() => {
    if (selectedItem) {
      if (chapterDetails && Object.keys(chapterDetails).length > 0) {
        setSelectedItem(null);
        navigation.navigate('ActivityResources', {
          topicItem: { ...selectedItem },
          chapterItem: chapterDetails,

          from: 'progresstopics',
        });
      }
    }
  }, [chapterDetails]);

  const renderItem = ({ item }) => (
    <CoursesCard
      item={item}
      onChange={() => gotoChaptersPage(item)}
      title={'topics'}
      fromscreen={'progresstopics'}
    />
  );

  const seeAll = () => {
    navigation.navigate('TopicsProgressAll');
  };

  return (
    <>
      <CardHeaderLabel
        lHLabel={t('mytopicsinprogress')}
        rHLabel={t('seeall')}
        onPress={seeAll}
      />
      {progressTopics?.length > 0 ? (
        <FlatList
          data={progressTopics}
          keyExtractor={(item) => item.topicId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>{t('nodata')}</Text>
        </View>
      )}
    </>
  );
};

export default TopicsInProgress;
