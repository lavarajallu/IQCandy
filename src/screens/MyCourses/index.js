//My Courses.js

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../constants/colors';
import CardHeaderLabel from '../../components/CardHeaderLabel';
import CoursesCard from '../../components/CoursesCard';
import ItemSeparator from '../../components/ItemSeparator';
import { selectMyCourses } from '../../store/student/myCourses/selector';

import { getSubjects } from '../../api/myCourses';
import { selectUser } from '../../store/authManagement/selector';
import i18n from './../../i18n';
import { getTopicsProgress } from '../../api/myTopicsInProgress';

const MyCourses = (props) => {
  const dispatch = useDispatch();
  const [activeSlide, setactiveslide] = useState(0);
  const { user } = useSelector(selectUser);
  const { subjects } = useSelector(selectMyCourses);
  const { lhTitle } = props;
  const navigation = useNavigation();
  const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window');
  const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
  const ITEM_HORIZONTAL_MARGIN = 15;
  const ITEM_WIDTH = SLIDE_WIDTH + 20;
  const SLIDER_WIDTH = viewportWidth;
  useEffect(() => {
    const reqPayload = {
      boardId: user?.userOrg.boardId,
      gradeId: user?.userOrg.gradeId,
      offset: 0,
      limit: 1000,
    };

    getSubjects({
      data: reqPayload,
      dispatch,
      userId: user?.userInfo?.userId,
    });
  });
  useEffect(() => {});

  const gotoChaptersPage = (item) => {
    navigation.navigate('MyChapters', { subjectItem: item });
  };

  const renderItem = ({ item }) => (
    <CoursesCard
      item={item}
      onChange={(item) => gotoChaptersPage(item)}
      fromscreen={'Dashboard'}
    />
  );

  const seeAll = () => {
    navigation.navigate('Subjects');
  };

  return (
    <>
      <CardHeaderLabel
        lHLabel={i18n.t('mylibrary')}
        rHLabel={i18n.t('seeall')}
        onPress={seeAll}
      />
      <FlatList
        data={subjects?.items}
        keyExtractor={(item) => item.subjectId}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default MyCourses;
