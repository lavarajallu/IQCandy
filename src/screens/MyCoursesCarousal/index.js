//My Courses.js

import React, { useEffect } from 'react';
import { FlatList,Dimensions,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import CardHeaderLabel from '../../components/CardHeaderLabel';
import CoursesCard from '../../components/CoursesCard';

import { textContent } from '../../constants/content';
import ItemSeparator from '../../components/ItemSeparator';
import { selectMyCourses } from '../../store/student/myCourses/selector';

import { getSubjects } from '../../api/myCourses';
import { selectUser } from '../../store/authManagement/selector';
import { COLORS } from '../../constants/colors';
import Carousel from "react-native-reanimated-carousel";

const window = Dimensions.get("window");
const PAGE_WIDTH = window.width;
const baseOptions =({
  vertical: false,
  width: PAGE_WIDTH/1.5,
  height: PAGE_WIDTH * 0.3,
} );

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
    <CoursesCard item={item} onChange={(item) => gotoChaptersPage(item)}  fromscreen={"Dashboard"}/>
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
        ItemSeparatorComponent={ItemSeparator}
      /> */}
       <Carousel
        {...baseOptions}
        style={{
           width: PAGE_WIDTH,
        }}
        loop
        pagingEnabled={pagingEnabled}
       // snapEnabled={snapEnabled}
       // autoPlay={autoPlay}
       // autoPlayInterval={1500}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={subjects?.items}
        renderItem={renderItem}
      />
       {!!progressValue && (
        <View
          style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100,
                alignSelf: "center",
              }
            }
        >
          {subjects?.items?.map((res, index) => {
            return (
              <PaginationItem
                backgroundColor={COLORS.appSecondaryColor}
                animValue={progressValue}
                index={index}
                key={index}
                length={subjects?.items.length}
              />
             
            );
          })}
        </View>
      )}
    </>
  );
};
const PaginationItem = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: "grey",
        marginVertical:10,
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default MyCoursesCarousal;
