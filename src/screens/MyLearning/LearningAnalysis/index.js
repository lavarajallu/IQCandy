import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import ActivityRings from 'react-native-activity-rings';
import _ from 'lodash';
import { SHADOW_STYLES } from '../../../constants/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import { textContent } from '../../../constants/content';
import SubjectsList from './SubjectsList';
import LearningAnalysisCard from './LearningAnalysisCard';
import PerformancesCard from '../../../components/PerformancesCard';
import { useTranslation } from 'react-i18next';

import {
  getAssessmentSubjects,
  getPieChartData,
  getprevioustestdata,
  getChapterData,
} from '../../../api/myLearning';
import { selectUser } from '../../../store/authManagement/selector';
import i18n from '../../../i18n/index1';

const { width } = Dimensions.get('window');

const LearningAnalysis = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); //i18n instance

  const { user } = useSelector(selectUser);
  const { subjectsInfo, pieChartData, previousTestData, chapterData } =
    useSelector((state) => state.myLearning);

  const [selectedTab, setSelectedTab] = useState(0);
  const [learningSubjectData, setLearningSubjectData] = useState([]);
  const [chapterAvgData, setChaptersAvgData] = useState({});
  const [bloomsData, setBloomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chaptersList, setChaptersList] = useState([]);

  const activityConfig = {
    width: 300,
    height: 300,
    radius: 32,
    ringSize: 12,
  };
  const bllomsdatastatic = [
    {
      label: 'HTML',
      value: 0,
      totalQuestions: 0,
      color: '#6A517',
    },
  ];
  useEffect(() => {
    if (user) {
      const payload = {
        boardId: user.userOrg.boardId,
        branchId: user.userOrg.branchId,
        gradeId: user.userOrg.gradeId,
      };

      getAssessmentSubjects({
        data: payload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  }, [user]);

  useEffect(() => {
    if (subjectsInfo?.items?.length > 0) {
      getPieChartData({
        dispatch,
        userId: user?.userInfo?.userId,
        subjectId: subjectsInfo.items[selectedTab].subjectId,
      });
      getprevioustestdata({
        dispatch,
        userId: user?.userInfo?.userId,
        subjectId: subjectsInfo.items[selectedTab].subjectId,
        boardId: user.userOrg.boardId,
      });
      getChapterData({
        dispatch,
        userId: user?.userInfo?.userId,
        subjectId: subjectsInfo.items[selectedTab].subjectId,
      });
    }
  }, [user, selectedTab]);

  useEffect(() => {
    if (previousTestData?.userPracticeTest?.length) {
      let testChapters = [];
      let listChapters = [];
      let uniqueTestChapters = _.uniqBy(
        previousTestData?.userPracticeTest,
        'chapterId'
      );

      uniqueTestChapters = uniqueTestChapters.map((ctc) => ({
        ...ctc,
        testType: ctc.testType.toLowerCase(),
      }));

      const previousTestChapters = _.sortBy(
        uniqueTestChapters,
        (o) => o.testType
      );

      previousTestChapters.forEach((up, i) => {
        if (i !== previousTestChapters.length - 1) {
          testChapters.push({
            ...up,
            name: up.chapterName,
            index: up.chapterIndex,
          });
        }
      });

      const chapterList = _.sortBy(testChapters, 'index');

      if (chapterList?.length > 0 && chapterData?.length > 0) {
        let listChapters = chapterList;

        const chapterAvgData = listChapters?.map((chapter, i) => {
          const chapterInfo = chapterData?.find(
            (chp) => chp?.chapterId === chapter?.chapterId
          );

          let diffLevelAnalysisObj = {};
          const diffLevelObj = {
            Easy: 0,
            Medium: 0,
            Hard: 0,
          };

          if (chapterInfo) {
            Object.keys(diffLevelObj).forEach((diffLevel) => {
              const questionObj = chapterInfo?.diffLevelAnalysis.find(
                (ut) => ut.diffLevel === diffLevel
              );

              diffLevelAnalysisObj[diffLevel] =
                questionObj?.totalQuestions || 0;
            });

            return {
              avgQueTime: Math.round(chapterInfo.averageTimeTaken),
              correctAnswer:
                chapterInfo.totalQuestions - chapterInfo.totalWrongQuestions ||
                0,
              easy:
                parseInt(diffLevelAnalysisObj.Easy * 100) /
                  parseInt(chapterInfo.totalQuestions) || 0,
              hard:
                parseInt(diffLevelAnalysisObj.Hard * 100) /
                  parseInt(chapterInfo.totalQuestions) || 0,
              index: i + 1,
              medium:
                parseInt(diffLevelAnalysisObj.Medium * 100) /
                  parseInt(chapterInfo.totalQuestions) || 0,
              name: chapterInfo.chapterName,
              testAttempts: chapterInfo?.totalTestsAttempted || 0,
              totalQuestions: chapterInfo?.totalQuestions || 0,
            };
          } else {
            return {
              avgQueTime: 0,
              correctAnswer: 0,
              easy: 0,
              hard: 0,
              index: i + 1,
              medium: 0,
              name: chapter.chapterName,
              testAttempts: 0,
              totalQuestions: 0,
            };
          }
        });

        setChaptersAvgData(chapterAvgData);
        setLoading(false);
      } else {
        const chapterAvgData = listChapters.map((chapter, i) => ({
          avgQueTime: 0,
          correctAnswer: 0,
          easy: 0,
          hard: 0,
          index: i + 1,
          medium: 0,
          name: chapter.chapterName,
          testAttempts: 0,
          totalQuestions: 0,
        }));

        setChaptersAvgData({});
        setLoading(false);
      }
    }
  }, [previousTestData, chapterData]);

  useEffect(() => {
    if (pieChartData) {
      const data = pieChartData;
      const subjectTaxonomyData = data?.bloomTaxonamyAverage;
      if (subjectTaxonomyData?.length > 0) {
        const colorsarray = [
          '#6A5177',
          '#A3BA6D',
          '#D88212',
          '#F94D48',
          '#D19DE6',
          '#30A6DC',
        ];
        const newarraynew = [];
        const questionsTotal = subjectTaxonomyData
          .map((tb) => +tb.totalQuestions)
          .reduce((pv, cv) => pv + cv, 0);

        subjectTaxonomyData.forEach((res, i) => {
          const obj = {
            label: res.questionType,
            value:
              res.totalQuestions &&
              parseFloat((+res.totalQuestions * 100) / questionsTotal) / 100,
            totalQuestions: res.totalQuestions,
            color: colorsarray[i],
          };
          newarraynew.push(obj);
        });

        setBloomsData(newarraynew);
      } else {
        setBloomsData([]);
      }
    }
  }, [pieChartData]);

  const backAction = () => {
    goBack(navigation);
  };

  const onSubjectClick = (index) => {
    setSelectedTab(index);

    if (subjectsInfo?.items?.length > 0) {
      getPieChartData({
        dispatch,
        userId: user?.userInfo?.userId,
        subjectId: subjectsInfo.items[index].subjectId,
      });
      getprevioustestdata({
        dispatch,
        userId: user?.userInfo?.userId,
        subjectId: subjectsInfo.items[index].subjectId,
        boardId: user.userOrg.boardId,
      });
      getChapterData({
        dispatch,
        userId: user?.userInfo?.userId,
        subjectId: subjectsInfo.items[index].subjectId,
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={t('learninganalysis')} />
      <View style={[styles.container, styles.shadowProp]}>
        <ScrollView>
          {subjectsInfo?.items?.length > 0 && (
            <SubjectsList
              subjectsList={subjectsInfo.items}
              onSubjectClick={onSubjectClick}
            />
          )}

          {chapterAvgData?.length > 0 ? (
            <PerformancesCard
              cardTitle={t('courseprogressavg')}
              size={width / 1.8}
              minValue={0}
              maxValue={100}
              easeDuration={500}
              value={
                pieChartData?.subjectAverage?.averageScore
                  ? Math.round(pieChartData?.subjectAverage?.averageScore)
                  : 0
              }
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
          ) : (
            <PerformancesCard
              cardTitle={t('courseprogressavg')}
              size={width / 1.8}
              minValue={0}
              maxValue={100}
              easeDuration={500}
              value={0}
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
          )}

          {bloomsData.length > 0 && (
            <View style={styles.activityView}>
              <Text style={styles.activityheadtext}>{t('bloomtaxonomy')}</Text>

              <ActivityRings data={bloomsData} config={activityConfig} />
              <View style={styles.activtyBottomView}>
                {bloomsData.map((res, i) => (
                  <View key={i} style={styles.activityinnerView}>
                    <View
                      style={[
                        styles.activitycircleview,
                        { backgroundColor: res.color },
                      ]}
                    />
                    <Text style={styles.activitylabel}>{res.label}</Text>
                    <Text style={styles.activitylabelsub}>
                      {'('}
                      {Math.round(res.value * 100)}
                      {'%)'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {chapterAvgData?.length > 0 ? (
            chapterAvgData.map((res, i) => (
              <LearningAnalysisCard
                key={i}
                cardTitle={t('friction')}
                data={res}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text>{t('nodata')}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LearningAnalysis;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
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
  activityView: {
    width: width * 0.86,
    marginTop: 20,
    left: 14,
    borderRadius: 7,
    backgroundColor: COLORS.whiteColor,
    ...SHADOW_STYLES,
  },
  activityheadtext: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.coursesColor,
    marginLeft: 10,
    marginTop: 10,
  },
  activtyBottomView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityinnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  activitycircleview: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
  },
  activitylabel: {
    marginLeft: 5,
    fontSize: 15,
  },
  activitylabelsub: {
    marginLeft: 5,
    fontSize: 12,
  },
});
