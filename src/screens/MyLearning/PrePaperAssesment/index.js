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
import QuizComponent from '../../../components/QuizComponent';
import { textContent } from '../../../constants/content';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import {
  getPrPaperTestQuestionsData,
  getPrePaperQuestionById,
  endTestapi,
  validateAnswerapi,
  getsubjectivedata,
} from '../../../api/myLearning';
import Modal from 'react-native-modal';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
import i18n from '../../../i18n/index1';
import { useTranslation } from 'react-i18next';

const PrePaperAssessment = ({ route, navigation }) => {
  //const { questions } = textContent;
  const { topicItem, chapterItem, subjectItem, from, data } = route.params;
  const { user } = useSelector(selectUser);
  const { t } = useTranslation(); //i18n instance

  const {
    prepaerQuestionsData,
    prepaerQuestionbyid,
    subjectiveData,
    endtestdata,
    validatedanswer,
  } = useSelector(selectMyLearning);
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
  const [subspinner, setsubSpinner] = useState(false);
  const [visiblemodal, setVisiblemodal] = useState(false);
  const [finaload, setfinalload] = useState(false);
  const [reattempt, setReattempt] = useState(false);
  const [sorryalert, setsorryalert] = useState(false);
  const [subjectiveview, setSubjectiveview] = useState(false);
  const [subjectivedata, setSubjectivequestions] = useState([]);

  var bottomwidth = 100,
    bototmheight = 30,
    radius = 20;
  var interval;
  const backAction = () => {
    clearInterval(interval);
    setSelectedItem({});
    setAnswerObj({});
    setFinalArray([]);
    goBack(navigation);
  };
  useEffect(() => {
    var questionPaperId = data.questionPaperId;
    if (data.questionPaperTestType === 'subjective') {
      setSubjectiveview(true);
      setLoading(true);
      getsubjectivequestions();
    } else {
      getPrPaperTestQuestionsData({
        dispatch,
        userId: user?.userInfo?.userId,
        questionPaperId: questionPaperId,
      });
    }
  }, [user]);
  const getsubjectivequestions = () => {
    var questionPaperId = data.questionPaperId;
    var userId = user?.userInfo.userId;
    setSpinner(true);
    setLoading(false);

    getsubjectivedata({
      dispatch,
      userId: userId,
      questionPaperId: questionPaperId,
    });
  };
  useState(() => {
    if (subjectiveData && subjectiveData.length > 0) {
      setSubjectivequestions(subjectiveData);
      setSelectedItem(subjectiveData[0]);
      //setSpinner(false);
    }
  }, [subjectiveData]);
  useEffect(() => {
    if (prepaerQuestionsData && prepaerQuestionsData.length > 0) {
      if (prepaerQuestionsData) {
        let questions = [];
        prepaerQuestionsData.map((data) => {
          let obj = {
            question: data.questionId,
            user_answer: null,
            test_taken_time: 1,
          };
          questions.push(obj);
        });

        setTestQuestionsData(prepaerQuestionsData);
        setFinalArray(questions);
        setTestId(prepaerQuestionsData[0].userTestId);
        setSeconds(prepaerQuestionsData.length * 60);
        setSecondsTime(prepaerQuestionsData.length * 60);
        // setModalShow(true);
        onStartTest();
      } else {
        setTestQuestionsData([]);
        SetNodata(true);
      }
    }
  }, [prepaerQuestionsData]);

  const submitQuestions = () => {
    navigation.navigate('Summary');
  };
  const onStartcancel = () => {
    setModalShow(false);
  };
  const onStartTest = () => {
    setModalShow(false);
    setLoading(true);
    starttimer();
    getQuestionByIddata(1);
  };
  starttimer = () => {
    interval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(interval);
        setTimeUp(true);
      }
      // setTimer((prevTimer) => prevTimer - 1);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };
  const getQuestionByIddata = (id) => {
    var questionindex = id - 1;
    var userId = user?.userInfo?.userId;
    var activityDimId = data.activityDimId;
    var assignedActivityId = data.assignedActivityId;
    var index = id;
    var questionId = testQuestionsDataa[questionindex].questionId;
    var testId = testQuestionsDataa[questionindex].userTestId;

    var questionPaperId = data.questionPaperId;

    getPrePaperQuestionById({
      dispatch,
      userId: user?.userInfo?.userId,
      questionPaperId: questionPaperId,
      index: index,
      testId: testQuestionsDataa[questionindex].userTestId,
      questionId: testQuestionsDataa[questionindex].questionId,
    });
  };
  useEffect(() => {
    if (prepaerQuestionbyid) {
      if (prepaerQuestionbyid && Object.keys(prepaerQuestionbyid).length > 0) {
        const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');

        setSelectedItem(prepaerQuestionbyid);

        if (finalArray.length > 0) {
          finalArray.map((res, i) => {
            if (res.question === prepaerQuestionbyid.questionId) {
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
  }, [prepaerQuestionbyid]);

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
    var previousQuestionPaperId = data.questionPaperId;
    //  var questionId = selectedItem.questionId;
    // var userTestId =
    //   this.state.getquestionsdata[this.state.newquestionid - 1].userTestId;
    var timeTaken = this.state.secondstime - this.state.seconds;
    var index = this.state.getquestionsdata[this.state.newquestionid - 1].index;

    var data = {
      attemptStartedAt: moment().format('YYYY-MM-DD HH:mm:ss'), //this.state.activityStartTime, // YYY-MM-DD HH:MM:SS
      attemptEndedAt: moment()
        .add(timeTaken, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss'), // YYY-MM-DD HH:MM:SS
      questionId: obj.question,
      previousQuestionPaperId: previousQuestionPaperId,
      userAnswer: obj.user_answer,
      userTestId: testQuestionsDataa[newquestionid - 1].userTestId,
    };
    validateAnswerapi({
      data: data,
      dispatch,
      userId: user?.userInfo?.userId,
      index: index,
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

    setSpinner(true);
    setnewquestionid((newquestionid) => newquestionid + 1);
    setSecondsTime(seconds);
    setAnswerObj({});
    getQuestionByIddata(newquestionid + 1);
  };

  const onSubmitTest = () => {
    setVisiblemodal(true);
  };

  const onCancel = () => {
    setVisiblemodal(false);
  };
  const onSubmit = () => {
    clearInterval(interval);
    setVisiblemodal(false);
    setfinalload(true);
    var questionPaperId = data.questionPaperId;
    var questionindex = newquestionid - 1;

    var userId = user?.userInfo.userId;

    var testId = testQuestionsDataa[questionindex].userTestId;
    endTestapi({
      dispatch,
      userId: user?.userInfo?.userId,
      questionPaperId: questionPaperId,
      testId: testId,
    });
  };
  useState(() => {}, [endtestdata]);

  const onNextsub = () => {
    setsubSpinner(true);
    setnewquestionid(newquestionid + 1);
    setSecondsTime(seconds);

    setTimeout(() => {
      setsubSpinner(false);
      setSelectedItem(subjectiveData[newquestionid - 1]);
    }, 1500);
  };
  const onPrevioussub = () => {
    setsubSpinner(true);
    setnewquestionid(newquestionid - 1);

    setTimeout(() => {
      setSeconds(false);
      setsubSpinner(false);
      setSelectedItem(subjectiveData[newquestionid - 1]);
    }, 1500);
  };
  const onSubmitTestsub = () => {
    backAction();
    //Actions.({ type: 'reset', item: this.props.newdata });
  };
  return subjectiveview ? (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Previous Papers'} />

      <View style={[styles.container, styles.shadowProp]}>
        {subjectiveData.length > 0 ? (
          <View
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            <View style={styles.topView}>
              <Text
                style={styles.topViewheader}
              >{`Question ${newquestionid} of ${subjectiveData?.length}`}</Text>

              {/* <View style={styles.timerView}>
                <Ionicons name='timer' size={20} color={COLORS.whiteColor} />
                <Text style={styles.timerText}>
                  {parseInt(seconds / 60, 10)}:{parseInt(seconds % 60, 10)}
                </Text>
              </View> */}
            </View>

            <>
              <View style={{ flex: 0.84 }}>
                {subspinner ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  >
                    <Text>{t('loading')}</Text>
                  </View>
                ) : (
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
                          html={subjectiveData[newquestionid - 1]?.question}
                        />
                      </View>
                      <View style={{ marginTop: 20 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginBottom: 10,
                            marginLeft: 10,
                            fontWeight: 'bold',
                          }}
                        >
                          Explanation :
                        </Text>
                        <View
                          style={{
                            paddingVertical: 10,
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'lightgrey',
                            marginTop: 10, //borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
                          }}
                        >
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
                            style={{
                              //backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
                              width: '95%',
                              // backgroundColor: "red",
                              //  height: 150,
                              // borderWidth: 1,
                              // borderRadius:10,

                              marginLeft: 10,
                              // justifyContent: "center",
                              // alignSelf: 'flex-start',
                            }}
                            html={
                              subjectiveData[newquestionid - 1]?.explanation
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                )}
              </View>
              {subjectiveData.length > 0 ? (
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
                          onPress={onPrevioussub}
                        >
                          <Text style={styles.buttontext}>{t('previous')}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.nextbuttonView}>
                      {newquestionid === subjectiveData.length ? (
                        <TouchableOpacity
                          style={[
                            styles.previousbutton,
                            {
                              height: bototmheight,
                              width: bottomwidth,
                              borderRadius: radius,
                            },
                          ]}
                          onPress={onSubmitTestsub}
                        >
                          <Text style={styles.buttontext}>{t('done')}</Text>
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
                          onPress={onNextsub}
                        >
                          <Text style={styles.buttontext}>{t('next')}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              ) : null}
            </>
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
                    {t('goback')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => backAction()}
                  style={styles.innerbuttonview}
                >
                  <Text style={{ color: COLORS.appSecondaryColor }}>
                    {t('reviewprevioustest')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainVew}>
            <Text>{t('nodata')}</Text>
            <TouchableOpacity onPress={() => backAction()}>
              <Text>{t('nodata')}</Text>
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
                  <Text style={{ color: 'white', fontSize: 15 }}>
                    {t('cancel')}
                  </Text>
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
              {timeUp ? t('timeupsubmit') : t('areyousuresubmit')}
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
                  <Text style={{ color: 'white', fontSize: 14 }}>
                    {t('cancel')}
                  </Text>
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
                  <Text style={{ color: 'white', fontSize: 14 }}>
                    {t('submit')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Previous Papers'} />

      <View style={[styles.container, styles.shadowProp]}>
        {loading ? (
          <View style={styles.mainVew}>
            <Text>{t('loading')}</Text>
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
                <Text style={{ fontSize: 13 }}>{t('loading')}</Text>
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
                            <Text style={styles.buttontext}>
                              {t('previous')}
                            </Text>
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
                            <Text style={styles.buttontext}>{t('submit')}</Text>
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
                            <Text style={styles.buttontext}>{t('next')}</Text>
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
                    {t('goback')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => backAction()}
                  style={styles.innerbuttonview}
                >
                  <Text style={{ color: COLORS.appSecondaryColor }}>
                    {t('reviewprevioustest')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainVew}>
            <Text>{t('nodata')}</Text>
            <TouchableOpacity onPress={() => backAction()}>
              <Text>{t('goback')}</Text>
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
                  <Text style={{ color: 'white', fontSize: 15 }}>
                    {t('cancel')}
                  </Text>
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
              {timeUp ? t('timeupsubmit') : t('areyousuresubmit')}
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
                  <Text style={{ color: 'white', fontSize: 14 }}>
                    {t('cancel')}
                  </Text>
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
                  <Text style={{ color: 'white', fontSize: 14 }}>
                    {t('submit')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PrePaperAssessment;
