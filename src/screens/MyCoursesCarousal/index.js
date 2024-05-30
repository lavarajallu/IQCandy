//My Courses.js

import React, { useEffect } from 'react';
import { FlatList, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import CardHeaderLabel from '../../components/CardHeaderLabel';
import CoursesCard from '../../components/CoursesCard';

import { textContent } from '../../constants/content';
import ItemSeparator from '../../components/ItemSeparator';
import { selectMyCourses } from '../../store/student/myCourses/selector';

import { getSubjects } from '../../api/myCourses';
import { selectUser } from '../../store/authManagement/selector';
import { COLORS } from '../../constants/colors';
import Carousel from 'react-native-reanimated-carousel';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;
const baseOptions = {
  vertical: false,
  width: PAGE_WIDTH / 1.5,
  height: PAGE_WIDTH * 0.3,
};

const MyCoursesCarousal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { subjects } = useSelector(selectMyCourses);
  const { lhTitle } = props;
  const navigation = useNavigation();
  const progressValue = useSharedValue(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);

  useEffect(() => {
    if (user) {
      const reqPayload = {
        universityId: user?.userOrg?.universityId,
        branchId: user?.userOrg?.branchId,
        semesterId: user?.userOrg?.semesterId,
        offset: 0,
        limit: 1000,
      };

      getSubjects({
        data: reqPayload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  }, [user]);

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
        lHLabel={lhTitle ? lhTitle : 'My Courses'}
        rHLabel={'View All'}
        onPress={seeAll}
      />
      <FlatList
        data={subjects?.items}
        keyExtractor={(item) => item.idx}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default MyCoursesCarousal;
