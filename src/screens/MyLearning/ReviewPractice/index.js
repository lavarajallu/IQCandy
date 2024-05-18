import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import { selectUser } from '../../../store/authManagement/selector';
import { getassesmentsdatapractice } from '../../../api/myLearning';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import styles from './styles';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
const ReviewPractice = ({ route, navigation }) => {
  const [isvisible, setisvisible] = useState(false);
  const [testdata, settestdata] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const { actvitydata } = route.params;
  //  activityid: this.props.activityid,
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { assesmentDataPractice } = useSelector(selectMyLearning);
  const backAction = () => {
    settestdata([]);
    goBack(navigation);

    // Actions.topicmainview({
    //   from: this.props.from,
    //   type: 'reset',
    //   data: this.props.topicindata,
    //   topicsdata: this.props.topicData,
    //   screen: 'summary',
    //   subjectData: this.props.subjectData,
    // });
    // return true;
  };
  useState(() => {
    var userId = user?.userInfo.userId;
    var universityId = user?.userOrg.universityId;
    var subjectId = route.params.data.subjectId;
    var type;
    var body;
    var url;
    if (route.params.data.testType === 'Chapter') {
      type = 'Chapter';
      body = {
        chapterId: route.params.data.chapterId,
      };
      var chapterId = route.params.data.chapterId;
      url = `/universities/${universityId}/subjects/${subjectId}/practice-tests/${type}/list?userId=${userId}&chapterId=${chapterId}&testType=Chapter`;
    } else {
      type = 'Subject';
      url = `/universities/${universityId}/subjects/${subjectId}/practice-tests/${type}/list?userId=${userId}`;
    }
    getassesmentsdatapractice({
      dispatch,
      userId: user?.userInfo?.userId,
      url,
    });
  }, [user]);
  useState(() => {
    var newarra = [];
    if (assesmentDataPractice && assesmentDataPractice.length > 0) {
      assesmentDataPractice.map((res, i) => {
        if (res.status === 'completed') {
          newarra.push(res);
        }
      });
      if (newarra) {
        settestdata(newarra);
      } else {
        settestdata([]);
      }
    }
  }, [assesmentDataPractice]);
  const onTest = (item) => {
    navigation.navigate('PracticeSummary', {
      data: item,
      testId: item.userTestId,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header backAction={backAction} headerTitle={'Review Tests'} />
      <ScrollView style={styles.mainview}>
        {assesmentDataPractice.length > 0
          ? assesmentDataPractice.filter(function(itm){
            return itm.status === 'completed';
          }) .map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => onTest(item)}
                style={styles.itemview}
              >
                <Text style={styles.itemtext}>
                  {'Test'} {i + 1}{' '}
                </Text>
                <View style={styles.itembottomview}>
                  <View style={styles.itemsubview}>
                    {/* {analysis.map((res,j)=> */}
                    <View>
                      <View style={styles.progressview}>
                        <View
                          style={[
                            styles.progresssubview,
                            {
                              backgroundColor:
                                item.analysis === 'Poor' ? '#c54721' : 'grey',
                            },
                          ]}
                        />
                        <View style={styles.emptyview} />
                      </View>
                      <Text style={styles.analysistext}>{'Poor'}</Text>
                    </View>
                    {/* )} */}
                  </View>
                  <View style={styles.itemsubview}>
                    {/* {analysis.map((res,j)=> */}
                    <View>
                      <View style={styles.progressview}>
                        <View
                          style={[
                            styles.progresssubview,
                            {
                              backgroundColor:
                                item.analysis === 'Average'
                                  ? '#d88414'
                                  : 'grey',
                            },
                          ]}
                        />
                        <View style={styles.emptyview} />
                      </View>
                      <Text style={styles.analysistext}>{'Average'}</Text>
                    </View>
                    {/* )} */}
                  </View>
                  <View style={styles.itemsubview}>
                    {/* {analysis.map((res,j)=> */}
                    <View>
                      <View style={styles.progressview}>
                        <View
                          style={[
                            styles.progresssubview,
                            {
                              backgroundColor:
                                item.analysis === 'Fair' ? '#267093' : 'grey',
                            },
                          ]}
                        />
                        <View style={styles.emptyview} />
                      </View>
                      <Text style={styles.analysistext}>{'Good'}</Text>
                    </View>
                    {/* )} */}
                  </View>
                  <View style={styles.itemsubview}>
                    {/* {analysis.map((res,j)=> */}
                    <View>
                      <View style={styles.progressview}>
                        <View
                          style={[
                            styles.progresssubview,
                            {
                              backgroundColor:
                                item.analysis === 'Good' ? '#a4b96e' : 'grey',
                            },
                          ]}
                        />
                        <View
                          style={{
                            width: 60,
                            height: 1,
                            backgroundColor: 'transparent',
                          }}
                        />
                      </View>
                      <Text style={styles.analysistext}>{'Excellent'}</Text>
                    </View>
                    {/* )} */}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ReviewPractice;
