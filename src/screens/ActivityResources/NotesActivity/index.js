//Post Assessment

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import Pdf from 'react-native-pdf';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage or the storage library you're using

import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import { textContent } from '../../../constants/content';
import { selectUser } from '../../../store/authManagement/selector';
import { selectMyCourses } from '../../../store/student/myCourses/selector';
import {
  getNotesActivityData,
  updateanalyticsNotes,
} from '../../../api/myCourses';
import { WebView } from 'react-native-webview';
import moment from 'moment';
const NotesActivity = ({ route, navigation }) => {
  const { questions } = textContent;
  const [page, setPage] = useState(null);
  const [pdfpagesarray, setpdfpagesarray] = useState([]);
  const { topicItem, chapterItem, subjectItem, from, data } = route.params;
  const { notesActivityData, getupdateanalyticsNotes } =
    useSelector(selectMyCourses);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [newnotesActvityData, setNotestActivitydata] = useState('');
  const [laoding, setLoading] = useState(true);
  const [isHtml, setIshtml] = useState(false);
  const [index, setIndex] = useState('0');
  const [isPdf, setIsPdf] = useState(false);
  const [nodataurl, setNodataUrl] = useState(false);
  const [pdfData, setPdfData] = useState({});
  const [scalevalue, setScale] = useState(1);
  const [spinner, setSpinnerpdf] = useState(true);
  const [loadcomplere, setloadcomplet] = useState(false);
  const [activityStartTime, setactivityStartTime] = useState(null);
  const backAction = () => {
    updateAnalytics();
    setTimeout(() => {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: route.params.from,
      });
    }, 1000);

    // navigation.navigate('ActivityResources', {
    //   topicItem: route.params.topicItem,
    //   chapterItem: route.params.chapterItem,
    //   subjectItem: route.params.subjectItem,
    //   from: route.params.from,
    // });
  };

  useEffect(() => {
    getNotesActivityData({
      dispatch,
      activityDimId: route.params.data.activityDimId,
      userId: user?.userInfo?.userId,
    });

    const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setactivityStartTime(activityStartTime);
  }, [route]);
  useEffect(() => {
    if (notesActivityData && Object.keys(notesActivityData).length > 0) {
      const data = notesActivityData;
      if (notesActivityData.activityType === 'pdf') {
        var string = notesActivityData.validPdfPages;
        if (notesActivityData.url) {
          var newarr = string.split(',');
          var newindex;
          var ibendex = newarr.findIndex(
            (x) => x === notesActivityData.pdfPagePausedAt.toString()
          );
          if (ibendex === -1) {
            newindex = 0;
          } else {
            newindex = ibendex;
          }
          setPdfData(notesActivityData.url);
          setIsPdf(true);
          setpdfpagesarray(newarr);
          setLoading(false);
          setSpinnerpdf(false);
          setPage(
            notesActivityData.pdfPagePausedAt === -1
              ? 1
              : notesActivityData.pdfPagePausedAt
          );
          setIndex(
            notesActivityData.pdfPagePausedAt === -1
              ? 1
              : notesActivityData.pdfPagePausedAt
          );
        } else {
          setNodataUrl(true);
          setLoading(false);
          setSpinnerpdf(false);
        }
      } else if (
        notesActivityData.activityType === 'html5' ||
        notesActivityData.activityType === 'web'
      ) {
        setNotestActivitydata(notesActivityData.url);
        setIshtml(true);
        setSpinnerpdf(false);
        setIsPdf(false);
        setPdfData('');
        setLoading(false);
      } else {
        setLoading(false);
        setSpinnerpdf(false);
      }
    } else {
    }
  }, [notesActivityData]);

  const updateAnalytics = async () => {
    var activityPdfPage;

    if (pdfpagesarray[index] === undefined) {
      activityPdfPage = '1';
    } else {
      activityPdfPage = pdfpagesarray[index - 1];
    }
    const { data, subjectItem, chapterItem, topicItem } = route.params;

    if (data.activityType)
      var body = {
        activityDimId: data.activityDimId,
        universityId: user?.userOrg.universityId,
        branchId: user?.userOrg.branchId,
        semesterId: user?.userOrg.semesterId,

        subjectId: subjectItem?.subjectId
          ? subjectItem.subjectId
          : chapterItem?.subjectId
          ? chapterItem.subjectId
          : null,
        chapterId: chapterItem?.chapterId
          ? chapterItem.chapterId
          : topicItem?.chapterId
          ? topicItem.chapterId
          : null,
        topicId: route.params.topicItem?.topicId
          ? route.params.topicItem.topicId
          : null,
        activityStartedAt: activityStartTime,
        activityEndedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        activityPdfPage,
        pdfPagePausedAt: pdfpagesarray[index],
      };
    updateanalyticsNotes({
      dispatch,
      userId: user?.userInfo.userId,
      data: body,
    });
  
  };
  const handleNextActivity = () => {
    var newarray = route.params.smartres;
    var newobj = newarray[route.params.index + 1];
    var index = route.params.index;
    if (newobj) {
      if (
        newobj.activityType === 'obj' ||
        newobj.activityType === 'post' ||
        newobj.activityType === 'sub'
      ) {
        navigation.navigate('PostAssessment', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' ||
        newobj.activityType === 'web'
      ) {
        navigation.navigate('NotesActivity', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'pre') {
        navigation.navigate('PreAssessment', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivity', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'youtube') {
        navigation.navigate('YtVideoActivity', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      }
    } else {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: route.params.from,
      });
    }
  };
  const handlePreviousActivity = () => {
    var newarray = route.params.smartres;
    var newobj = newarray[route.params.index - 1];
    var index = route.params.index;
    if (newobj) {
      if (
        newobj.activityType === 'obj' ||
        newobj.activityType === 'post' ||
        newobj.activityType === 'sub'
      ) {
        navigation.navigate('PostAssessment', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' ||
        newobj.activityType === 'web'
      ) {
        navigation.navigate('NotesActivity', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'pre') {
        navigation.navigate('ActivityResources', {
          topicItem: route.params.topicItem,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivity', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (newobj.activityType === 'youtube') {
        navigation.navigate('YtVideoActivity', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      }
    } else {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: route.params.from,
      });
    }
  };
  const onPrevIndex = () => {
    // setSpinnerpdf((spinner) => {
    var newindex = index - 1;
    setIndex(newindex);
    setPage(page - 1);
    setSpinnerpdf(false);
    //   return true;
    // });
  };
  const onNextIndex = () => {
    // setSpinnerpdf((spinner) => {
    var newindex = index + 1;
    setIndex(newindex);
    setPage(page + 1);
    setSpinnerpdf(false);
    //   return true;
    // });
  };
  const onzoomin = () => {
    let scale = scalevalue * 1.2;
    scale = scale > 3 ? 3 : scale;
    setScale(scale);
    // this.setState({ scale });
    // console.log(`zoomIn scale: ${scale}`);
  };
  const onzoomout = () => {
    let scale = scalevalue > 1 ? scalevalue / 1.2 : 1;
    setScale(scale);

    // console.log(`zoomOut scale: ${scale}`);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Notes Activity'} />
      <View style={[styles.container, styles.shadowProp]}>
        {laoding ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14 }}>Loading.....</Text>
          </View>
        ) : isPdf ? (
          nodataurl ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 14 }}>No Data.....</Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.95 }}>
                <Pdf
                  ref={(pdf) => {
                    this.pdf = pdf;
                  }}
                  trustAllCerts={false}
                  page={page}
                  scale={scalevalue}
                  source={{ uri: pdfData }}
                  //resourceType={resourceType}
                  singlePage={Platform.OS === 'android' ? true : true}
                  // horizontal={true}
                  maxScale={3.0}
                  onLoadComplete={(numberOfPages, filePath) => {
                    setloadcomplet(true);
                    console.log(`number of pages: ${numberOfPages}, {}`);
                  }}
                  // onPageChanged={() => onPageChanged()}
                  onError={(error) => {
                    console.log('ffffe', error);
                    // this.setState({
                    //   error: true,
                    // });
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link presse: ${uri}`);
                  }}
                  //spacing={5}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 30,
                  flexDirection: 'row',
                  right: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                }}
              >
                <TouchableOpacity
                  onPress={onzoomin}
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 25 }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onzoomout}
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    borderLeftWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 25 }}>-</Text>
                </TouchableOpacity>
              </View>
              {loadcomplere ? (
                <View
                  style={{
                    flex: 0.05,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginLeft: 10,
                    // marginRight: 10,

                    alignItems: 'center',
                  }}
                >
                  {index === 1 ? (
                    <View style={{ flex: 0.5 }} />
                  ) : (
                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: '100%',
                          borderRadius: 20,
                          backgroundColor: 'white',
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={onPrevIndex}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 13,
                            color: COLORS.appSecondaryColor,
                          }}
                        >
                          {'< Previous'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <Text
                    style={{
                      color: COLORS.appSecondaryColor,
                      fontSize: 13 + 2,
                    }}
                  >
                    Page {page} of {pdfpagesarray?.length}
                  </Text>
                  {index === pdfpagesarray?.length ? (
                    <View style={{ flex: 0.5 }} />
                  ) : (
                    <View
                      style={{
                        flex: 0.5,
                        //  backgroundColor: 'yellow',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: '100%',
                          borderRadius: 20,
                          backgroundColor: 'white',
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={onNextIndex}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 13,
                            color: COLORS.appSecondaryColor,
                          }}
                        >
                          {'Next >'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          )
        ) : isHtml ? (
          <WebView
            androidLayerType='hardware'
            style={{ minHeight: 1 }}
            source={{ uri: newnotesActvityData }}
            mixedContentMode='always'
            allowsInlineMediaPlayback='true'
            userAgent='Mozilla/5.0 (Linux; Android 9; Redmi Note 8 Build/PKQ1.190616.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Mobile Safari/537.36'
          />
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 10,
          marginRight: 10,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={handlePreviousActivity}
          style={{
            height: 30,
            borderRadius: 20,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: COLORS.appSecondaryColor,
            }}
          >
            Previous Activity
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextActivity}
          style={{
            height: 30,
            borderRadius: 20,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {route.params.smartres[route.params.index + 1] ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: COLORS.appSecondaryColor,
              }}
            >
              Next Activity
            </Text>
          ) : (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: COLORS.appSecondaryColor,
              }}
            >
              Done
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotesActivity;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  container: {
    flex: 0.85,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: width * 0.03,
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
