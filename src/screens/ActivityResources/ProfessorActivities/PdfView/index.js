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

import { goBack } from '../../../../utils/navigationUtils';
import { COLORS } from '../../../../constants/colors';
import Header from '../../../../components/Header';
import { textContent } from '../../../../constants/content';
import { selectUser } from '../../../../store/authManagement/selector';
import { selectMyCourses } from '../../../../store/student/myCourses/selector';
import {
  getNotesActivityDataProfe,
  updateanalyticsNotes,
} from '../../../../api/myCourses';
import { WebView } from 'react-native-webview';
import moment from 'moment';
const ProfPdfViewNew = ({ route, navigation }) => {
  const { questions } = textContent;
  const [page, setPage] = useState(null);
  const [pdfpagesarray, setpdfpagesarray] = useState([]);
  const { topicItem, chapterItem, subjectItem, from, data } = route.params;
  const { notesActivityDataProf, getupdateanalyticsNotes } =
    useSelector(selectMyCourses);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [newnotesActvityData, setNotestActivitydata] = useState('');
  const [laoding, setLoading] = useState(true);
  const [isHtml, setIshtml] = useState(false);
  const [index, setIndex] = useState(1);
  const [isPdf, setIsPdf] = useState(false);
  const [nodataurl, setNodataUrl] = useState(false);
  const [pdfData, setPdfData] = useState({});
  const [scalevalue, setScale] = useState(1);
  const [spinner, setSpinnerpdf] = useState(true);
  const [loadcomplere, setloadcomplet] = useState(false);
  const [activityStartTime, setactivityStartTime] = useState(null);
  const backAction = () => {
    //  updateAnalytics();
    if (route.params.type === 'recommtopicActivities') {
      goBack(navigation)
    } else {
      navigation.navigate('ActivityResources', {
        topicItem: route.params.topicItem,
        chapterItem: route.params.chapterItem,
        subjectItem: route.params.subjectItem,
        from: 'topics',
      });
    }
  };

  useEffect(() => {
    getNotesActivityDataProfe({
      dispatch,
      id: route.params.data.id,
      activityInfoId: route.params.data.activityInfoId,
      userId: user?.userInfo?.userId,
    });

    const activityStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setactivityStartTime(activityStartTime);
  }, [route]);
  useEffect(() => {

    if (notesActivityDataProf && Object.keys(notesActivityDataProf).length > 0) {
      const data = notesActivityDataProf;
      if (route.params.data.activityType === 'pdf') {
        if (notesActivityDataProf.url) {
          var newarr = notesActivityDataProf?.validPdfPages?.split(',');
          var newindex;
          var ibendex = newarr.findIndex(
            (x) => x === notesActivityDataProf?.pdfPagePausedAt?.toString()
          );
          if (ibendex === -1) {
            newindex = 0;
          } else {
            newindex = ibendex;
          }
          setPdfData(notesActivityDataProf.url);
          setIsPdf(true);
          setpdfpagesarray(newarr);
          setLoading(false);
          setSpinnerpdf(false);

          if (notesActivityDataProf.pdfPagePausedAt) {
            setPage(
              notesActivityDataProf.pdfPagePausedAt === -1
                ? 1
                : notesActivityDataProf.pdfPagePausedAt
            );
            setIndex(
              notesActivityDataProf.pdfPagePausedAt === -1
                ? 1
                : notesActivityDataProf.pdfPagePausedAt
            );
          } else {
            setPage(1)
            setIndex(1)
          }


        } else {
          setNodataUrl(true);
          setLoading(false);
          setSpinnerpdf(false);
        }
      } else if (
        route.params.data.activityType === 'html5' ||
        route.params.data.activityType === 'web'
      ) {
        setNotestActivitydata(notesActivityDataProf.url);
        setIshtml(true);
        setIsPdf(false);
        setPdfData('');

        setSpinnerpdf(false);

        setLoading(false);
      } else {
        setLoading(false);
        setSpinnerpdf(false);
      }
    } else {
    }
  }, [notesActivityDataProf]);

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
        activityDimId: data?.activityDimId ? data?.activityDimId : "",
        boardId: user.userOrg.boardId,
        gradeId:  user.userOrg.gradeId,

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
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' || newobj.activityType === 'web'
      ) {
        navigation.navigate('ProfPdfViewNew', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivityPro', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'youtube'
      ) {
        navigation.navigate('YtVideoActivityPro', {
          index: index + 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      }
     
    }
    else {
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
        newobj.activityType === 'pdf' ||
        newobj.activityType === 'HTML5' ||
        newobj.activityType === 'html5' ||
        newobj.activityType === 'web'
      ) {
        navigation.navigate('ProfPdfViewNew', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'conceptual_video' ||
        newobj.activityType === 'video'
      ) {
        navigation.navigate('VideoActivityPro', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
          chapterItem: route.params.chapterItem,
          subjectItem: route.params.subjectItem,
          topicItem: route.params.topicItem,
          from: route.params.from,
        });
      } else if (
        newobj.activityType === 'youtube'
      ) {
        navigation.navigate('YtVideoActivityPro', {
          index: index - 1,
          smartres: route.params.smartres,
          data: newobj,
          type: route.params.type,
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
  };
  const onzoomout = () => {
    let scale = scalevalue > 1 ? scalevalue / 1.2 : 1;
    setScale(scale);

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
                  }}
                  // onPageChanged={() => onPageChanged()}
                  onError={(error) => {
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

export default ProfPdfViewNew;

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
