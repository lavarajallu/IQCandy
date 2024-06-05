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
import styles from './styles';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import { getreviewsolutionsPractice } from '../../../api/myLearning';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
import i18n from '../../../i18n';

const PracticeSolutions = ({ route, navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isvisible, setisvisible] = useState(false);
  const [finalarray, setfinalarray] = useState([]);
  const [spinner, setspinnser] = useState(false);
  const [questionno, setquestionno] = useState(0);
  const [questionsarray, setquestionarray] = useState([]);
  const [answerobj, setanswerobj] = useState({});
  const [loading, setloading] = useState(false);

  const { user } = useSelector(selectUser);
  const { practiceSolutionsData } = useSelector(selectMyLearning);
  const dispatch = useDispatch();
  var alphabetarray = [
    'A',
    'B',
    'c',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  useEffect(() => {
    var userId = user.userInfo.userId;
    // var activityDimId = route.params.activtydata.activityDimId;
    var userTestId = route.params.testid;
    // var url =
    //   baseUrl +
    //   `/analytics/users/${userId}/assessments/${userTestId}/review-questions?activityDimId=${activityDimId}`;
    //   var userId = user?.userInfo?.userId;
    //   var activityDimId = route.params.data.activityDimId;
    //   var assignedActivityId = route.params.data.assignedActivityId;
    //   var userTestId = route.params.testId;
    getreviewsolutionsPractice({
      dispatch,
      userId: userId,
      userTestId: route.params.testid,
      //activityDimId: activityDimId,
    });
  }, [user]);
  useEffect(() => {
    if (practiceSolutionsData && practiceSolutionsData.length > 0) {
      setloading(false);
      setquestionarray(practiceSolutionsData);
      setSelectedItem(practiceSolutionsData[0]);
      setquestionno(0);
      setspinnser(false);
    }
  }, [practiceSolutionsData]);
  const backAction = () => {
    goBack(navigation);
  };
  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });
  const scrollToIndex = (index) => {
    let randomIndex = index;
    this.flatListRef.scrollToIndex({ animated: true, index: randomIndex });
  };

  const renderItem = ({ item, index }) => {
    //  var isTablet = DeviceConstants.isTablet;

    var itemheight = 40,
      subfont = 15;
    // if (isTablet) {
    //   (itemheight = 50), (subfont = 25);
    // }
    let viewstyle;
    let textstyle;
    if (item.solution === item.userAnswer) {
      viewstyle = [
        styles.circlefilled,
        { height: itemheight, width: itemheight, borderRadius: itemheight / 2 },
      ];
      textstyle = [styles.circletext, { fontSize: subfont }];
    } else {
      viewstyle = [
        styles.borderfilled,
        { height: itemheight, width: itemheight, borderRadius: itemheight / 2 },
      ];
      textstyle = [styles.bordertext, { fontSize: subfont }];
    }
    return (
      <TouchableOpacity
        onPress={() => onItem(this, item, index)}
        style={viewstyle}
      >
        <Text style={textstyle}>{index + 1}</Text>
      </TouchableOpacity>
    );
  };
  const onItem = (item, index) => {
    setloading(true);
    setquestionno((index) => {
      setTimeout(() => {
        var nextItem = questionsarray[index];
        setloading(false);
        setSelectedItem(nextItem);
      }, 1500);
      return index;
    });
  };
  const returnBoxColor = (option) => {
    //const selectedItem = selectedItem;

    const correctAnswer = selectedItem?.solution.split(',');
    if (
      selectedItem.solution == option.key ||
      correctAnswer.includes(option.key)
    ) {
      return 'green';
    } else if (selectedItem.userAnswer == option.key) {
      return 'red';
      return '';
    }
  };
  const rednerAnswerItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: returnBoxColor(item),
          marginTop: 10, //borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
        }}
      >
        <Text style={{ alignSelf: 'center', marginLeft: 10 }}>
          {alphabetarray[index]}.{' '}
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
            marginTop: Platform.OS === 'android' ? 5 : 5,
            // borderWidth: 1,
            // borderRadius:10,

            marginLeft: 10,
            // justifyContent: "center",
            // alignSelf: 'flex-start',
          }}
          html={item.value}
        />
      </View>
    );
  };
  // const { data } = this.props;
  // const topicindata = data;
  //const isTablet = DeviceConstants.isTablet; // false
  var backheight = 25,
    heafont = 18,
    bottomwidth = 100,
    bototmheight = 30,
    bototmsize = 12,
    radius = 20,
    leftno = 5,
    subfont = 13;
  // if (isTablet) {
  //   (backheight = 35),
  //     (heafont = 28),
  //     (bottomwidth = 200),
  //     (bototmheight = 40),
  //     (bototmsize = 18),
  //     (radius = 30),
  //     (leftno = 10),
  //     (subfont = 18);
  // }
  const onNext = () => {
    //scrollToIndex(questionno);
    if (questionno + 1 === questionsarray.length) {
      Alert.alert('IQ Candy', 'Are you sure you want to quit?', [
        {
          text: 'Cancel',
          onPress: () => {
            //this.ongoback()
          },
        },
        {
          text: 'Ok',
          onPress: () => {
            goBack(navigation);
          },
        },
      ]);
    } else {
      setloading(true);
      setquestionno((questionno) => {
        setTimeout(() => {
          var nextItem = questionsarray[questionno + 1];
          setloading(false);
          setSelectedItem(nextItem);
        }, 1500);
        return questionno + 1;
      });
    }
  };

  onPrevious = () => {
    //  scrollToIndex(questionno);
    if (questionno - 1 === questionsarray.length) {
      // this.setState({
      //     isvisible: true
      // })
      //this.onSubmit()
    } else {
      setloading(true);
      setquestionno((questionno) => {
        setTimeout(() => {
          var nextItem = questionsarray[questionno - 1];
          setloading(false);
          setSelectedItem(nextItem);
        }, 1500);
        return questionno - 1;
      });
    }
  };

  const onSubmit = () => {
    goBack(navigation);
    // Actions.pop();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={i18n.t('reviewanswers')} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.92,
            backgroundColor: 'white',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          {questionsarray.length > 0 ? (
            <View style={styles.listview}>
              {/* <View style={styles.circlesview}>
                <FlatList
                  data={questionsarray}
                  ref={(ref) => {
                    this.flatListRef = ref;
                  }}
                  initialScrollIndex={0}
                  getItemLayout={getItemLayout}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={renderItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View> */}
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: heafont }}>{i18n.t('loading')}</Text>
                </View>
              ) : (
                <View style={styles.questionsview}>
                  <ScrollView>
                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontSize: subfont,
                            //bottom: 0,
                            marginTop: 30,

                            marginLeft: leftno,
                          }}
                        >
                          {questionno + 1}.
                        </Text>
                        <MathJax
                          html={selectedItem.question}
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
                            width: '90%',
                            marginTop: Platform.OS === 'android' ? 5 : 5,
                            // height: 150,
                            //   borderWidth: 2,
                            // borderRadius:10,
                            // borderColor: "lightgrey",
                            marginLeft: 5,
                            // justifyContent: "center",
                            // alignSelf: 'flex-start',
                          }}
                        />
                      </View>
                      <View>
                        <FlatList
                          data={selectedItem.options}
                          keyExtractor={(item, index) => String(index)}
                          renderItem={rednerAnswerItem}
                          //horizontal={true}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>

                      {selectedItem.explanation ? (
                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: subfont,
                              marginBottom: 10,
                            }}
                          >
                            Explanation :
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
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
                                width: '90%',
                                //height: 150,
                                // borderWidth: 1,
                                // borderRadius:10,

                                marginLeft: 10,
                                // justifyContent: "center",
                                // alignSelf: 'flex-start',
                              }}
                              html={selectedItem.explanation}
                            />
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 13 }}>{i18n.t('loading')}</Text>
            </View>
          )}
        </View>

        <View
          style={{
            flex: 0.08,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {questionno === 0 ? (
              <View style={{ flex: 0.5 }} />
            ) : (
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <TouchableOpacity
                  style={{
                    height: bototmheight,
                    width: bottomwidth,
                    borderRadius: radius,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={onPrevious}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: bototmsize,
                      color: COLORS.appSecondaryColor,
                    }}
                  >
                    {i18n.t('previous')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}
            >
              {questionno + 1 === questionsarray.length ? (
                <TouchableOpacity
                  style={{
                    height: bototmheight,
                    width: bottomwidth,
                    borderRadius: radius,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={onSubmit}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: bototmsize,
                      color: COLORS.appSecondaryColor,
                    }}
                  >
                    {i18n.t('done')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    height: bototmheight,
                    width: bottomwidth,
                    borderRadius: radius,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={onNext}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: bototmsize,
                      color: COLORS.appSecondaryColor,
                    }}
                  >
                    {i18n.t('next')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PracticeSolutions;
