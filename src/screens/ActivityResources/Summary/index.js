//Summary
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import { textContent } from '../../../constants/content';
import PerformancesCard from '../../../components/PerformancesCard';
import AttemptsAnalysisCard from '../../../components/AttemptsAnalysisCard';
import TimeSpentCard from '../../../components/TimeSpentCard';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import { getsummaryreport } from '../../../api/myCourses';
import i18n from '../../../i18n';
const Summary = ({ route, navigation }) => {
  const { questions } = textContent;
  const { user } = useSelector(selectUser);
  const { summaryData } = useSelector(selectMyCourses);
  const dispatch = useDispatch();

  const [testResult, setTestResult] = useState({});
  const { data, testId } = route.params;
  const backAction = () => {
    if (route.params.screen === 'reviewtests') {
      goBack(navigation);
    } else {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: 'topics',
      });
    }
  };

  const handleNextActivity = () => {
    var newarray = route.params.smartres;
    var newobj = newarray[route.params.index + 1];
    var index = route.params.index;
    if (newobj) {
      if (
        newobj.activityType === 'obj' ||
        newobj.activityType === 'post' ||
        newobj.activityType === 'sub'
      ) {
        navigation.navigate('PostAssessment', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' ||
        newobj.activityType === 'web' ||
        newobj.activityType === 'games'
      ) {
        navigation.navigate('NotesActivity', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'pre') {
        navigation.navigate('PreAssessment', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivity', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'youtube') {
        navigation.navigate('YtVideoActivity', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      }
    } else {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: 'topics',
      });
    }
  };

  useState(() => {
    var userId = user?.userInfo?.userId;
    var activityDimId = route.params.data.activityDimId;
    var assignedActivityId = route.params.data.assignedActivityId;
    var userTestId = route.params.testId;
    getsummaryreport({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: activityDimId,
      userTestId: userTestId,
      assignedActivityId: assignedActivityId,
    });
  }, [user]);
  useEffect(() => {
    if (summaryData && Object.keys(summaryData).length) {
      const previousAssessmentTestData = summaryData;

      if (
        previousAssessmentTestData &&
        Object.keys(previousAssessmentTestData).length
      ) {
        let resultObj = { ...previousAssessmentTestData };
        let wrongAnsCount = resultObj.questions.filter(
          (q) =>
            q.analysis === 'Lost' ||
            q.analysis === 'Un Answered' ||
            q.analysis === 'Extra Time'
        ).length;
        let correctAnsCount = resultObj.questions.filter(
          (q) =>
            q.analysis !== 'Lost' &&
            q.analysis !== 'Un Answered' &&
            q.analysis !== 'Extra Time'
        ).length;
        let lostCount = resultObj.questions.filter(
          (q) => q.analysis === 'Lost' || q.analysis === null
        ).length;
        let extraCount = resultObj.questions.filter(
          (q) => q.analysis === 'Extra Time'
        ).length;
        let unAnsCount = resultObj.questions.filter(
          (q) => q.analysis === 'Un Answered'
        ).length;
        let lighteningCount = resultObj.questions.filter(
          (q) => q.analysis === 'Lightning Fast'
        ).length;
        let shotCount = resultObj.questions.filter(
          (q) => q.analysis === 'What a Timing/ Shot'
        ).length;
        let extraInningCount = resultObj.questions.filter(
          (q) => q.analysis === 'Extra Innings/ Time'
        ).length;
        resultObj.wrongAnsCount = wrongAnsCount;
        resultObj.correctAnsCount = correctAnsCount;
        resultObj.lostCount = lostCount;
        resultObj.extraCount = extraCount;
        resultObj.unAnsCount = unAnsCount;
        resultObj.lighteningCount = lighteningCount;
        resultObj.shotCount = shotCount;
        resultObj.extraInningCount = extraInningCount;
        setTestResult(resultObj);
      }
    }
  }, [summaryData]);
  const onViewSolutions = () => {
    navigation.navigate('ReviewAnswers', {
      activtydata: route.params.data,
      testid: route.params.testId,
      data: route.params.topicItem,
      topicsdata: route.params.chapterItem,
      screen: 'summary',
      subjectData: route.params.subjectItem,
      from: route.params.from,
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={i18n.t('summary')} />

      <View style={[styles.container, styles.shadowProp]}>
        <ScrollView>
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}
          >
            {/* Performance Card View */}

            <PerformancesCard
              cardTitle={i18n.t('performance')}
              size={width / 1.8}
              minValue={0}
              maxValue={100}
              easeDuration={500}
              value={testResult?.userTestInfo?.score}
              currentValueText='Score-o-meter'
              needleHeightRatio={0.9}
              ringWidth={100}
              needleTransitionDuration={3000}
              needleTransition='easeElastic'
              segmentColors={COLORS.segmentColors}
              labelNoteStyle={{
                fontSize: 16,
                fontWeight: '700',
                fontFamily: 'mulish-bold',
              }}
              labelsList={textContent.labelsList}
            />
            {/* Attempts AnalysisCard */}
            <AttemptsAnalysisCard
              title={i18n.t('attemptanalysis')}
              data1='0'
              data2='5'
              backgroundColor1={COLORS.rightInfo}
              backgroundColor2={COLORS.wrongInfo}
              testResult={testResult}
            />

            {/*  TimeSpent Card */}
            {testResult?.questions?.length > 0 ? (
              <TimeSpentCard
                cardTitle={i18n.t('timespent')}
                testResult={testResult}
              />
            ) : null}

            {/* Button Container Like Botttom Buttons Next and Previous Buttons */}
          </View>
          {route.params.testtype === 'pre' ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.nextActivityButton]}
                onPress={handleNextActivity}
              >
                <Text style={styles.buttonText}>{i18n.t('nextactivity')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer} />
          )}
          {route.params.testtype === 'pre' ? null : (
            <TouchableOpacity
              onPress={onViewSolutions}
              style={{
                height: 40,
                width: 200,
                alignSelf: 'center',
                marginVertical: 30,
                paddingHorizontal: 20,
                backgroundColor: COLORS.appSecondaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>
                {i18n.t('reviewanswers')}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Summary;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  container: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 40,
  },
  button: {
    width: '78%',
    height: 46,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  nextActivityButton: {
    backgroundColor: COLORS.appSecondaryColor,
  },
  previousActivityButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  buttonText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
  },
  prevText: {
    color: '#6C6C6C',
  },
});
