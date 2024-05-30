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
import { getrecommendedtopicActivities } from '../../api/myCourses';

const { width, height } = Dimensions.get('window');

const RecommendedActivityResources = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [showmodal, setshowmodal] = useState(false);

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

  const { user } = useSelector(selectUser);
  const { recommtopicActivities } = useSelector(selectMyCourses);
  const topicitem = route.params.topicitem;
  const { chapterItem, subjectItem, from } = route.params;
  useEffect(() => {
    getrecommendedtopicActivities({
      userId: user?.userInfo?.userId,

      dispatch,
      universalTopicId: topicitem?.universalTopicId,
    });
  }, [user]);

  useEffect(() => {}, [recommtopicActivities]);

  const renderItem = ({ item, index }) => (
    <ActivityResourceCard
      type={'recommtopicActivities'}
      item={item}
      index={index}
      activities={recommtopicActivities}
      progresscount={progresscount}
      onPress={() => {
        gotoActivityResouce(item, index, 'recommtopicActivities');
      }}
    />
  );
  const gotoActivityResouce = (item, index, type) => {
    const topicItem = topicitem;
    const newarray = recommtopicActivities;
    // if (item.activityType === 'pre') {
    //   navigation.navigate('PreAssessment', {
    //     type,
    //     index,
    //     smartres: newarray,
    //     data: item,
    //     chapterItem: chapterItem,
    //     subjectItem: subjectItem,
    //     topicItem: topicItem,
    //     from: from,
    //   });
    // } else if (item.activityType === 'post') {
    //   navigation.navigate('PostAssessment', {
    //     type,
    //     index,
    //     smartres: newarray,
    //     data: item,
    //     chapterItem: chapterItem,
    //     subjectItem: subjectItem,
    //     topicItem: topicItem,
    //     from: from,
    //   });
    //  } else
    if (
      item.activityType === 'video' ||
      item.activityType === 'conceptual_video'
    ) {
      navigation.navigate('VideoActivityPro', {
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
      item.activityType === 'web' ||
      item.activityType === 'games'
    ) {
      navigation.navigate('ProfPdfViewNew', {
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
      navigation.navigate('YtVideoActivityPro', {
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
  };

  return (
    <>
      <DynamicHeader
        backAction={() => {
          // Handle back button press
          goBack(navigation);
        }}
        imageSource={
          topicitem?.image
            ? { uri: topicitem?.image }
            : imagePaths.myChapters.headerImage
        }
        labelsRow={true}
        title={topicitem?.topicName ? topicitem?.topicName : topicitem.name}
      />
      <>
        <View style={styles.rowContainer}>
          <Button
            style={styles.button}
            title={'Activity Resources'}
            textStyle={styles.buttonText}
            onPress={() => {}}
          />

          {/* Icon */}
        </View>

        <FlatList
          data={recommtopicActivities}
          keyExtractor={(item) => item.id}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </>
    </>
  );
};

export default RecommendedActivityResources;
