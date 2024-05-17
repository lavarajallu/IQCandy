import React, { useState, useEffect } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ItemSeparator from '../../components/ItemSeparator';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage or the storage library you're using

import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityResourceCard from '../../components/ActivityResourceCard';
import Button from '../../components/Button';
import DynamicHeader from '../../components/DynamicHeader';
import GenericDatePicker from '../../components/GenericDatePicker';
import { COLORS } from '../../constants/colors';
import { imagePaths } from '../../constants/path';
import { goBack } from '../../utils/navigationUtils';
import styles from './styles';
import { selectUser } from '../../store/authManagement/selector';
import { selectMyCourses } from '../../store/student/myCourses/selector';
import CoursesCard from '../../components/CoursesCard';

import {
  getActivities,
  addtocalenderPost,
  getCalenderDataapi,
  addtocalenderPut,
  getprofessorresources,
  getrecommendedtopics,
  getrecommendedtopicActivities,
} from '../../api/myCourses';
import Modal from 'react-native-modal';
import { getTopicDetails, getChapterDetails } from '../../api/search';
import { selectSearch } from '../../store/student/search/selector';
import { getTopicsProgress } from '../../api/myTopicsInProgress';

const { width, height } = Dimensions.get('window');

const ActivityResources = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    topicItem,
    chapterItem,
    subjectItem,
    from,
    PreviousQuestionPaperByCount,
  } = route.params;
  const { user } = useSelector(selectUser);
  const [showmodal, setshowmodal] = useState(false);
  const {
    activities,
    calenderData,
    getcalenderdata,
    Profactivities,
    recommendedtopics,
    recommtopicActivities,
  } = useSelector(selectMyCourses);
  const { topicDetails, chapterDetails } = useSelector(selectSearch);

  const [progresscount, setProgressCount] = useState(0);
  const [dateformar, setdateformar] = useState(null);
  const [date, setDate] = useState(null);
  const [showerrormodel, setshowerrormodel] = useState(false);
  const [showpicker, setShowPicker] = useState(false);
  const [alreadyschedule, setalreadyschedule] = useState(false);
  const [scheduledata, setscheduledata] = useState(null);
  const [showalert, setshowlaert] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('1');
  const [profres, setprores] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [onclick, setonclick] = useState(false);
  const [recommendedarray, setrecommendedarray] = useState([]);
  const tabs = [
    { id: '1', title: 'Activity Resources' },
    { id: '2', title: 'Professor Resources' },
  ];
  useEffect(() => {
    var chapterId, subjectId;
    if (user) {
      if (chapterItem?.chapterId) {
        chapterId = chapterItem?.chapterId;
      } else {
        chapterId = topicItem?.chapterId;
      }
      if (chapterItem?.subjectId) {
        subjectId = chapterItem?.subjectId;
      } else {
        subjectId = topicItem?.subjectId;
      }

      const payload = {
        boardId: user.userOrg.boardId,
        gradeId: user.userOrg.gradeId,
        subjectId: subjectId,
        chapterId: chapterId,
        topicId: topicItem?.topicId,
      };
      getActivities({
        data: payload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
      if (user?.role.roleName === 'Student') {
        getprofessorresources({
          dispatch,
          userId: user?.userInfo?.userId,
          topicId: topicItem?.topicId,
        });
      }
      var scheduleTypeId = topicItem?.topicId;
      var userId = user?.userInfo.userId;
      var scheduleType = 'topic';

      getCalenderDataapi({
        dispatch,
        userId: userId,
        scheduleType,
        scheduleTypeId,
      });
      getrecommendedtopics({
        dispatch,
        topicId: topicItem?.topicId,
      });
    }
  }, [route]);
  useEffect(() => {
    if (recommendedtopics && recommendedtopics.length > 0) {
      const filteredRecommendedTopics =
        Array.isArray(recommendedtopics) &&
        recommendedtopics.filter(
          (topic) => topic.topicId !== topicItem?.topicId
        );
      setrecommendedarray(filteredRecommendedTopics);
    }
  }, [recommendedtopics]);
  useEffect(() => {
    if (Profactivities && Profactivities.length > 0) {
      ///console.log("ProfactivitiesProfactivitiesProfactivities",Profactivities)
      setprores(Profactivities);
    }
  }, [Profactivities]);
  useEffect(() => {
    if (getcalenderdata && Object.keys(getcalenderdata).length > 0) {
      setdateformar(moment.utc(getcalenderdata.scheduleDate).format('lll'));
      setscheduledata(getcalenderdata);
      setalreadyschedule(true);
    }
  }, [getcalenderdata]);
  useEffect(() => {
    if (activities && activities.length > 0) {
      var count = 0;
      activities.map((res, i) => {
        count = count + res.progress;
      });
      setProgressCount(count);
    }
  }, [activities]);
  const addtocalender = () => {
    if (dateformar) {
      var newarray = [
        '#6a5177',
        '#d88212',
        '#277292',
        '#a3ba6d',
        '#deb026',
        '#c44921',
      ];
      var newitem = newarray[Math.floor(Math.random() * newarray.length)];
      //  var url = baseUrl + `/user-schedules`;
      var chapterId, subjectId;
      if (chapterItem?.chapterId) {
        chapterId = chapterItem?.chapterId;
      } else {
        chapterId = topicItem?.chapterId;
      }
      if (chapterItem?.subjectId) {
        subjectId = chapterItem?.subjectId;
      } else {
        subjectId = topicItem?.subjectId;
      }
      let payload = {
        userId: user?.userInfo.userId,
        scheduleType: 'topic',
        scheduleTypeId: topicItem.topicId,
        scheduleDate: dateformar,
        additionalInfo: JSON.stringify({
          semesterId: user?.userOrg.semesterId,
          subjectId: subjectId,
          chapterId: chapterId,
          title: topicItem?.topicName,
        }),
      };
      addtocalenderPost({
        dispatch,
        userId: user?.userInfo?.userId,
        data: payload,
      });
    }
  };
  const updatecalender = () => {
    var newarray = [
      '#6a5177',
      '#d88212',
      '#277292',
      '#a3ba6d',
      '#deb026',
      '#c44921',
    ];
    var newitem = newarray[Math.floor(Math.random() * newarray.length)];
    // var url = baseUrl + `/user-schedules/${this.state?.scheduledata?.id}`;
    //console.log("topicItemtopicItemtopicItem",topicItem)
    var chapterId, subjectId;
    if (chapterItem?.chapterId) {
      chapterId = chapterItem?.chapterId;
    } else {
      chapterId = topicItem?.chapterId;
    }
    if (chapterItem?.subjectId) {
      subjectId = chapterItem?.subjectId;
    } else {
      subjectId = topicItem?.subjectId;
    }
    let payload = {
      userId: user?.userInfo.userId,
      scheduleType: 'topic',
      scheduleTypeId: topicItem.topicId,
      scheduleDate: dateformar,
      additionalInfo: JSON.stringify({
        semesterId: user?.userOrg.semesterId,
        subjectId: subjectId,
        chapterId: chapterId,
        title: topicItem?.topicName,
      }),
    };
    addtocalenderPut({
      dispatch,
      userId: user?.userInfo?.userId,
      id: scheduledata.id,
      data: payload,
    });
  };
  const renderItemTopics = ({ item }) => (
    <CoursesCard
      item={item}
      onChange={() => {
        gotoChaptersPage(item);
      }}
    />
  );
  const gotoChaptersPage = async (item) => {
    navigation.navigate('RecommendedActivityResources', {
      topicitem: item,
      chapterItem: chapterItem,
      from: from,
      subjectItem: subjectItem,
    });
  };

  useEffect(() => {
    if (calenderData && Object.keys(calenderData).length > 0) {
      //  this.setState({ showmodal: false }, () => {
      setshowmodal(false);
      // this.getsavelaterdata();
      Alert.alert('My Professor', 'Scheduled Successfully');
      if (user) {
        if (chapterItem?.chapterId) {
          chapterId = chapterItem?.chapterId;
        } else {
          chapterId = topicItem?.chapterId;
        }
        if (chapterItem?.subjectId) {
          subjectId = chapterItem?.subjectId;
        } else {
          subjectId = topicItem?.subjectId;
        }

        const payload = {
          universityId: user.userOrg.universityId,
          branchId: user.userOrg.branchId,
          semesterId: user.userOrg.semesterId,
          subjectId: subjectId,
          chapterId: chapterId,
          topicId: topicItem?.topicId,
        };
        getActivities({
          data: payload,
          dispatch,
          userId: user?.userInfo?.userId,
        });
        var scheduleTypeId = topicItem.topicId;
        var userId = user?.userInfo.userId;
        var scheduleType = 'topic';

        getCalenderDataapi({
          dispatch,
          userId: userId,
          scheduleType,
          scheduleTypeId,
        });
      }
    } else {
      setshowmodal(false);
    }
  }, [calenderData]);
  const addtocalendernew = () => {
    if (alreadyschedule && scheduledata?.id) {
      updatecalender();
    } else {
      if (from === 'dashboard') {
        addtocalender();
      } else {
        var newarray = [
          '#6a5177',
          '#d88212',
          '#277292',
          '#a3ba6d',
          '#deb026',
          '#c44921',
        ];
        var newitem = newarray[Math.floor(Math.random() * newarray.length)];
        //    var url = baseUrl + `/user-schedules`;
        var chapterId, subjectId;
        if (chapterItem?.chapterId) {
          chapterId = chapterItem?.chapterId;
        } else {
          chapterId = topicItem?.chapterId;
        }
        if (chapterItem?.subjectId) {
          subjectId = chapterItem?.subjectId;
        } else {
          subjectId = topicItem?.subjectId;
        }
        let payload = {
          userId: user?.userInfo.userId,
          scheduleType: 'topic',
          scheduleTypeId: topicItem.topicId,
          scheduleDate: dateformar,
          additionalInfo: JSON.stringify({
            semesterId: user?.userOrg.semesterId,
            subjectId: subjectId,
            chapterId: chapterId,
            title: topicItem?.topicName,
          }),
        };
        addtocalenderPost({
          dispatch,
          userId: user?.userInfo?.userId,
          data: payload,
        });
      }
    }
  };
  const gotoActivityResouce = (item, index, type) => {
    let newarray = [];
    if (type === 'professor') {
      newarray = profres;
    } else if (type === 'icon') {
      newarray = activities;
    }
    //if(item.assignedActivityId){
    if (progresscount === 0) {
      if (
        item.activityType !== 'pre' &&
        newarray.find((activity) => activity.activityType === 'pre')
      ) {
        Alert.alert('My Professor', 'Please complete Pre Assesment first');
      } else {
        if (item.activityType === 'pre') {
          navigation.navigate('PreAssessment', {
            index,
            smartres: newarray,
            data: item,
            chapterItem: chapterItem,
            subjectItem: subjectItem,
            topicItem: topicItem,
            from: from,
          });
        } else if (item.activityType === 'post') {
          navigation.navigate('PostAssessment', {
            index,
            smartres: newarray,
            data: item,
            chapterItem: chapterItem,
            subjectItem: subjectItem,
            topicItem: topicItem,
            from: from,
          });
        } else if (
          item.activityType === 'video' ||
          item.activityType === 'conceptual_video'
        ) {
          navigation.navigate('VideoActivity', {
            index,
            smartres: newarray,
            data: item,
            chapterItem: chapterItem,
            subjectItem: subjectItem,
            topicItem: topicItem,
            from: from,
          });
        } else if (
          item.activityType === 'pdf' ||
          item.activityType === 'HTML5' ||
          item.activityType === 'html5' ||
          item.activityType === 'web'
        ) {
          navigation.navigate('NotesActivity', {
            index,
            smartres: newarray,
            data: item,
            chapterItem: chapterItem,
            subjectItem: subjectItem,
            topicItem: topicItem,
            from: from,
          });
        } else if (item.activityType === 'youtube') {
          navigation.navigate('YtVideoActivity', {
            type,
            index,
            smartres: newarray,
            data: item,
            chapterItem: chapterItem,
            subjectItem: subjectItem,
            topicItem: topicItem,
            from: from,
          });
        }
      }
    } else {
      if (item.activityType === 'pre') {
        navigation.navigate('PreAssessment', {
          type,
          index,
          smartres: newarray,
          data: item,
          chapterItem: chapterItem,
          subjectItem: subjectItem,
          topicItem: topicItem,
          from: from,
        });
      } else if (item.activityType === 'post') {
        navigation.navigate('PostAssessment', {
          type,
          index,
          smartres: newarray,
          data: item,
          chapterItem: chapterItem,
          subjectItem: subjectItem,
          topicItem: topicItem,
          from: from,
        });
      } else if (
        item.activityType === 'video' ||
        item.activityType === 'conceptual_video'
      ) {
        navigation.navigate('VideoActivity', {
          type,
          index,
          smartres: newarray,
          data: item,
          chapterItem: chapterItem,
          subjectItem: subjectItem,
          topicItem: topicItem,
          from: from,
        });
      } else if (
        item.activityType === 'pdf' ||
        item.activityType === 'HTML5' ||
        item.activityType === 'html5' ||
        item.activityType === 'web'
      ) {
        navigation.navigate('NotesActivity', {
          type,
          index,
          smartres: newarray,
          data: item,
          chapterItem: chapterItem,
          subjectItem: subjectItem,
          topicItem: topicItem,
          from: from,
        });
      } else if (item.activityType === 'youtube') {
        navigation.navigate('YtVideoActivity', {
          type,
          index,
          smartres: newarray,
          data: item,
          chapterItem: chapterItem,
          subjectItem: subjectItem,
          topicItem: topicItem,
          from: from,
        });
      }
    }
    //}
  };
  const profgotoActivityResouce = (item, index, type) => {
    let newarray = profres;

    if (
      item.activityType === 'video' ||
      item.activityType === 'conceptual_video'
    ) {
      navigation.navigate('VideoActivityPro', {
        index,
        smartres: newarray,
        data: item,
        type,
        chapterItem: chapterItem,
        subjectItem: subjectItem,
        topicItem: topicItem,
        from: from,
      });
    } else if (
      item.activityType === 'pdf' ||
      item.activityType === 'HTML5' ||
      item.activityType === 'html5' ||
      item.activityType === 'web'
    ) {
      navigation.navigate('ProfPdfViewNew', {
        index,
        smartres: newarray,
        data: item,
        type,
        chapterItem: chapterItem,
        subjectItem: subjectItem,
        topicItem: topicItem,
        from: from,
      });
    } else if (item.activityType === 'youtube') {
      navigation.navigate('YtVideoActivityPro', {
        index,
        smartres: newarray,
        data: item,
        type,
        chapterItem: chapterItem,
        subjectItem: subjectItem,
        topicItem: topicItem,
        from: from,
      });
    }
  };

  const renderItem = ({ item, index }) => (
    <ActivityResourceCard
      type={'icon'}
      item={item}
      index={index}
      activities={activities}
      progresscount={progresscount}
      onPress={() => {
        gotoActivityResouce(item, index, 'icon');
      }}
    />
  );
  const renderItemProf = ({ item, index }) => (
    <ActivityResourceCard
      type={'professor'}
      item={item}
      index={index}
      progresscount={progresscount}
      activities={profres}
      onPress={() => {
        profgotoActivityResouce(item, index, 'professor');
      }}
    />
  );
  const handleSave = () => {};
  showDatePicker = () => {
    this.setState({ showpicker: true });
  };

  hideDatePicker = () => {
    setShowPicker(false);
    //setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
    if (date > new Date()) {
      setShowPicker(false);
      setdateformar(moment(new Date(date)).format('YYYY-MM-DD hh:mm:ss'));
      setshowerrormodel(false);
    } else {
      setShowPicker(false);
      setdateformar(moment(new Date()).format('YYYY-MM-DD hh:mm:ss'));
      setshowerrormodel(true);
    }
  };
  hideDatePickertime = () => {
    setShowPicker(false);
  };
  handleModalClose = () => {
    setShowPicker(false);
  };

  const renderTab = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.tabItem,
        {
          backgroundColor:
            selectedIndex === item.id ? COLORS.appSecondaryColor : '#F8F8F8',
        },
      ]}
      onPress={() => setSelectedIndex(item.id)}
    >
      <Text
        style={[
          styles.tabText,
          {
            color: selectedIndex === item.id ? COLORS.whiteColor : COLORS.black,
          },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  const onanalysis = () => {
    navigation.navigate('TopicAnalysis', {
      from: 'topics',
      data: topicItem,
      topicsdata: chapterItem,
      subjectData: subjectItem,
    });
  };
  return (
    <>
      <DynamicHeader
        backAction={() => {
          // Handle back button press
          if (
            route.params.from === 'heatmap' ||
            route.params.from === 'calender'
          ) {
            goBack(navigation);
          } else if (route.params.from === 'progresstopics') {
            getTopicsProgress({
              dispatch,
              userId: user?.userInfo?.userId,
            });
            goBack(navigation);
          } else {
            getTopicsProgress({
              dispatch,
              userId: user?.userInfo?.userId,
            });
            navigation.navigate('MyTopics', {
              chapterItem: route.params.chapterItem,
              subjectItem: route.params.subjectItem,
            });
          }
        }}
        onanalysis={onanalysis}
        imageSource={
          topicItem?.image
            ? { uri: topicItem?.image }
            : imagePaths.myChapters.headerImage
        }
        labelsRow={true}
        title={topicItem?.topicName ? topicItem?.topicName : topicItem.title}
        righticon={require('../../../assets/images/analytics.png')}
      />
      <ScrollView>
        {profres.length > 0 ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 10,
              }}
            >
              {tabs.map(renderTab)}
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setshowmodal(true)}
              >
                <Ionicons
                  name='calendar'
                  size={22}
                  color={COLORS.appSecondaryColor}
                />
              </TouchableOpacity>
            </View>

            {selectedIndex === '1' ? (
              <>
                <View style={styles.rowContainer}>
                  <FlatList
                    data={activities}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.rowContainer}>
                  <FlatList
                    data={profres}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItemProf}
                  />
                </View>
              </>
            )}
          </View>
        ) : (
          <>
            <View style={styles.rowContainer}>
              <Button
                style={styles.button}
                title={'Activity Resources'}
                textStyle={styles.buttonText}
                onPress={() => {}}
              />

              {/* Icon */}
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setshowmodal(true)}
              >
                <Ionicons
                  name='calendar'
                  size={24}
                  color={COLORS.appSecondaryColor}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={activities}
              keyExtractor={(item) => item.id}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </>
        )}
        {recommendedarray && recommendedarray?.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.appSecondaryColor,
                marginLeft: 15,
                marginVertical: 10,
              }}
            >
              Recommended Topics
            </Text>
            <FlatList
              data={recommendedarray}
              keyExtractor={(item) => item.topicId}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItemTopics}
              ItemSeparatorComponent={ItemSeparator}
            />
          </>
        ) : null}

        <Modal isVisible={showmodal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: width / 1.2,
                backgroundColor: 'white',
                marginVertical: 15,
              }}
            >
              <View style={{ backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => setshowmodal(false)}>
                  <Image
                    source={require('../../../assets/images/cancel.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.appSecondaryColor,
                      alignSelf: 'flex-end',
                      marginVertical: 10,
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ paddingBottom: 20 }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      Schedule for later
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setShowPicker(true)}
                      style={{
                        height: 50,
                        width: width / 1.5,
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        paddingLeft: 10,
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>
                        {dateformar || date || 'Select Date and Time'}
                      </Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={showpicker}
                      mode='datetime'
                      date={
                        new Date(date) || new Date(dateformar) || new Date()
                      }
                      minimumDate={new Date()}
                      // minimumDate={new Date(Date.now())}
                      onConfirm={handleConfirm}
                      onCancel={handleModalClose}
                    />

                    {showerrormodel ? (
                      <Text style={{ color: 'red' }}>
                        Please select the time in future
                      </Text>
                    ) : null}
                  </View>
                  {showerrormodel ? null : (
                    <TouchableOpacity
                      onPress={addtocalendernew}
                      style={{
                        height: 50,
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.appSecondaryColor,
                        alignSelf: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        Add To Calendar
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default ActivityResources;
