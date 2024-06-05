import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../../components/Header';
import MathJax from 'react-native-mathjax';

import { COLORS } from '../../../constants/colors';
import { goBack } from '../../../utils/navigationUtils';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import {
  getQuestionPaperByTopicIdRequest,
  getGateQuestionPaperByTopicIdRequest,
} from '../../../api/myCourses';
import i18n from '../../../i18n';

const tabs = [
  { id: 1, title: 'Acadamics' },
  { id: 2, title: 'Gate' },
];
const TopicQuestionpapertype = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { topicitem, questionpapertype, questionpaper } = route.params;
  const { user } = useSelector(selectUser);
  const { QuestionPaperByTopicIdRequest, GateQuestionPaperByTopicIdRequests } =
    useSelector(selectMyCourses);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [questiondata, setQuestionData] = useState({});
  const [newquestionid, setnewquestionid] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});

  const [SelectedgateItem, setSelectedgateItem] = useState({});
  const [subspinner, setsubSpinner] = useState(true);
  const [gatenewquestionid, setgatenewquestionid] = useState(0);
  const [subgatespinner, setsubgateSpinner] = useState(true);

  const backAction = () => {
    goBack(navigation);
  };
  const onNextsub = () => {
    setsubSpinner(true);
    setnewquestionid(newquestionid + 1);
    //setSecondsTime(seconds);

    setTimeout(() => {
      setsubSpinner(false);
      //setSelectedItem(subjectiveData[newquestionid - 1]);
    }, 1500);
  };
  const onPrevioussub = () => {
    setsubSpinner(true);
    setnewquestionid(newquestionid - 1);

    setTimeout(() => {
      // setSeconds(false);
      setsubSpinner(false);
      // setSelectedItem(subjectiveData[newquestionid - 1]);
    }, 1500);
  };
  const onSubmitTestsub = () => {
    backAction();
    //Actions.({ type: 'reset', item: this.props.newdata });
  };

  const onNextgatesub = () => {
    setsubgateSpinner(true);
    setgatenewquestionid(gatenewquestionid + 1);
    //   setSecondsTime(seconds);

    setTimeout(() => {
      setsubgateSpinner(false);
      //setSelectedItem(subjectiveData[newquestionid - 1]);
    }, 1500);
  };
  const onPreviousgatesub = () => {
    setsubgateSpinner(true);
    setgatenewquestionid(gatenewquestionid - 1);

    setTimeout(() => {
      //  setSeconds(false);
      setsubgateSpinner(false);
      // setSelectedItem(subjectiveData[newquestionid - 1]);
    }, 1500);
  };
  const onSubmitgateTestsub = () => {
    backAction();
    //Actions.({ type: 'reset', item: this.props.newdata });
  };
  useEffect(() => {
    if (questionpapertype === 'acadamics') {
      //  setsubSpinner(true)
      setSelectedIndex(1);
      if (topicitem.universalTopicId) {
        setQuestionData({});
        getQuestionPaperByTopicIdRequest({
          dispatch,
          topicId: topicitem.universalTopicId,
        });
        // dispatch(getQuestionPaperByTopicIdRequest({ universalTopicId: universalTopicId }))
      }
    } else if (questionpapertype === 'gate') {
      // setsubgateSpinner(true)
      setSelectedIndex(2);
      if (topicitem.universalTopicId) {
        setQuestionData({});
        getGateQuestionPaperByTopicIdRequest({
          dispatch,
          topicId: topicitem.universalTopicId,
        });
        // dispatch(getQuestionPaperByTopicIdRequest({ universalTopicId: universalTopicId }))
      }
    }
  }, [user]);
  const renderTab = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.tabItem,
        {
          backgroundColor:
            selectedIndex === item.id ? COLORS.appSecondaryColor : 'lightgrey',
        },
      ]}
      onPress={() => {
        questiontypedata(item);
      }}
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
  useEffect(() => {
    if (QuestionPaperByTopicIdRequest?.items?.length > 0) {
      setsubSpinner(false);
      setnewquestionid(0);
      setSelectedItem(QuestionPaperByTopicIdRequest.items[newquestionid]);
    }
  }, [QuestionPaperByTopicIdRequest]);
  useEffect(() => {
    if (GateQuestionPaperByTopicIdRequests?.items?.length > 0) {
      setsubgateSpinner(false);
      setgatenewquestionid(0);
      setSelectedgateItem(
        GateQuestionPaperByTopicIdRequests.items[gatenewquestionid]
      );
    }
  }, [GateQuestionPaperByTopicIdRequests]);
  const questiontypedata = (item) => {
    setSelectedIndex(item.id);
    if (item.id === 1) {
      setsubSpinner(true);
      if (topicitem.universalTopicId) {
        setQuestionData({});
        getQuestionPaperByTopicIdRequest({
          dispatch,
          topicId: topicitem.universalTopicId,
        });
        // dispatch(getQuestionPaperByTopicIdRequest({ universalTopicId: universalTopicId }))
      }
    } else if (item.id === 2) {
      setsubgateSpinner(true);
      if (topicitem.universalTopicId) {
        setQuestionData({});
        getGateQuestionPaperByTopicIdRequest({
          dispatch,
          topicId: topicitem.universalTopicId,
        });
        // dispatch(getQuestionPaperByTopicIdRequest({ universalTopicId: universalTopicId }))
      }
    }
  };

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
      >
        <Header backAction={backAction} headerTitle={'Topoc Question Paper'} />
        <View style={[styles.container, styles.shadowProp]}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.08, flexDirection: 'row' }}>
              {tabs.map(renderTab)}
            </View>
            <View style={{ flex: 0.92 }}>
              {selectedIndex === 1 ? (
                QuestionPaperByTopicIdRequest &&
                QuestionPaperByTopicIdRequest?.items?.length > 0 ? (
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.92 }}>
                      {subspinner ? (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        >
                          <Text>{i18n.t('loading')}</Text>
                        </View>
                      ) : (
                        <ScrollView>
                          <View style={styles.mainScrollview}>
                            <View style={styles.scrollinside}>
                              <Text style={styles.questionidtext}>
                                {newquestionid + 1}.
                              </Text>
                              <View>
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
                                    // height: 150,
                                    // borderWidth: 1,
                                    // borderRadius:10,

                                    marginLeft: 10,
                                    // justifyContent: "center",
                                    // alignSelf: 'flex-start',
                                  }}
                                  html={
                                    QuestionPaperByTopicIdRequest.items[
                                      newquestionid
                                    ]?.question
                                  }
                                />
                                <View
                                  style={{
                                    backgroundColor: 'green',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 13,
                                      color: 'white',
                                      fontWeight: '600',
                                    }}
                                  >
                                    {
                                      QuestionPaperByTopicIdRequest.items[
                                        newquestionid
                                      ]?.questionPaperTitle
                                    }{' '}
                                    -{' '}
                                    {
                                      QuestionPaperByTopicIdRequest.items[
                                        newquestionid
                                      ].month
                                    }
                                    /
                                    {
                                      QuestionPaperByTopicIdRequest.items[
                                        newquestionid
                                      ].year
                                    }{' '}
                                    {
                                      QuestionPaperByTopicIdRequest.items[
                                        newquestionid
                                      ].marks
                                    }{' '}
                                    Marks
                                  </Text>
                                </View>
                              </View>
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
                                    QuestionPaperByTopicIdRequest.items[
                                      newquestionid
                                    ]?.explanation
                                  }
                                />
                              </View>
                            </View>
                          </View>
                        </ScrollView>
                      )}
                    </View>
                    <View style={{ flex: 0.08, alignItems: 'center' }}>
                      {QuestionPaperByTopicIdRequest?.items?.length > 0 ? (
                        <View style={styles.bottomsubview}>
                          {newquestionid === 0 ? (
                            <View style={{ flex: 0.5 }} />
                          ) : (
                            <View style={styles.previousview}>
                              <TouchableOpacity
                                style={[
                                  styles.previousbutton,
                                  {
                                    height: 30,
                                    width: 100,
                                    borderRadius: 20,
                                  },
                                ]}
                                onPress={onPrevioussub}
                              >
                                <Text style={styles.buttontext}>
                                  {i18n.t('previous')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                          <View style={styles.nextbuttonView}>
                            {newquestionid + 1 ===
                            QuestionPaperByTopicIdRequest?.items?.length ? (
                              <TouchableOpacity
                                style={[
                                  styles.previousbutton,
                                  {
                                    height: 30,
                                    width: 100,
                                    borderRadius: 20,
                                  },
                                ]}
                                onPress={onSubmitTestsub}
                              >
                                <Text style={styles.buttontext}>
                                  {i18n.t('done')}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={[
                                  styles.previousbutton,
                                  {
                                    height: 30,
                                    width: 100,
                                    borderRadius: 20,
                                  },
                                ]}
                                onPress={onNextsub}
                              >
                                <Text style={styles.buttontext}>
                                  {i18n.t('next')}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{i18n.t('nodata')}</Text>
                  </View>
                )
              ) : GateQuestionPaperByTopicIdRequests &&
                GateQuestionPaperByTopicIdRequests?.items?.length > 0 ? (
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.92 }}>
                    {subgatespinner ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}
                      >
                        <Text>{i18n.t('loading')}</Text>
                      </View>
                    ) : (
                      <ScrollView>
                        <View style={styles.mainScrollview}>
                          <View style={styles.scrollinside}>
                            <Text style={styles.questionidtext}>
                              {gatenewquestionid + 1}.
                            </Text>
                            <View>
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
                                  // height: 150,
                                  // borderWidth: 1,
                                  // borderRadius:10,

                                  marginLeft: 10,
                                  // justifyContent: "center",
                                  // alignSelf: 'flex-start',
                                }}
                                html={
                                  GateQuestionPaperByTopicIdRequests.items[
                                    gatenewquestionid
                                  ]?.question
                                }
                              />
                              <View
                                style={{
                                  backgroundColor: 'green',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 13,
                                    color: 'white',
                                    fontWeight: '600',
                                  }}
                                >
                                  {
                                    GateQuestionPaperByTopicIdRequests.items[
                                      gatenewquestionid
                                    ]?.questionPaperTitle
                                  }{' '}
                                  -{' '}
                                  {
                                    GateQuestionPaperByTopicIdRequests.items[
                                      gatenewquestionid
                                    ].month
                                  }
                                  /
                                  {
                                    GateQuestionPaperByTopicIdRequests.items[
                                      gatenewquestionid
                                    ].year
                                  }{' '}
                                  {
                                    GateQuestionPaperByTopicIdRequests.items[
                                      gatenewquestionid
                                    ].marks
                                  }{' '}
                                  Marks
                                </Text>
                              </View>
                            </View>
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
                                  GateQuestionPaperByTopicIdRequests.items[
                                    gatenewquestionid
                                  ]?.explanation
                                }
                              />
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    )}
                  </View>
                  <View style={{ flex: 0.08, alignItems: 'center' }}>
                    {GateQuestionPaperByTopicIdRequests?.items?.length > 0 ? (
                      <View style={styles.bottomsubview}>
                        {gatenewquestionid === 0 ? (
                          <View style={{ flex: 0.5 }} />
                        ) : (
                          <View style={styles.previousview}>
                            <TouchableOpacity
                              style={[
                                styles.previousbutton,
                                {
                                  height: 30,
                                  width: 100,
                                  borderRadius: 20,
                                },
                              ]}
                              onPress={onPreviousgatesub}
                            >
                              <Text style={styles.buttontext}>
                                {i18n.t('previous')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        <View style={styles.nextbuttonView}>
                          {gatenewquestionid + 1 ===
                          GateQuestionPaperByTopicIdRequests?.items?.length ? (
                            <TouchableOpacity
                              style={[
                                styles.previousbutton,
                                {
                                  height: 30,
                                  width: 100,
                                  borderRadius: 20,
                                },
                              ]}
                              onPress={onSubmitgateTestsub}
                            >
                              <Text style={styles.buttontext}>
                                {i18n.t('done')}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={[
                                styles.previousbutton,
                                {
                                  height: 30,
                                  width: 100,
                                  borderRadius: 20,
                                },
                              ]}
                              onPress={onNextgatesub}
                            >
                              <Text style={styles.buttontext}>
                                {i18n.t('next')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{i18n.t('nodata')}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TopicQuestionpapertype;
