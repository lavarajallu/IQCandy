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
import { goBack } from '../../../../utils/navigationUtils';
import { COLORS } from '../../../../constants/colors';
import Header from '../../../../components/Header';
import NormalVideoViewComponent from './NormalVideoViewComponent';
import { textContent } from '../../../../constants/content';
import { selectUser } from '../../../../store/authManagement/selector';
import { selectMyCourses } from '../../../../store/student/myCourses/selector';
import {
  getVideoActivityDataProf,
  updateanalyticsNotes,
  getVideoquestionsvideopro,
} from '../../../../api/myCourses';
import moment from 'moment';
import i18n from '../../../../i18n';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
const YtVideoActivityPro = ({ route, navigation }) => {
  const { questions } = textContent;
  const { topicItem, chapterItem, subjectItem, from, data, data1 } =
    route.params;
  const {
    notesActivityData,
    videoActivityData,
    videoActivityDataPro,
    Videoquestionsvideopro,
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
  const [videosdata, setvideoquestionsdata] = useState({});

  const backAction = () => {
    //updateAnalytics();
    if (route.params.type === 'recommtopicActivities') {
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
    getVideoActivityDataProf({
      dispatch,
      userId: user?.userInfo?.userId,
      id: route.params.data.id,
      activityInfoId: route.params.data.activityInfoId,
    });
    // getVideoquestionsvideopro({
    //   dispatch,
    //   userId: user?.userInfo?.userId,
    //   activityId: route.params.data.id,
    // });
    const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setactivityStartTime(activityStartTime);
  }, [user]);
  useEffect(() => {
    if (Videoquestionsvideopro && Videoquestionsvideopro.length > 0) {
      console.log('klsadjklsjkljsd', Videoquestionsvideopro);
      var newdata = [...Videoquestionsvideopro];
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
  }, [Videoquestionsvideopro]);
  useEffect(() => {
    if (videoActivityDataPro && Object.keys(videoActivityDataPro).length > 0) {
      setnormalvideodata(videoActivityDataPro);
    }
  }, [videoActivityDataPro]);
  const onActivityNext = (currentTime, duration) => {
    handleNextActivity();
  };

  const onBackNew = (data, duration) => {
    // setTimeout(() => {
    if (route.params.type === 'recommtopicActivities') {
      goBack(navigation);
    } else {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: 'topics',
      });
    }
    //  }, 1000);
  };
  const onActivityPrevious = (data, duration) => {
    handlePreviousActivity();
  };
  const onNewBack = () => {
    setnewmodal(false);
  };
  const onPause = (data) => {
    setdata(data);
    setdata((data) => {
      setnewmodal(true);

      return data;
    });
  };
  const onfullscreen = (value) => {
    if (this.funcComRef) {
      setfullscreen(!showfullscreen);
      this.funcComRef('fullscreen', !showfullscreen);
    }
  };
  const handleNextActivity = () => {
    var newarray = route.params.smartres;
    var newobj = newarray[route.params.index + 1];
    var index = route.params.index;
    if (newobj) {
      if (
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' ||
        newobj.activityType === 'web' ||
        newobj.activityType === 'games'
      ) {
        navigation.navigate('ProfPdfViewNew', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivityPro', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'youtube') {
        navigation.navigate('YtVideoActivityPro', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
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
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' ||
        newobj.activityType === 'web' ||
        newobj.activityType === 'games'
      ) {
        navigation.navigate('ProfPdfViewNew', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivityPro', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'youtube') {
        navigation.navigate('YtVideoActivityPro', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
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
        <Header backAction={onback} headerTitle={'Video Activity'} />
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
            <Text style={{ fontSize: 15 }}>{i18n.t('loading')}</Text>
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
              {i18n.t('previousactivity')}
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
                {i18n.t('nextactivity')}
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: COLORS.appSecondaryColor,
                }}
              >
                {i18n.t('done')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {/* <Modal isVisible={newmodal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VideoQuestionModal
            data={newdata}
            questionsArray={newdata}
            onquestionSubmit={() => onquestionSubmit(20)}
            onRewatch={onRewatch}
            activitydata={data}
            userDetails={user}
          />
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default YtVideoActivityPro;

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
