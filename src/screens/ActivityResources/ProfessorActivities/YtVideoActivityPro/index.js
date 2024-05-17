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
} from '../../../../api/myCourses';
import moment from 'moment';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
const YtVideoActivityPro = ({ route, navigation }) => {
  const { questions } = textContent;
  const { topicItem, chapterItem, subjectItem, from, data, data1 } =
    route.params;
  const { notesActivityData, videoActivityData,videoActivityDataPro } = useSelector(selectMyCourses);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const video = React.useRef(null);
  const [normalvideodata, setnormalvideodata] = useState(null);
  const [status, setStatus] = React.useState({});
  const [newmodal, setnewmodal] = useState(false);
  const [newdata, setdata] = useState({});
  const [activityStartTime, setactivityStartTime] = useState(null);
  const [showfullscreen, setfullscreen] = useState(false);
  const backAction = () => {
    //updateAnalytics();
    if(route.params.type === 'recommtopicActivities'){
      goBack(navigation)    }else{
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
        universityId: user?.userOrg.universityId,
        branchId: user?.userOrg.branchId,
        semesterId: user?.userOrg.semesterId,
        gradeId: user?.userOrg.gradeId,

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
    console.log('dcndsncd', newdata);
    updateanalyticsNotes({
      dispatch,
      userId: user?.userInfo.userId,
      data: body,
    });
    // const authToken = await AsyncStorage.getItem('userToken');
    // var url = `https://api.iqcandy.com/api/iqcandy/users/${user?.userInfo.userId}/analytics/capture-activity`;

    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     jwt: authToken,
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log('kanckanCKACKD', JSON.stringify(json));
    //     if (json.data) {
    //       const data = json.data;

    //       alert('mczc' + JSON.stringify(data));
    //     } else {
    //       console.log('ncmxcmnxc', JSON.stringify(json));
    //     }
    //   })
    //   .catch((error) => console.error(error));
  };
  useEffect(() => {
  //  var activityDimId = data.activityDimId;
    getVideoActivityDataProf({
      dispatch,
      userId: user?.userInfo?.userId,
      id: route.params.data.id,
      activityInfoId: route.params.data.activityInfoId,
    });
    const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setactivityStartTime(activityStartTime);
  }, [user]);
  useEffect(() => {
    if (videoActivityDataPro && Object.keys(videoActivityDataPro).length > 0) {
     setnormalvideodata(videoActivityDataPro);
    }
  }, [videoActivityDataPro]);
  const onActivityNext = (currentTime, duration) => {
    //console.log('11111111', currentTime, 'vvv', duration);
    // if (currentTime) {
    //   updateAnalytics(currentTime, duration);
    // } else {
    //   updateAnalytics(0, 0);
    // }
    handleNextActivity();
  };

  const onBackNew = (data, duration) => {
    // if (data) {
    //   updateAnalytics(data, duration);
    // } else {
    //   updateAnalytics(0, 0);
    // }

   // setTimeout(() => {
    if(route.params.type === 'recommtopicActivities'){
      goBack(navigation)
    }else{
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
    console.log('previoussssssssss', data, 'vvv', duration);
    // if (data) {
    //   updateAnalytics(data, duration);
    // } else {
    //   updateAnalytics(0, 0);
    // }
    handlePreviousActivity();
  };
  const onNewBack = () => {
    setnewmodal(false);
  };
  const onPause = (data) => {
    setdata(data);
    setnewmodal(true);
    //  this.setState({ newmodal: true })
  };
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
           newobj.activityType === 'pdf' ||
           newobj.activityType === 'HTML5' ||
           newobj.activityType === 'html5' ||newobj.activityType === 'web'
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
         }else if (
           newobj.activityType === 'youtube'
         ) {
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
           newobj.activityType === 'html5' || newobj.activityType === 'web'
         ) {
           navigation.navigate('ProfPdfViewNew', {
             index: index  - 1,
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
             index: index -  1,
             smartres: route.params.smartres,
             data: newobj,
             type: route.params.type,
             chapterItem: route.params.chapterItem,
             subjectItem: route.params.subjectItem,
             topicItem: route.params.topicItem,
             from: route.params.from,
           });
         }else if (
           newobj.activityType === 'youtube'
         ) {
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
    //  console.log('onreeeee', NormalVideoViewComponent.pausedtime);
  };
  const onback = () => {
    if(this.funcComRef){
    this.funcComRef('gettime', 'Val')}else{
      goBack(navigation)
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
            questionsArray={[]}
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
          />
        </View>
      </Modal>
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
