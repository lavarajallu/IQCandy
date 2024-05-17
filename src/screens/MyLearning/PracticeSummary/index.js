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
import { getsummaryreport } from '../../../api/myLearning';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
const PracticeSummary = ({ route, navigation }) => {
  const { questions } = textContent;
  const { user } = useSelector(selectUser);
  const { summaryDataPractice } = useSelector(selectMyLearning);
  const dispatch = useDispatch();

  const [testResult, setTestResult] = useState({});
  const { data, testId } = route.params;
  const backAction = () => {
    goBack(navigation);
  };

  useState(() => {
    var userId = user?.userInfo?.userId;
    var userTestId = route.params.testId;
    getsummaryreport({
      dispatch,
      userId: user?.userInfo?.userId,
      userTestId: userTestId,
    });
  }, [user]);
  useEffect(() => {
    if (summaryDataPractice && Object.keys(summaryDataPractice).length) {
      const previousAssessmentTestData = summaryDataPractice;

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
  }, [summaryDataPractice]);
  const onViewSolutions = () => {
    navigation.navigate('PracticeSolutions', {
      //activtydata: route.params.data,
      testid: route.params.testId,
      // data: route.params.topicItem,
      // topicsdata: route.params.chapterItem,
      screen: 'summary',
      //subjectData: route.params.subjectItem,
      from: route.params.from,
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Summary '} />

      <View style={[styles.container, styles.shadowProp]}>
        <ScrollView>
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}
          >
            {/* Performance Card View */}

            <PerformancesCard
              cardTitle='Performance'
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
              title='Attempts Analysis'
              data1='0'
              data2='5'
              backgroundColor1={COLORS.rightInfo}
              backgroundColor2={COLORS.wrongInfo}
              testResult={testResult}
            />

            {/*  TimeSpent Card */}
            {testResult?.questions?.length > 0 ? (
              <TimeSpentCard cardTitle='Time Spent' testResult={testResult} />
            ) : null}
            <TouchableOpacity
              onPress={onViewSolutions}
              style={{
                height: 40,
                width: 200,
                alignSelf: 'center',
                marginVertical: 50,
                // marginTop: 20,
                paddingHorizontal: 20,
                backgroundColor: COLORS.appSecondaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>
                Review Answers
              </Text>
            </TouchableOpacity>

            {/* Button Container Like Botttom Buttons Next and Previous Buttons */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PracticeSummary;

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
