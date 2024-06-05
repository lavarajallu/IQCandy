import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  FlatList,
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
import { getassesmentsdata } from '../../../api/myCourses';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import styles from './styles';
import i18n from '../../../i18n';
const ReviewTests = ({ route, navigation }) => {
  const [isvisible, setisvisible] = useState(false);
  const [testdata, settestdata] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const { actvitydata } = route.params;
  //  activityid: this.props.activityid,
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { getassesmenttests } = useSelector(selectMyCourses);
  const backAction = () => {
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
    getassesmentsdata({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: actvitydata.activityDimId,
    });
  }, [user]);
  useState(() => {
    var newarra = [];
    if (getassesmenttests && getassesmenttests.length > 0) {
      var filteredArray = getassesmenttests.filter(function (itm) {
        return itm.status === 'completed';
      });
      settestdata(filteredArray);
      //   getassesmenttests.map((res, i) => {
      //     if (res.status === 'completed') {
      //       newarra.push(res);
      //     }
      //   });
      //   if (newarra) {
      //     settestdata((testdata) => {
      //       setSpinner(false);
      //       return newarra;
      //     });
      //   } else {
      //     settestdata((newarra) => {
      //       setSpinner(false);
      //       return [];
      //     });
      //   }
    }
  }, [getassesmenttests]);
  const onTest = (item) => {
    navigation.navigate('Summary', {
      data: item,
      testId: item.id,
      screen: 'reviewtests',
    });
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onTest(item)}
        style={styles.itemview}
      >
        <Text style={styles.itemtext}>
          {i18n.t('test')} {index + 1}{' '}
          <Text style={{ marginLeft: 5 }}>({item.score})</Text>
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
                        item.analysis === 'Average' ? '#d88414' : 'grey',
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
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header backAction={backAction} headerTitle={i18n.t('reviewtests')} />
      <View style={styles.mainview}>
        {getassesmenttests?.length > 0 ? (
          <FlatList
            removeClippedSubviews={false}
            data={getassesmenttests.filter(function (itm) {
              return itm.status === 'completed';
            })}
            keyExtractor={(item) => item.id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default ReviewTests;
