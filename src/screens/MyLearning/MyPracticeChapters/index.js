//Post Assessment
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { _ } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import styles from './styles';
import Modal from 'react-native-modal';

import { getValidaPackages } from '../../../api/validatePackages';
import { selectValidatePackage } from '../../../store/student/validatePackages/selector';
import { getPracticeChapters } from '../../../api/myLearning';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
import { selectUser } from '../../../store/authManagement/selector';

const MyPracticeChapters = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [chaptersData, setChaptersData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [newchapters, setnewChapters] = useState([]);
  const [validatepackage, setvalidatePackage] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [newmodal, setNewModal] = useState(false);
  const { user } = useSelector(selectUser);
  const { chapertsInfo } = useSelector(selectMyLearning);
  const { subjectItem } = route.params;
  const { validatePackage } = useSelector(selectValidatePackage);

  useEffect(() => {
    if (user) {
      // getValidaPackages({
      //   dispatch,
      //   userId: user?.userInfo?.userId,
      // });
      getPracticeChapters({
        dispatch,
        userId: user?.userInfo?.userId,
        boardId: user?.userOrg?.boardId,
        subjectId: subjectItem?.subjectId,
      });
    }
  }, [user]);
  useEffect(() => {
    const previousTestsData = chapertsInfo;

    if (previousTestsData) {
      if (previousTestsData && previousTestsData?.userPracticeTest?.length) {
        let testChapters = [];
        let uniqueTestChapters = _.uniqBy(
          previousTestsData?.userPracticeTest,
          'chapterId'
        );
        var previousTestChapters = _.sortBy(uniqueTestChapters, 'chapterIndex');
        for (l = 1; l < previousTestChapters.length; l++) {
          var pair = { attempts: 0 };
          previousTestChapters[l] = { ...previousTestChapters[l], ...pair };
        }

        for (j = 0; j < previousTestsData.attempts.length; j++) {
          for (i = 0; i < previousTestChapters.length; i++) {
            if (
              previousTestChapters[i].chapterId ===
              previousTestsData?.attempts[j].chapterId
            ) {
              //Object.assign(previousTestChapters[i], { attempts: 1 });
              var pair = { attempts: 1 };
              previousTestChapters[i] = { ...previousTestChapters[i], ...pair };

              //   previousTestChapters[i]['attempts'] = 1;
            } else {
            }
          }
        }

        previousTestChapters.map((up) => {
          testChapters.push({
            ...up,
            name: up.chapterName,
            index: up.chapterIndex,
          });
        });
        let listChapters = [{ name: 'Start', index: -1000 }, ...testChapters];
        listChapters = _.sortBy(listChapters, 'index');
        setChaptersData(listChapters);
        setnewChapters(previousTestsData);
        setLoadingData(false);
        // this.setState({
        //   spinner: false,
        //   newchapters: previousTestsData,
        //   chaptersDataNew: listChapters,
        // });
      } else {
        setLoadingData(false);
        setnewChapters([]);
      }
    } else {
      if (json.error) {
        alert(json.error.message);
      }
      setLoadingData(false);
      setnewChapters([]);
    }
  }, [chapertsInfo]);
  const backAction = () => {
    goBack(navigation);
  };
  const onEventPress = (data) => {
    console.log('ggg');
  };
  const onItem = (item, index, type, newindex) => {
    if (index === 1) {
      if (item.testType === 'subject' || item.testType === 'Subject') {
        if (newindex > 0) {
          if (
            newchapters?.attempts
              ?.map((pta) => pta.chapterId)
              .includes(item.chapterId)
          ) {
            setSelectedItem(item);
            setNewModal(true);
          } else {
            navigation.navigate('PracticeAssesment', {
              data: item,
              subjectData: subjectItem,
              type: 'Subject',
              attempttime: 1,
            });
          }
        } else {
          alert('Please complete before chapter first');
        }
      } else {
        if (newindex > 0) {
          if (item.testType === 'chapter' || item.testType === 'Chapter') {
            if (
              newchapters?.attempts
                ?.map((pta) => pta.chapterId)
                .includes(item.chapterId)
            ) {
              setSelectedItem(item);
              setNewModal(true);
            } else {
              // setSelectedItem(item);
              // setNewModal(true);
              navigation.navigate('PracticeAssesment', {
                data: item,
                subjectData: subjectItem,
                type: 'Chapter',
                attempttime: 1,
              });
            }
          } else {
            navigation.navigate('PracticeAssesment', {
              data: item,
              subjectData: subjectItem,
              type: 'Chapter',
              attempttime: 1,
            });
          }
        } else {
          alert('Please complete before chapter first');
        }
      }
    } else {
      if (user?.role?.roleName !== 'General Student') {
        if (item.testType === 'subject' || item.testType === 'Subject') {
          if (newindex > 0) {
            if (
              newchapters?.attempts
                ?.map((pta) => pta.chapterId)
                .includes(item.chapterId)
            ) {
              setSelectedItem(item);
              setNewModal(true);
            } else {
              navigation.navigate('PracticeAssesment', {
                data: item,
                subjectData: subjectItem,
                type: 'Subject',
                attempttime: 1,
              });
            }
          } else {
            alert('Please complete before chapter first');
          }
        } else {
          if (newindex > 0) {
            if (item.testType === 'chapter' || item.testType === 'Chapter') {
              if (
                newchapters?.attempts
                  ?.map((pta) => pta.chapterId)
                  .includes(item.chapterId)
              ) {
                setSelectedItem(item);
                setNewModal(true);
              } else {
                navigation.navigate('PracticeAssesment', {
                  data: item,
                  subjectData: subjectItem,
                  type: 'Chapter',
                  attempttime: 1,
                });
              }
            } else {
              navigation.navigate('PracticeAssesment', {
                data: item,
                subjectData: subjectItem,
                type: 'Chapter',
                attempttime: 1,
              });
            }
          } else {
            alert('Please complete before chapter first');
          }
        }
      } else {
        
          if (item.testType === 'subject' || item.testType === 'Subject') {
            if (newindex > 0) {
              if (
                newchapters?.attempts
                  ?.map((pta) => pta.chapterId)
                  .includes(item.chapterId)
              ) {
                setSelectedItem(item);
                setNewModal(true);
              } else {
                navigation.navigate('PracticeAssesment', {
                  data: item,
                  subjectData: subjectItem,
                  type: 'Subject',
                  attempttime: 1,
                });
              }
            } else {
              alert('Please complete before chapter first');
            }
          } else {
            if (newindex > 0) {
              if (item.testType === 'chapter' || item.testType === 'Chapter') {
                if (
                  newchapters?.attempts
                    ?.map((pta) => pta.chapterId)
                    .includes(item.chapterId)
                ) {
                  setSelectedItem(item);
                  setNewModal(true);
                } else {
                  navigation.navigate('PracticeAssesment', {
                    data: item,
                    subjectData: subjectItem,
                    type: 'Chapter',
                    attempttime: 1,
                  });
                }
              } else {
                navigation.navigate('PracticeAssesment', {
                  data: item,
                  subjectData: subjectItem,
                  type: 'Chapter',
                  attempttime: 1,
                });
              }
            } else {
              alert('Please complete before chapter first');
            }
          }
       
      }
    }
  };
  const onStarttext = () => {
    setNewModal(false);

    navigation.navigate('PracticeAssesment', {
      data: selectedItem,
      subjectData: subjectItem,
      type: 'Chapter',
      attempttime: 2,
    });
  };
  const onReview = () => {
    setNewModal(false);
    navigation.navigate('ReviewPractice', {
      data: selectedItem,
      subjectData: subjectItem,
    });
  };
  const renderItem = ({ item, index }) => {
    var chapterItem = item;
    var newflex = 0.56,
      newreightflex = 0.45,
      newreightflex2 = 0.45,
      indexflex1 = 0.46,
      indexflex2 = 0.45,
      headfont = 13,
      imagesize = 35;
    return (
      <View style={{ transform: [{ scaleY: -1 }] }}>
        <View>
          {index !== 0 ? (
            index === 1 ? (
              <>
                <View style={styles.firstRowView}>
                  <TouchableOpacity
                    onPress={() => onItem(item, index, 'Chapter', index)}
                    style={styles.firstRowMainView}
                  >
                    <View
                      style={[
                        styles.leftfirstTextView,
                        {
                          flex: indexflex1,
                          //  backgroundColor: 'red',
                        },
                      ]}
                    >
                      <Text
                        numberOfLines={2}
                        style={[styles.leftfirsttext, { fontSize: headfont }]}
                      >
                        {chapterItem.name}
                      </Text>
                    </View>
                    <View style={{ flex: indexflex2 }}>
                      <View
                        style={[
                          styles.imageView,
                          {
                            width: imagesize,
                            height: imagesize,
                            borderRadius: imagesize / 2,
                          },
                        ]}
                      >
                        <Image
                          style={styles.imagestyles}
                          source={require('../../../../assets/images/playbutton.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.dividerline} />
              </>
            ) : index % 2 === 0 ? (
              <>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() =>
                      onItem(
                        item,
                        index,
                        chapterItem.testType,
                        chaptersData[index - 1]?.attempts
                      )
                    }
                    style={styles.firstRowMainView}
                  >
                    <View style={[styles.leftfirstTextView, { flex: newflex }]}>
                      <View
                        style={[
                          styles.imageView,
                          {
                            width: imagesize,
                            height: imagesize,
                            borderRadius: imagesize / 2,
                            // backgroundColor: 'green',
                          },
                        ]}
                      >
                        {chaptersData &&
                        chaptersData[index - 1]?.attempts !== undefined &&
                        chaptersData[index - 1]?.attempts > 0 ? (
                          <Image
                            style={styles.imagestyles}
                            source={require('../../../../assets/images/playbutton.png')}
                          />
                        ) : (
                          <Image
                            style={styles.imagestyles}
                            source={require('../../../../assets/images/lock.png')}
                          />
                        )}
                      </View>
                      {/* {user?.role?.roleName === 'General Student' &&
                      validatePackage?.subscriptionStatus !== 'active' ? (
                        <View
                          style={[
                            styles.imageView,
                            {
                              position: 'absolute',

                              width: imagesize,
                              height: imagesize,
                              borderRadius: imagesize / 2,
                            },
                          ]}
                        >
                          <Image
                            style={styles.imagestyles}
                            source={require('../../../../assets/images/lock.png')}
                          />
                        </View>
                      ) : null} */}
                    </View>
                    <View style={styles.subjectview}>
                      {chapterItem.testType === 'Subject' ? (
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.rightfirsttext,
                            { fontSize: headfont },
                          ]}
                        >
                          {chapterItem.subjectName}
                        </Text>
                      ) : (
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.rightfirsttext,
                            { fontSize: headfont },
                          ]}
                        >
                          {chapterItem.name}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.dividerline} />
              </>
            ) : (
              <>
                <View style={styles.firstRowView}>
                  <TouchableOpacity
                    onPress={() => {
                      onItem(
                        item,
                        index,
                        chapterItem.testType,
                        chaptersData[index - 1]?.attempts
                      );
                    }}
                    style={styles.firstRowMainView}
                  >
                    <View
                      style={[
                        styles.leftfirstTextView,
                        {
                          flex: newreightflex,
                          marginRight: 5,
                        },
                      ]}
                    >
                      {chapterItem.testType === 'Subject' ? (
                        <Text
                          numberOfLines={2}
                          style={{ fontSize: headfont, marginLeft: 5 }}
                        >
                          {chapterItem.subjectName}
                        </Text>
                      ) : (
                        <Text
                          numberOfLines={2}
                          style={{ fontSize: headfont, marginLeft: 5 }}
                        >
                          {chapterItem.name}
                        </Text>
                      )}
                    </View>
                    <View style={{ flex: newreightflex2 }}>
                      <View
                        style={[
                          styles.imageView,
                          {
                            width: imagesize,
                            height: imagesize,
                            borderRadius: imagesize / 2,
                          },
                        ]}
                      >
                        {chaptersData[index - 1]?.attempts > 0 ? (
                          <Image
                            style={styles.imagestyles}
                            source={require('../../../../assets/images/playbutton.png')}
                          />
                        ) : (
                          <Image
                            style={styles.imagestyles}
                            source={require('../../../../assets/images/lock.png')}
                          />
                        )}
                      </View>
                      {/* {user?.role?.roleName === 'General Student' &&
                      validatePackage?.subscriptionStatus !== 'active' ? (
                        <View
                          style={[
                            styles.imageView,
                            {
                              position: 'absolute',

                              width: imagesize,
                              height: imagesize,
                              borderRadius: imagesize / 2,
                            },
                          ]}
                        >
                          <Image
                            style={styles.imagestyles}
                            source={require('../../../../assets/images/lock.png')}
                          />
                        </View>
                      ) : null} */}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.dividerline} />
              </>
            )
          ) : (
            <Image
              style={[
                styles.startbutton,
                {
                  height: imagesize + 15,
                  width: imagesize + 15,
                },
              ]}
              source={require('../../../../assets/images/start.png')}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeareaview}>
      <Header backAction={backAction} headerTitle={''} />
      <View style={[styles.container, styles.shadowProp]}>
        <View style={styles.mainview}>
          {loadingData ? (
            <View>
              <Text style={{ textAlign: 'center' }}>Loading...</Text>
            </View>
          ) : (
            <View style={styles.mainView}>
              <FlatList
                data={chaptersData}
                style={{ transform: [{ scaleY: -1 }] }}
                renderItem={renderItem}
              />
            </View>
          )}
        </View>
        <TouchableWithoutFeedback onPress={() => setNewModal(false)}>
          <Modal
            isVisible={newmodal}
            style={{ justifyContent: 'center', margin: 0 }}
            onBackdropPress={() => setNewModal(false)}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              >
                <Text style={{ marginLeft: 10, fontSize: 20 }}>Go With..</Text>
                <TouchableOpacity
                  onPress={onReview}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={require('../../../../assets/images/icon_1.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={{ marginLeft: 15, fontSize: 13 }}>
                    Review Previous Test
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onStarttext}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={require('../../../../assets/images/icon_2.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={{ marginLeft: 15, fontSize: 13 }}>
                    Start New Test
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default MyPracticeChapters;
