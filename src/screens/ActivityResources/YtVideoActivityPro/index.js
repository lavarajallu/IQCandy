//Post Assessment
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage or the storage library you're using

import VideoQuestionModal from './VideoQuestionModal';
import Modal from 'react-native-modal';
import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import NormalVideoViewComponent from './NormalVideoViewComponent';
import { textContent } from '../../../constants/content';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import {
  getVideoActivityDatayoutube,
  updateanalyticsNotes,
  getAssessmentTestQuestionRequest,
  getVideoquestions,
} from '../../../api/myCourses';
import moment from 'moment';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
const YtVideoActivity = ({ route, navigation }) => {
  const { questions } = textContent;
  const { topicItem, chapterItem, subjectItem, from, data, data1 } =
    route.params;
  const {
    notesActivityData,
    videoActivityData,
    ytvideoActivityData,
    videoquestionsdata,
    Videoquestionassesdata,
  } = useSelector(selectMyCourses);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const video = React.useRef(null);
  const [normalvideodata, setnormalvideodata] = useState(null);
  const [status, setStatus] = React.useState({});
  const [newmodal, setnewmodal] = useState(false);
  const [newdata, setdata] = useState({});
  const [activityStartTime, setactivityStartTime] = useState(null);
  const [showfullscreen, setfullscreen] = useState(false);
  const [videosdata, setvideoquestionsdata] = useState([]);
  const backAction = () => {
    updateAnalytics();
    navigation.navigate('ActivityResources', {
      topicItem: route.params.topicItem,
      chapterItem: route.params.chapterItem,
      subjectItem: route.params.subjectItem,
      from: route.params.from,
    });
  };
  const updateAnalytics = async (newdata, duration) => {
    const { data, subjectItem, chapterItem, topicItem } = route.params;
    if (data.activityType)
      var body = {
        activityDimId: data.activityDimId,
        boardId: user.userOrg.boardId,
        gradeId: user.userOrg.gradeId,

        subjectId: subjectItem?.subjectId
          ? subjectItem.subjectId
          : chapterItem?.subjectId
          ? chapterItem.subjectId
          : null,
        chapterId: chapterItem?.chapterId
          ? chapterItem.chapterId
          : topicItem?.chapterId
          ? topicItem.chapterId
          : null,
        topicId: route.params.topicItem?.topicId
          ? route.params.topicItem.topicId
          : null,
        activityStartedAt: activityStartTime,
        activityEndedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        videoWatchedInSec: duration,
        videoPausedAt: newdata,
      };
    updateanalyticsNotes({
      dispatch,
      userId: user?.userInfo.userId,
      data: body,
    });
  };
  useEffect(() => {
    var activityDimId = data.activityDimId;
    getVideoActivityDatayoutube({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: activityDimId,
    });
    getVideoquestions({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: activityDimId,
      assignedActivityId: data.assignedActivityId,
    });
    const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setactivityStartTime(activityStartTime);
  }, [user]);
  useEffect(() => {
    if (videoquestionsdata && videoquestionsdata.length > 0) {
      var newdata = [...videoquestionsdata];
      newdata.sort(function (a, b) {
        let dateA = parseInt(a.timeInSec);
        let dateB = parseInt(b.timeInSec);
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
      setvideoquestionsdata(newdata);
    }
  }, [videoquestionsdata]);
  useEffect(() => {
    if (ytvideoActivityData && Object.keys(ytvideoActivityData).length > 0) {
      setnormalvideodata(ytvideoActivityData);
    }
  }, [ytvideoActivityData]);
  const onActivityNext = (currentTime, duration) => {
    if (currentTime) {
      updateAnalytics(currentTime, duration);
    } else {
      updateAnalytics(0, 0);
    }
    handleNextActivity();
  };

  const onBackNew = (data, duration) => {
    if (data) {
      updateAnalytics(data, duration);
    } else {
      updateAnalytics(0, 0);
    }

    setTimeout(() => {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: route.params.from,
      });
    }, 1000);
  };
  const onActivityPrevious = (data, duration) => {
    if (data) {
      updateAnalytics(data, duration);
    } else {
      updateAnalytics(0, 0);
    }
    handlePreviousActivity();
  };
  const onNewBack = () => {
    setnewmodal(false);
  };
  const onPause = (questionInfo) => {
    setdata(questionInfo);
    getAssessmentTestQuestionRequest({
      dispatch,
      questionId: questionInfo.questionId,
      testId: questionInfo.userTestId,
      activityDimId: data.activityDimId,
      userId: user?.userInfo.userId,
      assignedActivityId: data.assignedActivityId,
      index: questionInfo.index,
    });

    //  this.setState({ newmodal: true })
  };
  useEffect(() => {
    if (
      Videoquestionassesdata &&
      Object.keys(Videoquestionassesdata).length > 0
    ) {
      setnewmodal(true);
    }
  }, [Videoquestionassesdata]);
  const onfullscreen = (value) => {
    if (this.funcComRef) {
      setfullscreen(!showfullscreen);
      // setfullscreen((showfullscreen) => {
      this.funcComRef('fullscreen', !showfullscreen);
      //   return !showfullscreen;
      // });
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
        from: route.params.from,
      });
    }
  };
  const handlePreviousActivity = () => {
    var newarray = route.params.smartres;
    var newobj = newarray[route.params.index - 1];
    var index = route.params.index;
    if (newobj) {
      if (
        newobj.activityType === 'obj' ||
        newobj.activityType === 'post' ||
        newobj.activityType === 'sub'
      ) {
        navigation.navigate('PostAssessment', {
          index: index - 1,
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
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'pre') {
        navigation.navigate('ActivityResources', {
          topicItem: route.params.topicItem,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivity', {
          index: index - 1,
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
        from: route.params.from,
      });
    }
  };
  const onquestionSubmit = (value) => {
    setnewmodal(false);
    this.funcComRef('questionsubmit', value);
  };
  const onRewatch = () => {
    setnewmodal(false);
    this.funcComRef('rewatch', newdata);
  };
  const onback = () => {
    if (this.funcComRef) {
      this.funcComRef('gettime', 'Val');
    } else {
      goBack(navigation);
    }
  };
  var stylefull;
  var width;
  var height;
  if (showfullscreen) {
    stylefull = {
      height: showfullscreen ? '100%' : '80%',
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      width: '95%',
      // flex: 0.85,
      // backgroundColor: COLORS.whiteColor,
      // marginHorizontal: windowWidth * 0.03,
      // borderWidth: 1,
      // borderColor: COLORS.whiteColor,
      // borderRadius: 4,
      // marginVertical: 10,
      // shadowOffset: { width: 2, height: 4 },
      // shadowColor: COLORS.black,
      // shadowOpacity: 0.2,
      // shadowRadius: 3,
    };
  } else {
    stylefull = {
      flex: 0.85,
      backgroundColor: COLORS.whiteColor,
      marginHorizontal: windowWidth * 0.03,
      borderWidth: 1,
      borderColor: COLORS.whiteColor,
      borderRadius: 4,
      marginVertical: 10,
      shadowOffset: { width: 2, height: 4 },
      shadowColor: COLORS.black,
      shadowOpacity: 0.2,
      shadowRadius: 3,
    };
    width = windowWidth;
    height = windowHeight;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      {showfullscreen ? null : (
        <Header backAction={onback} headerTitle={'Youtube Video Activity'} />
      )}
      <View style={stylefull}>
        {normalvideodata ? (
          <NormalVideoViewComponent
            forwardRef={(c) => {
              this.funcComRef = c;
            }}
            resourcedata={data1 ? data1 : data}
            onActivityNext={onActivityNext}
            onBackNew={onBackNew}
            onActivityPrevious={onActivityPrevious}
            onfullscreen={onfullscreen}
            questionsArray={videosdata}
            onBack={onNewBack}
            onPause={onPause}
            data={normalvideodata}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>Loading...</Text>
          </View>
        )}
      </View>
      {showfullscreen ? null : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={handlePreviousActivity}
            style={{
              height: 30,
              borderRadius: 20,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: COLORS.appSecondaryColor,
              }}
            >
              Previous Activity
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNextActivity}
            style={{
              height: 30,
              borderRadius: 20,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {route.params.smartres[route.params.index + 1] ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: COLORS.appSecondaryColor,
                }}
              >
                Next Activity
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: COLORS.appSecondaryColor,
                }}
              >
                Done
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      <Modal isVisible={newmodal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VideoQuestionModal
            data={newdata}
            onquestionSubmit={() => onquestionSubmit(20)}
            onRewatch={onRewatch}
            userDetails={user}
            Videoquestionassesdata={Videoquestionassesdata}
            activitydata={data}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default YtVideoActivity;

const { width, height } = Dimensions.get('window');

const styless = StyleSheet.create({
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
