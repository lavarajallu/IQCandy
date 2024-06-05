import React, { useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import TopicsList from './TopicsList';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authManagement/selector';
import { selectMyCourses } from '../../store/student/myCourses/selector';
import { getTopics } from '../../api/myCourses';
import i18n from '../../i18n';

const MyTopics = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { chapterItem, subjectItem } = route.params;
  const { user } = useSelector(selectUser);
  const {
    topics,
    PreviousQuestionPaperByCount,
    GatePreviousQuestionPaperByCount,
  } = useSelector(selectMyCourses);

  useEffect(() => {
    if (user) {
      const payload = {
        subjectId: chapterItem?.subjectId,
        chapterId: chapterItem?.chapterId,
        boardId: user.userOrg.boardId,
        gradeId: user.userOrg.gradeId,
        offset: 0,
        limit: 1000,
      };

      getTopics({
        data: payload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  }, [user, chapterItem, dispatch]);

  const gotoActivity = (item) => {
    navigation.navigate('ActivityResources', {
      topicItem: item,
      chapterItem: chapterItem,
      subjectItem: subjectItem,
      from: 'topics',
      PreviousQuestionPaperByCount: PreviousQuestionPaperByCount,
    });
  };

  return (
    <>
      <DynamicHeader
        title={chapterItem?.chapterName}
        backAction={() => {
          if (route.params.from === 'search') {
            navigation.navigate('DrawerNavigation', {
              from: 'mychapters',
              navigation: navigation,
            });
          } else {
            navigation.navigate('MyChapters', { subjectItem: subjectItem });
          }
        }}
        imageSource={{ uri: chapterItem?.image }}
        labels={[topics?.items?.length + ' ' + i18n.t('topics')]}
      />

      <TopicsList
        navigation={navigation}
        data={topics?.items}
        PreviousQuestionPaperByCount={
          PreviousQuestionPaperByCount.length > 0
            ? PreviousQuestionPaperByCount
            : []
        }
        GatePreviousQuestionPaperByCount={
          GatePreviousQuestionPaperByCount.length > 0
            ? GatePreviousQuestionPaperByCount
            : []
        }
        onChange={(item) => gotoActivity(item)}
      />
    </>
  );
};

export default MyTopics;
