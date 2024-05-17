//My Courses.js

import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ImageBackground, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import CardHeaderLabel from '../../components/CardHeaderLabel';
import CoursesCard from '../../components/CoursesCard';

import { textContent } from '../../constants/content';
import ItemSeparator from '../../components/ItemSeparator';
import { selectMyCourses } from '../../store/student/myCourses/selector';

import { getSubjects } from '../../api/myCourses';
import { selectUser } from '../../store/authManagement/selector';
import OnBoardStartedScreen from '../OnboardStartedScreen';
// import Pagination,{Icon,Dot} from 'react-native-pagination';//{Icon,Dot} also available
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../constants/colors';

const MyCourses = (props) => {
  const dispatch = useDispatch();
  const [activeSlide, setactiveslide] = useState(0)
  const { user } = useSelector(selectUser);
  const { subjects } = useSelector(selectMyCourses);
  const { lhTitle } = props;
  const navigation = useNavigation();
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
  const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
  const ITEM_HORIZONTAL_MARGIN = 15;
  const ITEM_WIDTH = SLIDE_WIDTH + 20;
  const SLIDER_WIDTH = viewportWidth;
  useEffect(() => {
    if (user) {
      const reqPayload = {
        boardId: user?.userOrg.boardId,
        gradeId: user?.userOrg.gradeId,
      //  universityId: user?.userOrg?.universityId,
        // branchId: user?.userOrg?.branchId,
        // semesterId: user?.userOrg?.semesterId,
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

    <CoursesCard item={item} onChange={(item) => gotoChaptersPage(item)} fromscreen={"Dashboard"} />

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
      {/* <FlatList
        data={subjects?.items}
        keyExtractor={(item) => item.idx}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        pagingEnabled={true}
        ItemSeparatorComponent={ItemSeparator}
      
      
      />
 <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "center" }}>
        {subjects?.items?.map((res, i) => (

          <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "grey", marginHorizontal: 5 }}>

          </View>


        ))}
      </View>  */}

      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={subjects?.items}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={viewportWidth / 1.6}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onSnapToItem={(index) => setactiveslide(index)}
      />
      <View>
        <Pagination
          dotsLength={subjects?.items?.length}
          activeDotIndex={activeSlide}

          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            backgroundColor: COLORS.appSecondaryColor
          }}
          inactiveDotStyle={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginHorizontal: 5,
            backgroundColor: 'grey'
          }} />

      </View>
    </>
  );
};

export default MyCourses;
