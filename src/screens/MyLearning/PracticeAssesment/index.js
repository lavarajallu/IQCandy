//PreAssessment
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  View,
  Text,
  Platform,
  SafeAreaView,
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
import { textContent } from '../../../constants/content';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import {
  getTestQuestionsData,
  getQuestionByIdPractice,
  validateAnswerapiPractice,
  endTestapiPractice,
} from '../../../api/myLearning';
import Modal from 'react-native-modal';
import { selectMyLearning } from '../../../store/student/myLearning/selector';

const PracticeAssesment = ({ route, navigation }) => {
  const { questions } = textContent;
  const { topicItem, chapterItem, subjectItem, from, data } = route.params;
  const { user } = useSelector(selectUser);
  const { testQuestionsData, questionDatabyId, endTesetdatapractice } =
    useSelector(selectMyLearning);
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
  const [showdata, setshowdata] = useState(false);
  //const [sorryalertone, setsorryalertone] = useState(false);

  var bottomwidth = 100,
    bototmheight = 30,
    radius = 20;
  var interval;
  const backAction = () => {
    clearInterval(interval);
    setSelectedItem({});
    setAnswerObj({});
    setFinalArray([]);
    setTestQuestionsData([]);
    setshowdata(false);
    navigation.navigate('MyPracticeChapters', {
      subjectItem: route.params.data,
    });
  };
  useEffect(() => {
    var userId = user?.userInfo.userId;

    var boardId = user?.userOrg.boardId;
    var branchId = user?.userOrg.branchId;
    var semesterId = user?.userOrg.semesterId;

    var subjectId = route.params.data.subjectId;

    var chapterId = route.params.data.chapterId;

    var userTestId = route.params.data.id;
    var url;
    var method;
    var body = null;
    if (route.params.attempttime === 1) {
      method = 'GET';
      if (
        route.params.data.testType === 'chapter' ||
        route.params.data.testType === 'Chapter'
      ) {
        url = `/boards/${boardId}/subjects/${subjectId}/practice-tests/${userTestId}/questions?userId=${userId}&testType=${route.params.data.testType}&chapterId=${chapterId}`;
      } else {
        url = `/boards/${boardId}/subjects/${subjectId}/practice-tests/${userTestId}/questions?userId=${userId}&testType=${route.params.data.testType}`;
      }
    } else {
      method = 'POST';

      url = `/boards/${boardId}/subjects/${subjectId}/practice-test/${route.params.data.testType}/re-attempt`;
      body = {
        userId,
        chapterId,
        testType: route.params.testType,
      };
    }

    getTestQuestionsData({
      dispatch,
      method,
      url,
      data: body,
    });
  }, [user]);
  useEffect(() => {
    var newarray = [];

    if (testQuestionsData?.data?.length > 0) {
      newarray = testQuestionsData?.data;
      console.log('sdasDASDASDAS', newarray);
    } else {
      newarray = testQuestionsData?.data?.questions;
      console.log('SDsadsadasdsd', newarray);
    }

    if (newarray && newarray?.length > 0) {
      setTestQuestionsData(newarray);

      let questions = [];
      newarray.map((res) => {
        let obj = {
          question: res.questionId,
          user_answer: null,
          test_taken_time: 1,
        };
        questions.push(obj);
      });
      setTestQuestionsData(newarray);

      setFinalArray(questions);
      setTestId(newarray[0].userTestId);
      setSeconds(newarray.length * 60);
      setSecondsTime(newarray.length * 60);
      //  starttimer();
      setModalShow(true);

      // getQuestionByIddata(1, newarray);
    }
  }, [testQuestionsData]);

  const onStartcancel = () => {
    setModalShow(false);
    setTestQuestionsData([]);
    clearInterval(interval);
    setSelectedItem({});
    setAnswerObj({});
    setFinalArray([]);
    setshowdata(false);
    navigation.navigate('MyPracticeChapters', {
      subjectItem: route.params.data,
    });
  };
  const onStartTest = () => {
    setModalShow(false);
    setLoading(false);
    starttimer();
    getQuestionByIddata(1, testQuestionsDataa);
  };
  starttimer = () => {
    interval = setInterval(() => {
      // setTimer((prevTimer) => prevTimer - 1);
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
  };
  const getQuestionByIddata = (id, restestQuestionsDataa) => {
    var testType = route.params.data.testType;

    var questionindex = newquestionid - 1;
    var userId = user?.userInfo.userId;

    var index = newquestionid;
    var userId = user?.userInfo.userId;

    var boardId = user?.userOrg.boardId;

    var subjectId = route.params.data.subjectId;

    var chapterId = route.params.data.chapterId;
    var questionId = restestQuestionsDataa?.[questionindex].questionId;
    var testId = restestQuestionsDataa?.[questionindex].userTestId;

    var url = `/boards/${boardId}/subjects/${subjectId}/practice-tests/${testId}/questions/${index}?questionId=${questionId}&userId=${userId}&testType=${testType}`;
    getQuestionByIdPractice({
      dispatch,
      url,
    });
  };
  useEffect(() => {
    if (questionDatabyId) {
      if (questionDatabyId && questionDatabyId.length > 0) {
        const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');

        setSelectedItem(questionDatabyId[0]);

        if (finalArray.length > 0) {
          finalArray.map((res, i) => {
            if (res.question === questionDatabyId[0].questionId) {
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
    // var userId = user?.userInfo?.userId;
    // var activityDimId = route.params.data.activityDimId;
    // var assignedActivityId = route.params.data.assignedActivityId;
    var index = testQuestionsDataa[newquestionid - 1].index;
    var timeTaken = secondsTime - seconds;
    // var data = {
    //   attemptStartedAt: moment().format('YYYY-MM-DD HH:mm:ss'), //this.state.activityStartTime, // YYY-MM-DD HH:MM:SS
    //   attemptEndedAt: moment()
    //     .add(timeTaken, 'seconds')
    //     .format('YYYY-MM-DD HH:mm:ss'), // YYY-MM-DD HH:MM:SS
    //   questionId: obj.question,
    //   userAnswer: obj.user_answer,
    //   userTestId: testQuestionsDataa[newquestionid - 1].userTestId,
    // };
    var boardId = user?.userOrg.boardId;

    var subjectId = route.params.data.subjectId;
    var userTestId = testQuestionsDataa[newquestionid - 1].userTestId;
    //    var timeTaken = this.state.secondstime - this.state.seconds;
    // var index = this.state.getquestionsdata[this.state.newquestionid - 1].index;
    var url = `/boards/${boardId}/subjects/${subjectId}/practice-tests/${userTestId}/questions/${index}/validate`;
    var data = {
      attemptStartedAt: moment().format('YYYY-MM-DD HH:mm:ss'), //this.state.activityStartTime, // YYY-MM-DD HH:MM:SS
      attemptEndedAt: moment()
        .add(timeTaken, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss'), // YYY-MM-DD HH:MM:SS
      questionId: obj.question,
      testType: route.params.data.testType,
      userId: user?.userInfo.userId,
      userAnswer: obj.user_answer,
      //   userTestId: this.state.getquestionsdata[this.state.newquestionid-1].userTestId,
    };
    validateAnswerapiPractice({
      data: data,
      dispatch,
      userId: user?.userInfo?.userId,
      url,
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
              width: '90%',
              marginTop: Platform.OS === 'android' ? 5 : 0,

              marginLeft: 10,
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

    getQuestionByIddata(newquestionid - 1, testQuestionsDataa);
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
      getQuestionByIddata(newquestionid + 1, testQuestionsDataa);
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
    var boardId = user?.userOrg.boardId;

    var subjectId = route.params.data.subjectId;
    //  var questionPaperId = this.props.item.questionPaperId
    var questionindex = newquestionid - 1;

    var userId = user?.userInfo.userId;

    var testId = testQuestionsDataa[newquestionid - 1].userTestId;
    var url = `/boards/${boardId}/subjects/${subjectId}/practice-tests/${testId}/end`;
    clearInterval(interval);
    setVisiblemodal(false);
    setfinalload(true);
    setSelectedItem({});
    endTestapiPractice({
      dispatch,
      url,
    });
    navigation.navigate('PracticeSummary', {
      item: route.params.data,
      testId: testId,
      testdata: selectedItem,
      from: 'assesment',
      selectedata: route.params.data,
      subjectData: route.params.subjectData,
    });
  };
  useState(() => {
    if (endTesetdatapractice && endTesetdatapractice === 201) {
    }
  }, [endTesetdatapractice]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Practice Test'} />

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
                  {parseInt(seconds / 60, 10)}:{parseInt(seconds % 60, 10)}
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
                          data={selectedItem?.options}
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
            <Text>No data</Text>
            <TouchableOpacity onPress={() => backAction()}>
              <Text>GO BACK</Text>
            </TouchableOpacity>
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
              20mins to finish the test
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
                ? 'Time up! Please submit your assessment'
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
                  <Text style={{ color: 'white', fontSize: 14 }}>CANCEL</Text>
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
                  <Text style={{ color: 'white', fontSize: 14 }}>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PracticeAssesment;
