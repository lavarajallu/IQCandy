
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { goBack } from '../../utils/navigationUtils';
import { COLORS } from '../../constants/colors';
import Header from '../../components/Header';
//import styles from "./styles"
import ColumnChart from './ColumnChart.js';
import PieChart from 'react-native-pie-chart'

import TimeSpentChart from './TimeSpentChart';
import { selectUser } from '../../store/authManagement/selector';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage or the storage library you're using

const windowWidth = Dimensions.get('window').width;
const TopicAnalysis = ({ route, navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [spinner, setspinner] = useState(true);
  const [isvisible, setisvisible] = useState(false);
  const [weblinkdata, setweblinkdata] = useState(null);
  const [analyticsData, setanalyticsData] = useState({});
  const [topicpercentarray, settopicpercentarray] = useState([]);
  const [completeincomplearray,setcompleteincomplearray] = useState([])
  const [topicactivitesdata, settopicactivitesdata] = useState([]);
  const [tableHead, settableHead] = useState([]);
  const [tableData, settableData] = useState([]);
  const [timespentquestions, settimespentquestions] = useState([]);
  const [quesloading, setquesloading] = useState(true);
  const [loading, setloading] = useState(true);
  const [studenteasydaata, setstudenteasydaata] = useState({});
  const [timespinner, settimespinner] = useState(true);
  const [graphvalue, setgraphvalue] = useState(0);
  const [userDetails, setuserDetails] = useState('');
  const [topicanalysisdata, settopicanalysisdata] = useState('');
  const [datanewprogressitemlist,setnewprogressitemlist] = useState([])

  useEffect(() => {


    fetchdata();
  }, [user])
  const fetchdata = async () => {
    const authToken = await AsyncStorage.getItem('userToken');
    var userId = user?.userInfo.userId;
    var topicId = route.params.data.topicId;
    var universalTopicId = route.params.data.universalTopicId;
    fetch(
      'https://api.iqcandy.com/api/iqcandy' +
      `/analytics/users/${userId}/topics/${topicId}/analysis?universalTopicId=${universalTopicId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          jwt: authToken,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 201) {
          var topicAnalysisData = json.data;
          if (json.data.topicProgress?.totalProgress) {
            var completion = parseInt(json.data.topicProgress.totalProgress);
         //   alert(JSON.stringify(json.data.topicProgress))
            var completepercent = completion ? Math.round(completion) : 0;
            var incompletepercent = completion
              ? Math.round(100 - completion)
              : 100;
            // var obj1 = {
            //   y: incompletepercent,
            //   x: 'Incomplete',
            // };
            var obj2 = {
              percentage: incompletepercent+"%",
              color: '#F94D48',
              name: "Incomplete"
            }
            var obj1 = {
              percentage: completepercent+"%",
              color: '#A3BA6D',
              name: "Complete"
            }
            // var obj2 = {
            //   y: completepercent,
            //   x: "Complete",
            //  // name: 'Complete',
            // };
            const widthAndHeight = 250
            const series = [completepercent, incompletepercent]
           // alert(JSON.stringify(series))
            const sliceColor = ['#A3BA6D', '#F94D48']
            var newarr = [];
            newarr.push(obj1);
            newarr.push(obj2);
            console.log('ffff.....', newarr);
            settopicpercentarray(series)
            setcompleteincomplearray(newarr)
            setloading(false)
          } else {
            var obj1 = {
              percentage: 100,
              color: '#F94D48',
              name: "Incomplete"
            }
            var obj2 = {
              percentage: 0,
              color: '#A3BA6D',
              name: "Complete"
            }
            const series = [0, 100]
            var newarr = [];
            newarr.push(obj1);
            newarr.push(obj2);
            settopicpercentarray(series)
            setloading(false)

          }
          if (topicAnalysisData?.userTestQuestions?.length) {
            var timeSpentData = json.data.timeSpent;
            let progressItemList = [];
            let newprogressitemlist = []
            if (timeSpentData?.length > 0) {
              const timeSpendActivities = timeSpentData.filter(
                (tsd) => !['pre', 'post'].includes(tsd.activityType)
              );
              const totalSpentTime = timeSpendActivities.reduce(
                (accum, item) => accum + Math.round(item.timeSpent),
                0
              );
            
              timeSpendActivities.map((tsd) => {
                let keyName = !['pre', 'post'].includes(tsd.activityType)
                  ? tsd.activityType === 'conceptual_video'
                    ? 'CONCEPTUAL VIDEO'
                    : tsd.activityType === 'html5'
                      ? 'NOTES'
                      : tsd.activityType
                  : '';
                if (keyName) {
                  let progressItem = {
                    name: keyName.toUpperCase(),
                    y: Math.round((tsd.timeSpent * 100) / totalSpentTime), //tsd.timeSpent / totalSpentTime,
                    value: tsd,
                    percent: (tsd.timeSpent / totalSpentTime).toFixed(2) * 100,
                  };
                  let newitem = Math.round((tsd.timeSpent * 100) / totalSpentTime)
                  progressItemList.push(progressItem);
                  newprogressitemlist.push(newitem)
                }
              });
             // alert(JSON.stringify(newprogressitemlist))
            }
            var graphvalue = 0;
            progressItemList =
              progressItemList && progressItemList.filter((pl) => pl.y !== 0);
            progressItemList.map((res, i) => {
              graphvalue = graphvalue + res.percent;
            });
          
            if (topicAnalysisData?.userTestQuestions?.length) {
              var diffLevelTopicAnalysisObj = {};
              var questionAnalysis = [];
              const queTypeObj = {
                Remember: 0,
                Understand: 0,
                Apply: 0,
                Analyze: 0,
                Evaluate: 0,
                Create: 0,
              };
              Object.keys(queTypeObj).map((qType) => {
                const correctQuestionsCount =
                  topicAnalysisData.userTestQuestions.filter(
                    (ut) => ut.score === 0 && ut.questionType === qType
                  ).length;
                const wrongQuestionsCount =
                  topicAnalysisData.userTestQuestions.filter(
                    (ut) => ut.score !== 0 && ut.questionType === qType
                  ).length;
                questionAnalysis.push({
                  skill: qType,
                  total: correctQuestionsCount + wrongQuestionsCount,
                  correct: correctQuestionsCount,
                  wrong: wrongQuestionsCount,
                });
              });
              let finalsample = [];
              questionAnalysis.map((res, i) => {
                let sample = [];
                sample.push(res.skill);
                sample.push(res.total);
                sample.push(res.correct);
                sample.push(res.wrong);
                finalsample.push(sample);
              });
              var tableHead = [
                'Skills',
                'Total Questions',
                'No Of Correct Questions',
                'No Of Wrong Questions',
              ];
              var tableData = finalsample;
              console.log('tableHead', tableHead);
              console.log('tabledataaaa', tableData);
              // { correct: 1, inCorrect: 2, unAnswered: 0 }

              const diffLevelObj = {
                Easy: 0,
                Medium: 0,
                Hard: 0,
              };
              Object.keys(diffLevelObj).map((diffLevel) => {
                const correctQuestionsCount =
                  topicAnalysisData.userTestQuestions.filter(
                    (ut) => ut.score === 1 && ut.diffLevel === diffLevel
                  ).length;
                const wrongQuestionsCount =
                  topicAnalysisData.userTestQuestions.filter(
                    (ut) => ut.score === 0 && ut.diffLevel === diffLevel
                  ).length;
                diffLevelTopicAnalysisObj[diffLevel] = {
                  correct: correctQuestionsCount,
                  inCorrect: wrongQuestionsCount,
                };
              });
              console.log('dancjladnckldaf', diffLevelTopicAnalysisObj);
            }
            setloading((loading) => {
              settopicanalysisdata(json.data)
              settopicactivitesdata(progressItemList)
              setnewprogressitemlist(newprogressitemlist)
              setgraphvalue(graphvalue)
              settableHead(tableHead)
              settableData(tableData)
              setstudenteasydaata(diffLevelTopicAnalysisObj)
              if (tableData || diffLevelTopicAnalysisObj) {
                setquesloading(false)

              }
              return false
            })

            // console.log(".dksnack.acnk",diffLevelTopicAnalysisObj,questionAnalysis)
          } else {
            setquesloading(false)

          }
        }
      })
      .catch((error) => console.error(error));
  }
  const backAction = () => {
    goBack(navigation)

  }
  var colorarray = [
    '#F94D48',
    '#30A6DC',
  ];
  var backheight = 30,
    headfont = 20,
    subfont = 15,
    paddingver = 10,
    pieheight = 300,
    pieinner = 60,
    smallcirlce = 10,
    smallfont = 12;
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Topic Analysis'} />
      <View style={[styles.container, styles.shadowProp]}>
        <View style={{ flex: 1 }}>

          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: subfont }}>Loading...</Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      width: windowWidth / 1.25,
                      backgroundColor: COLORS.appSecondaryColor,
                      alignSelf: 'center',
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: paddingver,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: subfont,
                      }}
                    >
                      Topic Analysis
                    </Text>
                  </View>
                  {topicpercentarray?.length > 0 ? (
                    <>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                      <PieChart
                        widthAndHeight={250}
                        series={topicpercentarray}
                        sliceColor={['#A3BA6D', '#F94D48']}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                      />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {completeincomplearray?.map((res, i) => (
                          <View
                            key={i}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              marginVertical:10
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  height: smallcirlce,
                                  width: smallcirlce,
                                  borderRadius: smallcirlce / 2,
                                  backgroundColor:
                                    res.name === 'Incomplete'
                                      ? '#F94D48'
                                      : '#A3BA6D',
                                }}
                              />
                              <Text
                                style={{
                                  marginLeft: 8,
                                  fontSize: smallfont,
                                }}
                              >
                                {res.name}({res.percentage})
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </>
                  ) : (
                    <Text style={{ textAlign: 'center' }}>No Data</Text>
                  )}
                  {graphvalue > 0 ? (
                    
                    <>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                      <PieChart
                        widthAndHeight={250}
                        series={datanewprogressitemlist}
                        sliceColor={colorarray}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                      />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 30,
                          flexWrap: 'wrap',
                          marginVertical:10,
                          marginBottom: 20,
                          justifyContent: 'center',
                        }}
                      >
                        {topicactivitesdata.map((res, i) =>
                          res.value ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 10,
                                
                              }}
                            >
                              <View
                                style={{
                                  height: smallcirlce,
                                  width: smallcirlce,
                                  borderRadius: smallcirlce / 2,
                                  backgroundColor: colorarray[i],
                                }}
                              />
                              <Text
                                style={{
                                  marginLeft: 8,
                                  fontSize: smallfont,
                                }}
                              >
                                {res.name}({parseInt(res.percent)}%)
                              </Text>
                            </View>
                          ) : null
                        )}
                      </View>
                    </>
                  ) : null}

                  <>
                    <View
                      style={{
                        width: windowWidth / 1.25,
                        backgroundColor: COLORS.appSecondaryColor,
                        alignSelf: 'center',
                        borderRadius: 10,
                        marginVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: paddingver,
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: subfont,
                        }}
                      >
                        Performance Analysis By Question Difficulty
                      </Text>
                    </View>
                    {quesloading ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontSize: headfont }}>
                          Loading...
                        </Text>
                      </View>
                    ) : (
                      <>
                        <ColumnChart
                          type="Easy"
                          question={studenteasydaata?.Easy}
                        />

                        <ColumnChart
                          type="Medium"
                          question={studenteasydaata?.Medium}
                        />

                        <ColumnChart
                          type="Hard"
                          question={studenteasydaata?.Hard}
                        />
                        {loading ? (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: headfont }}>
                              Loading...
                            </Text>
                          </View>
                        ) : (
                          <>
                            <View
                              style={{
                                width: windowWidth / 1.25,
                                backgroundColor: COLORS.appSecondaryColor,
                                alignSelf: 'center',
                                borderRadius: 10,
                                marginVertical: 10,
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: 'center',
                                  paddingVertical: paddingver,
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: subfont,
                                }}
                              >
                                Time Taken For Each Question
                              </Text>
                            </View>
                            <TimeSpentChart
                              topicsTimeTakenData={
                                topicanalysisdata
                              }
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.whiteColor,
  },
  container: {
    flex: 0.9,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: windowWidth * 0.03,
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
export default TopicAnalysis;
