//Post Assessment
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { _ } from 'lodash';

import BulletListItem from '../../../components/BulletListItem';
import DropDownSearch from '../../../components/DropdownSearch';
import Header from '../../../components/Header';
import { COLORS } from '../../../constants/colors';
import { textContent } from '../../../constants/content';
import { goBack } from '../../../utils/navigationUtils';
import KnowledgeMapList from './KnowledgeMapList';
import styles from './styles';
const { width } = Dimensions.get('window');
import {
  getAssessmentSubjects,
  getHeatMapData,
  getTopicsBySubjectId,
} from '../../../api/myLearning';
import { getChapters } from '../../../api/myCourses';
import { selectMyCourses } from '../../../store/student/myCourses/selector';

import { selectMyLearning } from '../../../store/student/myLearning/selector';
import { selectUser } from '../../../store/authManagement/selector';
import Loader from '../../../components/Loader';
import { getValidaPackages } from '../../../api/validatePackages';
import { selectValidatePackage } from '../../../store/student/validatePackages/selector';
import { getTopicDetails } from '../../../api/search';
import { selectSearch } from '../../../store/student/search/selector';
import i18n from '../../../i18n';

const KnowledgeMap = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { subjectsInfo, heatMapData, topicsBySubject } =
    useSelector(selectMyLearning);
  const { knowledgeMap } = textContent;
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [newSubjectList, setNewSubjectsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { validatePackage } = useSelector(selectValidatePackage);
  const { chapters } = useSelector(selectMyCourses);
  const { topicDetails } = useSelector(selectSearch);
  var [selectedItem, setSelectedItem] = useState({});
  const [onClick, setonClick] = useState(false);
  const [sortOrderKnowledgeMapData, setSortOrderKnowledgeMapData] = useState(
    []
  );
  useEffect(() => {
    if (user) {
      const payload = {
        boardId: user.userOrg.boardId,
        gradeId: user.userOrg.gradeId,
        //  branchId: user.userOrg.branchId,
      };
      getAssessmentSubjects({
        data: payload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
      // getValidaPackages({
      //   dispatch,
      //   userId: user?.userInfo?.userId,
      // });
    }
  }, [route]);
  useEffect(() => {
    if (topicsBySubject && topicsBySubject.length > 0 && heatMapData) {
      const mappingKnowledgeMapData = topicsBySubject.map((st) => {
        const progressTopicInfo = heatMapData.find(
          (topic) => topic.topicId === st.topicId
        );

        const testScore =
          progressTopicInfo?.score === 0
            ? 0
            : !progressTopicInfo?.score
            ? -1
            : progressTopicInfo?.score;

        return { ...st, score: testScore };
      });

      const sortOrderKnowledgeMapData = _.orderBy(
        mappingKnowledgeMapData,
        ['score'],
        ['desc']
      );

      setSortOrderKnowledgeMapData(sortOrderKnowledgeMapData);
    }
  }, [topicsBySubject, heatMapData]);
  useEffect(() => {
    setLoading(true);
    const fetchSubjectsAndData = async () => {
      try {
        if (
          !user ||
          !subjectsInfo ||
          !subjectsInfo.items ||
          subjectsInfo.items.length === 0
        ) {
          // Handle the case where user, subjectsInfo, or subjectsInfo.items is not available
          return;
        }

        const subjectsList = subjectsInfo.items.map((sub, i) => ({
          label: sub.name,
          value: i + 1,
          id: sub.subjectId,
        }));

        setNewSubjectsList(subjectsList);
        var chappayload = {
          boardId: user.userOrg.boardId,
          gradeId: user.userOrg.gradeId,
          subjectId: subjectsList[0]?.id,
          offset: 0,
          limit: 1000,
        };
        const firstSubjectId = subjectsList[0]?.id;
        setLoading(false);
        // Fetch topics and heatmap data concurrently
        await Promise.all([
          getChapters({
            data: chappayload,
            dispatch,
            userId: user?.userInfo?.userId,
          }),

          getTopicsBySubjectId({
            dispatch,
            userId: user.userInfo.userId,
            subjectId: firstSubjectId,
          }),
          getHeatMapData({
            dispatch,
            userId: user.userInfo.userId,
            subjectId: firstSubjectId,
          }),
        ]);
      } catch (error) {
        setLoading(false);
        // Handle errors here
        console.error('Error fetching subjects and data:', error);
      }
    };

    fetchSubjectsAndData();
  }, [user, subjectsInfo, loading]);

  const backAction = () => {
    goBack(navigation);
  };

  const onChangeSubject = (sub) => {
    const payload = {
      subjectId: newSubjectList[sub - 1].id,
    };
    const chappayload = {
      universityId: user.userOrg.universityId,
      boardId: user.userOrg.boardId,
      gradeId: user.userOrg.gradeId,
      semesterId: user.userOrg.semesterId,
      subjectId: newSubjectList[sub - 1].id,
      offset: 0,
      limit: 1000,
    };

    getChapters({
      data: chappayload,
      dispatch,
      userId: user?.userInfo?.userId,
    });

    getTopicsBySubjectId({
      dispatch,
      userId: user?.userInfo?.userId,
      subjectId: payload.subjectId,
    });
    getHeatMapData({
      dispatch,
      userId: user?.userInfo?.userId,
      subjectId: payload.subjectId,
    });
    setSelectedSubject(newSubjectList[sub - 1]);
    setSelectedValue(sub - 1);
    // setSpinner(true); // Unused variable, consider removing
  };
  const navigatetopage = (item) => {
    setSelectedItem(item);

    getTopicDetails({
      dispatch,
      userId: user?.userInfo?.userId,
      universityId: user?.userOrg?.universityId,
      subjectId: item.subjectId,
      chapterId: item.chapterId,
      topicId: item.topicId,
      boardId: user.userOrg.boardId,
      gradeId: user.userOrg.gradeId,
      semesterId: user?.userOrg?.semesterId,
    });
  };
  useEffect(() => {
    var count = 0;
    if (topicDetails && Object.keys(topicDetails).length > 0 && onClick) {
      navigation.navigate('ActivityResources', {
        topicItem: { ...selectedItem, ['image']: topicDetails.image },
        chapterItem: {},
        from: 'heatmap',
      });

      // navigation.navigate('ActivityResources', {
      //   topicItem: item,
      //   chapterItem: chapterItem,
      //   subjectItem: subjectItem,
      //   from: 'topics',
      // });
    }
  }, [topicDetails]);
  const gotoActivity = (item) => {
    var validpackages = validatePackage;

    if (item.chapterId === chapters?.items?.[0]?.chapterId) {
      setonClick(true);
      navigatetopage(item);
    } else {
      setonClick(true);
      navigatetopage(item);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={i18n.t('knowledgemap')} />
      <View style={[styles.container, styles.shadowProp]}>
        <DropDownSearch
          placeholderText={'Select Subject'}
          data={newSubjectList}
          label={''}
          width={width * 0.89}
          handleChange={onChangeSubject}
          selectedValue={selectedValue}
        />
        {topicsBySubject?.length > 0 ? (
          <KnowledgeMapList
            gotoActivity={gotoActivity}
            data={topicsBySubject}
            heatMapData={heatMapData}
            sortOrderKnowledgeMapData={sortOrderKnowledgeMapData}
          />
        ) : loading ? (
          <Loader loading={loading} />
        ) : (
          <View>
            <Text>{i18n.t('nodata')}</Text>
          </View>
        )}

        <View style={styles.bulletListContainer}>
          {knowledgeMap?.bulletItems?.map((item, index) => (
            <BulletListItem key={index} {...item} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KnowledgeMap;
