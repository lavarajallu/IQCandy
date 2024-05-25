import React, { useEffect } from 'react';
import { View } from 'react-native';
import DynamicHeader from '../../components/DynamicHeader';
import { goBack } from '../../utils/navigationUtils';
import { imagePaths } from '../../constants/path';
import { textContent } from '../../constants/content';
import TopicsList from './TopicsList';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authManagement/selector';
import { selectMyCourses } from '../../store/student/myCourses/selector';
import {
  getTopics,
  getPreviousQuestionPaperByCount,
  getGatePreviousQuestionPaperCountByTopic
} from '../../api/myCourses';

const MyTopics = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { chapterItem, subjectItem } = route.params;
  const { user } = useSelector(selectUser);
  const { topics, PreviousQuestionPaperByCount, GatePreviousQuestionPaperByCount } = useSelector(selectMyCourses);

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
      // getPreviousQuestionPaperByCount({
      //   dispatch,
      //   userId: user?.userInfo?.userId,

      //   subjectId: chapterItem?.subjectId,
      //   chapterId: chapterItem?.chapterId,
      //   semesterId: user?.userOrg.semesterId,
      // });
      // getGatePreviousQuestionPaperCountByTopic({
      //   dispatch,
      //   userId: user?.userInfo?.userId,

      //   subjectId: chapterItem?.subjectId,
      //   chapterId: chapterItem?.chapterId,
      //   semesterId: user?.userOrg.semesterId,
      // });

    }
  }, [topics]);
  // async getPreviousQuestionPaperByCount(user, token) {
  //   const { subjectId, chapterId } = this.props.data;
  //   const semesterId = user.userOrg.semesterId;
  //   const endPoint = `http://myprofessor-lb-1079580533.ap-south-1.elb.amazonaws.com/api/my-professor/question-papers/${semesterId}/${subjectId}/${chapterId}/questions/count`;

  //   try {
  //     const response = await fetch(endPoint, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         token: token,
  //       },
  //     });
  //     const responseData = await response.json();
  //     //const responseData = JSON.stringify(data);

  //     if (responseData.code === 201) {
  //       if (responseData?.data) {
  //         this.setState({
  //           previousQuestionPaperByCountList: responseData?.data,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
          // Handle back button press
          if (route.params.from === 'search') {
            navigation.navigate('DrawerNavigation', {from:"mychapters",navigation:navigation});
          } else {
            navigation.navigate('MyChapters', { subjectItem: subjectItem });

          }
        }}
        imageSource={{ uri: chapterItem?.image }}
        labels={[topics?.items?.length + ' Topics']}
      />

      <TopicsList
        navigation={navigation}
        data={topics?.items}
        PreviousQuestionPaperByCount={
          PreviousQuestionPaperByCount.length > 0
            ? PreviousQuestionPaperByCount
            : []}
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
