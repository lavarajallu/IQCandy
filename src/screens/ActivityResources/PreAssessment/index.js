//PreAssessment
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import moment from 'moment';
import MathJax from 'react-native-mathjax';

import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import { getAlphabetLetter, formatTime } from '../../../utils/questionUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import QuizComponent from '../../../components/QuizComponent';
import { textContent } from '../../../constants/content';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import {
  getTestQuestionsData,
  getQuestionById,
  validateAnswerapi,
  endTestapi,
  getQuestionByIdReattemptapi,
} from '../../../api/myCourses';
import Modal from 'react-native-modal';
const PreAssessment = ({ route, navigation }) => {
  const { questions } = textContent;
  const { topicItem, chapterItem, subjectItem, from, data } = route.params;
  const { user } = useSelector(selectUser);
  const {
    testQuestionsData,
    questionDatabyId,
    validatedanswer,
    questionDatabyIdreattempt,
    endtestdata,
  } = useSelector(selectMyCourses);
  const dispatch = useDispatch();
  const [testQuestionsDataa, setTestQuestionsData] = useState([]);
  const [testId, setTestId] = useState('');
  const [finalArray, setFinalArray] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [secondsTime, setSecondsTime] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [noData, SetNodata] = useState(false);
  const [newquestionid, setnewquestionid] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answerobj, setAnswerObj] = useState({});
  const [timeUp, setTimeUp] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [spinner, setSpinner] = useState(true);
  const [visiblemodal, setVisiblemodal] = useState(false);
  const [finaload, setfinalload] = useState(false);
  const [reattempt, setReattempt] = useState(false);
  const [sorryalert, setsorryalert] = useState(false);
  const [showsummary, setshowsummary] = useState(false);
  var interval;
  var bottomwidth = 100,
    bototmheight = 30,
    radius = 20;
  const backAction = () => {
    clearInterval(interval);
    setSelectedItem({});
    setAnswerObj({});
    setFinalArray([]);
    navigation.navigate('ActivityResources', {
      topicItem: route.params.topicItem,
      chapterItem: route.params.chapterItem,
      subjectItem: route.params.subjectItem,
      from: route.params.from,
    });
  };
  useEffect(() => {
    var activityDimId = data.activityDimId;
    var assignedActivityId = data.assignedActivityId;

    getTestQuestionsData({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: activityDimId,
      assignedActivityId: assignedActivityId,
    });
  }, [user]);
  useEffect(() => {
    if (testQuestionsData && testQuestionsData.length > 0) {
      if (data.activityType === 'pre') {
        if (testQuestionsData[0].analysis) {
          SetNodata(true);
          setsorryalert(true);
        } else {
          let questions = [];
          testQuestionsData.map((data) => {
            let obj = {
              question: data.questionId,
              user_answer: null,
              test_taken_time: 1,
            };
            questions.push(obj);
          });
          setTestQuestionsData(testQuestionsData);

          setFinalArray(questions);
          setTestId(testQuestionsData[0].userTestId);
          setSeconds(testQuestionsData.length * 60);
          //setSeconds(10);
          setSecondsTime(testQuestionsData.length * 60);
          setModalShow(true);
        }
      }
    }
  }, [testQuestionsData]);

  const onStartcancel = () => {
    setModalShow(false);
    clearInterval(interval);
    setSelectedItem({});
    setAnswerObj({});
    setFinalArray([]);
    navigation.navigate('ActivityResources', {
      topicItem: route.params.topicItem,
      chapterItem: route.params.chapterItem,
      subjectItem: route.params.subjectItem,
      from: route.params.from,
    });
  };
  const onStartTest = () => {
    setModalShow(false);
    setLoading(false);
    starttimer();
    getQuestionByIddata(1);
  };
  starttimer = () => {
    interval = setInterval(() => {
      // setSeconds((seconds) => seconds - 1);
      // if (seconds == 0) {
      //   clearInterval(interval);
      //   setTimeUp(true);
      //   onSubmit();
      // }
      setSeconds((seconds) => {
        // Check if time is up
        if (seconds <= 0) {
          clearInterval(interval); // Stop the timer
          setTimeUp(true);
          Alert.alert(
            "Time's up!",
            'Your test will be submitted automatically',
            [
              {
                text: 'OK',
                onPress: () => {
                  onSubmit();
                },
              },
            ]
          ); // Show alert
          return 0;
        }
        return seconds - 1;
      });
    }, 1000); // Run every second

    // Clean up function
    return () => clearInterval(timerInterval);

    //  }, 1000);
  };
  const getQuestionByIddata = (id) => {
    var questionindex = id - 1;
    var userId = user?.userInfo?.userId;
    var activityDimId = data.activityDimId;
    var assignedActivityId = data.assignedActivityId;
    var index = id;
    var questionId = testQuestionsDataa[questionindex].questionId;
    var testId = testQuestionsDataa[questionindex].userTestId;
    getQuestionById({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: activityDimId,
      index: index,
      testId: testQuestionsDataa[questionindex].userTestId,
      questionId: testQuestionsDataa[questionindex].questionId,
      assignedActivityId: assignedActivityId,
    });
  };
  useEffect(() => {
    if (questionDatabyId) {
      if (questionDatabyId && Object.keys(questionDatabyId).length > 0) {
        const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');

        setSelectedItem(questionDatabyId);

        if (finalArray.length > 0) {
          finalArray.map((res, i) => {
            if (res.question === questionDatabyId.questionId) {
              let obj = {
                question: res.question,
                user_answer: res.user_answer,
                test_taken_time: res.test_taken_time,
              };
              setAnswerObj(res);
            }
          });
        }
        setLoading(false);
        setSpinner(false);
      }
    }
  }, [questionDatabyId]);

  const onAnswer = (res) => {
    var answerkey = res.key;
    var questionId = selectedItem.questionId;
    var timecount = seconds;

    var timess = secondsTime - timecount;
    let data = [...finalArray];
    let index = data.findIndex((p) => p.question === selectedItem.questionId);

    let obj = data[index];
    if (obj) {
      obj.user_answer = answerkey;
      obj.test_taken_time = timess;
      data[index] = Object.assign({}, obj);
      setFinalArray(data);
      setAnswerObj(obj);
      validateAnswer(obj);
    }
  };
  const validateAnswer = (obj) => {
    var userId = user?.userInfo?.userId;
    var activityDimId = route.params.data.activityDimId;
    var assignedActivityId = route.params.data.assignedActivityId;
    var index = testQuestionsDataa[newquestionid - 1].index;
    var timeTaken = secondsTime - seconds;
    var data = {
      attemptStartedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      attemptEndedAt: moment()
        .add(timeTaken, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss'), // YYY-MM-DD HH:MM:SS
      questionId: obj.question,
      userAnswer: obj.user_answer,
      userTestId: testQuestionsDataa[newquestionid - 1].userTestId,
    };
    validateAnswerapi({
      data: data,
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: activityDimId,
      index: index,
      assignedActivityId: assignedActivityId,
    });
  };
  const rednerAnswerItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onAnswer(item)}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            marginHorizontal: 10,
            borderWidth: 1,
            marginTop: 10,
            borderColor:
              answerobj.user_answer === item.key ? 'green' : 'lightgrey',
          }}
        >
          <Text style={{ alignSelf: 'center', marginLeft: 10 }}>
            {`${getAlphabetLetter(index)}`}
          </Text>

          <MathJax
            mathJaxOptions={{
              messageStyle: 'none',
              extensions: [
                'mml2jax.js',
                'MathMenu.js',
                'MathZoom.js',
                'AssistiveMML.js',
                'a11y/accessibility- menu.js',
                'tex2jax.js',
              ],
              jax: ['input/MathML', 'input/TeX', 'output/HTML-CSS'],
              tex2jax: {
                inlineMath: [
                  ['$', '$'],
                  ['\\(', '\\)'],
                ],
                displayMath: [
                  ['$$', '$$'],
                  ['\\[', '\\]'],
                ],
                processEscapes: true,
              },
              TeX: {
                extensions: [
                  'AMSmath.js',
                  'AMSsymbols.js',
                  'noErrors.js',
                  'noUndefined.js',
                ],
              },
            }}
            style={{
              //backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
              width: '90%',
              marginTop: Platform.OS === 'android' ? 5 : 0,
              // borderWidth: 1,
              // borderRadius:10,
              // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
              marginLeft: 10,
              // justifyContent: "center",
              // alignSelf: 'flex-start',
            }}
            html={item.value}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const onPrevious = () => {
    setSpinner(true);
    setnewquestionid(newquestionid - 1);
    setSecondsTime(seconds);

    if (finalArray.length > 0) {
      finalArray.map((res, i) => {
        if (res.question === selectedItem.questionId) {
          setAnswerObj(res);
        } else {
          setAnswerObj({});
        }
      });
    }

    getQuestionByIddata(newquestionid - 1);
  };
  const onNext = () => {
    const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    if (answerobj.user_answer === null) {
      alert('please select option');
    } else {
      setSpinner(true);
      setnewquestionid((newquestionid) => newquestionid + 1);
      setSecondsTime(seconds);
      setAnswerObj({});
      getQuestionByIddata(newquestionid + 1);
    }
  };

  const onSubmitTest = () => {
    setshowsummary(true);
    setVisiblemodal(true);
  };

  const onCancel = () => {
    setVisiblemodal(false);
  };
  const onSubmit = () => {
    clearInterval(interval);
    setVisiblemodal(false);
    setfinalload(true);
    setSelectedItem({});
    endTestapi({
      dispatch,
      userId: user?.userInfo?.userId,
      activityDimId: data.activityDimId,
      testId: testId,
      assignedActivityId: data.assignedActivityId,
    });
    navigation.navigate('Summary', {
      index: route.params.index,
      type: 'reset',
      testtype: data.activityType,
      chapterItem: chapterItem,
      subjectItem: subjectItem,
      data: data,
      testId: testId,
      topicItem: topicItem,
      smartres: route.params.smartres,
      from: route.params.from,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Pre Assessment'} />

      <View style={[styles.container, styles.shadowProp]}>
        {loading ? (
          <View style={styles.mainVew}>
            <Text>Loading...</Text>
          </View>
        ) : testQuestionsDataa.length > 0 &&
          Object.keys(selectedItem).length > 0 ? (
          <View
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            <View style={styles.topView}>
              <Text
                style={styles.topViewheader}
              >{`Question ${newquestionid} of ${testQuestionsDataa?.length}`}</Text>

              <View style={styles.timerView}>
                <Ionicons name='timer' size={20} color={COLORS.whiteColor} />
                <Text style={styles.timerText}>
                  {parseInt(seconds / 60, 10) < 10
                    ? '0' + parseInt(seconds / 60, 10)
                    : parseInt(seconds / 60, 10)}
                  :
                  {parseInt(seconds % 60, 10) < 10
                    ? '0' + parseInt(seconds % 60, 10)
                    : parseInt(seconds % 60, 10)}
                </Text>
              </View>
            </View>
            {spinner ? (
              <View style={styles.mainVew}>
                <Text style={{ fontSize: 13 }}>Loading....</Text>
              </View>
            ) : (
              <>
                <View style={{ flex: 0.84 }}>
                  <ScrollView>
                    <View style={styles.mainScrollview}>
                      <View style={styles.scrollinside}>
                        <Text style={styles.questionidtext}>
                          {newquestionid}.
                        </Text>

                        <MathJax
                          mathJaxOptions={{
                            messageStyle: 'none',
                            extensions: [
                              'mml2jax.js',
                              'MathMenu.js',
                              'MathZoom.js',
                              'AssistiveMML.js',
                              'a11y/accessibility- menu.js',
                              'tex2jax.js',
                            ],
                            jax: [
                              'input/MathML',
                              'input/TeX',
                              'output/HTML-CSS',
                            ],
                            tex2jax: {
                              inlineMath: [
                                ['$', '$'],
                                ['\\(', '\\)'],
                              ],
                              displayMath: [
                                ['$$', '$$'],
                                ['\\[', '\\]'],
                              ],
                              processEscapes: true,
                            },
                            TeX: {
                              extensions: [
                                'AMSmath.js',
                                'AMSsymbols.js',
                                'noErrors.js',
                                'noUndefined.js',
                              ],
                            },
                          }}
                          style={styles.mathjaxtext}
                          html={selectedItem.question}
                        />
                      </View>
                      <View>
                        <FlatList
                          data={selectedItem.options}
                          extraData={route.params}
                          keyExtractor={(item, index) => item.index}
                          renderItem={(item, index) =>
                            rednerAnswerItem(item, index)
                          }
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
                {testQuestionsDataa.length > 0 ? (
                  <View style={styles.bottomView}>
                    <View style={styles.bottomsubview}>
                      {newquestionid - 1 === 0 ? (
                        <View style={{ flex: 0.5 }} />
                      ) : (
                        <View style={styles.previousview}>
                          <TouchableOpacity
                            style={[
                              styles.previousbutton,
                              {
                                height: bototmheight,
                                width: bottomwidth,
                                borderRadius: radius,
                              },
                            ]}
                            onPress={onPrevious}
                          >
                            <Text style={styles.buttontext}>Previous</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      <View style={styles.nextbuttonView}>
                        {newquestionid === testQuestionsDataa.length ? (
                          <TouchableOpacity
                            style={[
                              styles.previousbutton,
                              {
                                height: bototmheight,
                                width: bottomwidth,
                                borderRadius: radius,
                              },
                            ]}
                            onPress={onSubmitTest}
                          >
                            <Text style={styles.buttontext}>Submit</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[
                              styles.previousbutton,
                              {
                                height: bototmheight,
                                width: bottomwidth,
                                borderRadius: radius,
                              },
                            ]}
                            onPress={onNext}
                          >
                            <Text style={styles.buttontext}>Next</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                ) : null}
              </>
            )}
          </View>
        ) : sorryalert ? (
          <View style={styles.mainVew}>
            <View style={styles.sorryview}>
              <Text style={styles.sorrytext}>
                Sorry You have reached maximum number of attempts in this
                assignment
              </Text>
              <View style={styles.buttonViewsorry}>
                <TouchableOpacity
                  onPress={() => backAction()}
                  style={styles.innerbuttonview}
                >
                  <Text style={{ color: COLORS.appSecondaryColor }}>
                    GO BACK
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => backAction()}
                  style={styles.innerbuttonview}
                >
                  <Text style={{ color: COLORS.appSecondaryColor }}>
                    Review Previous Tests
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainVew}>
            <Text style={{ fontSize: 13 }}>Loading....</Text>
          </View>
        )}
      </View>

      <Modal isVisible={modalShow}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 15,
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              You are about to begin the assessment. Once you begin you have
              5mins to finish the test
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                marginTop: 10,
                fontWeight: '600',
              }}
            >
              {' '}
              Are you ready to begin?{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={() => onStartcancel()}>
                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: 'red',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 15 }}>CANCEL</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onStartTest()}>
                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: 'green',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 15 }}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal isVisible={visiblemodal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 15,
              marginVertical: 15,
            }}
          >
            {/* <Image
                  source={require('../../assets/images/finger.png')}
                  style={{
                    width: 96 / 1.5,
                    height: 96 / 1.5,
                    alignSelf: 'center',
                  }}
                /> */}
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {timeUp
                ? 'Time up! Test will be submitte automatcally'
                : 'Are you sure you want to submit assessment?'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={onCancel}>
                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    backgroundColor: COLORS.appSecondaryColor,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 14 }}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSubmit}>
                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    backgroundColor: COLORS.appSecondaryColor,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 14 }}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PreAssessment;
