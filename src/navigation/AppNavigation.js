// AppNavigation.js
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

import {
  ActivityResources,
  ForgotPassword,
  KnowledgeMap,
  LeaderBoard,
  LearningAnalysis,
  Login,
  MyChapters,
  MyLearning,
  MyPractice,
  MyTopics,
  NotesActivity,
  OnBoardStartedScreen,
  OnboardingScreen,
  PostAssessment,
  PreAssessment,
  PreviousQuestionPapers,
  PrePaperAssessment,
  Register,
  Summary,
  VideoActivity,
  EditProfile,
  MyPracticeChapters,
  ResetPassword,
  OTPVerification,
  SearchPage,
  ReviewTests,
  TopicsProgressAll,
  BuyPackages,
  Subjects,
  PracticeAssesment,
  ReviewPractice,
  PracticeSummary,
  ReviewAnswers,
  PracticeSolutions,
  TopicQuestionpapertype,
  ProfPdfViewNew,
  VideoActivityPro,
  YtVideoActivityPro,
  YtVideoActivity,
  TopicAnalysis,
  RecommendedActivityResources,
} from '../screens';
import ReferEarn from '../screens/ReferEarn';

import * as Notifications from 'expo-notifications';

import DrawerNavigation from './DrawerNavigation';
import { setUser } from '../store/authManagement/slice';
import { selectUser } from '../store/authManagement/selector';

const Stack = createStackNavigator();

function AppNavigation() {
  const { user } = useSelector(selectUser);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('isFirstLaunch').then((value) => {
      if (value === 'true') {
        setIsFirstLaunch(true);
      } else {
        AsyncStorage.setItem('isFirstLaunch', 'true');
      }
    });

    AsyncStorage.getItem('userInfo').then((user) => {
      if (user) {
        // Dispatch an action to update the Redux state with the token
        dispatch(setUser(JSON.parse(user)));
      }
    });
  }, []);
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    AsyncStorage.setItem('pushtoken', token);

    return token;
  }
  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
      {/* {isFirstLaunch && user ? ( */}
      {/* <>
          <Stack.Screen
            name={'DrawerNavigation'}
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MyChapters'
            component={MyChapters}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MyTopics'
            component={MyTopics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MyLearning'
            component={MyLearning}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ActivityResources'
            component={ActivityResources}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='PreAssessment'
            component={PreAssessment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='PostAssessment'
            component={PostAssessment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='VideoActivity'
            component={VideoActivity}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='NotesActivity'
            component={NotesActivity}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Summary'
            component={Summary}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MyPractice'
            component={MyPractice}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LearningAnalysis'
            component={LearningAnalysis}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LeaderBoard'
            component={LeaderBoard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='KnowledgeMap'
            component={KnowledgeMap}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='PreviousQuestionPapers'
            component={PreviousQuestionPapers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='PrePaperAssessment'
            component={PrePaperAssessment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='EditProfile'
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MyPracticeChapters'
            component={MyPracticeChapters}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SearchPage'
            component={SearchPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ReviewTests'
            component={ReviewTests}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='BuyPackages'
            component={BuyPackages}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Subjects'
            component={Subjects}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='TopicsProgressAll'
            component={TopicsProgressAll}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='PracticeAssesment'
            component={PracticeAssesment}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='PracticeSummary'
            component={PracticeSummary}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='ReviewPractice'
            component={ReviewPractice}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='ReviewAnswers'
            component={ReviewAnswers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='PracticeSolutions'
            component={PracticeSolutions}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='TopicQuestionpapertype'
            component={TopicQuestionpapertype}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name='ProfPdfViewNew'
            component={ProfPdfViewNew}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='VideoActivityPro'
            component={VideoActivityPro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='YtVideoActivityPro'
            component={YtVideoActivityPro}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='ReferEarn'
            component={ReferEarn}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name='YtVideoActivity'
            component={YtVideoActivity}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name='RecommendedActivityResources'
            component={RecommendedActivityResources}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name='TopicAnalysis'
            component={TopicAnalysis}
            options={{ headerShown: false }}
          />
        </>
      ) : ( */}
      <>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ResetPassword'
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='OTPVerification'
          component={OTPVerification}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Register'
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='OnboardStarted'
          component={OnBoardStartedScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={'DrawerNavigation'}
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyChapters'
          component={MyChapters}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyTopics'
          component={MyTopics}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyLearning'
          component={MyLearning}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ActivityResources'
          component={ActivityResources}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='PreAssessment'
          component={PreAssessment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PostAssessment'
          component={PostAssessment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='VideoActivity'
          component={VideoActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NotesActivity'
          component={NotesActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Summary'
          component={Summary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ReferEarn'
          component={ReferEarn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyPractice'
          component={MyPractice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LearningAnalysis'
          component={LearningAnalysis}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LeaderBoard'
          component={LeaderBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='KnowledgeMap'
          component={KnowledgeMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PreviousQuestionPapers'
          component={PreviousQuestionPapers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PrePaperAssessment'
          component={PrePaperAssessment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyPracticeChapters'
          component={MyPracticeChapters}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SearchPage'
          component={SearchPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ReviewTests'
          component={ReviewTests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BuyPackages'
          component={BuyPackages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Subjects'
          component={Subjects}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='TopicsProgressAll'
          component={TopicsProgressAll}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='PracticeAssesment'
          component={PracticeAssesment}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='PracticeSummary'
          component={PracticeSummary}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ReviewPractice'
          component={ReviewPractice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ReviewAnswers'
          component={ReviewAnswers}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='PracticeSolutions'
          component={PracticeSolutions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TopicQuestionpapertype'
          component={TopicQuestionpapertype}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProfPdfViewNew'
          component={ProfPdfViewNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='VideoActivityPro'
          component={VideoActivityPro}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='YtVideoActivityPro'
          component={YtVideoActivityPro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='YtVideoActivity'
          component={YtVideoActivity}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='RecommendedActivityResources'
          component={RecommendedActivityResources}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='TopicAnalysis'
          component={TopicAnalysis}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>
  );

  function getInitialRoute() {
    // if (!isFirstLaunch) {
    //   return 'Onboarding';
    // }

    // if (user) {
    //   return 'DrawerNavigation';
    // }

    return 'Onboarding';
  }
}

export default AppNavigation;
