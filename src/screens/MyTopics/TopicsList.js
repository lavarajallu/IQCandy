import React, { useEffect } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
import * as Progress from 'react-native-progress';
import StarRating from 'react-native-star-rating';
const height = Dimensions.get('window').height;

import { COLORS } from '../../constants/colors';
import ProgressLine from '../../components/ProgressLine';

const TopicsList = (props) => {
  const { data, onChange, PreviousQuestionPaperByCount, GatePreviousQuestionPaperByCount } = props;

  const onSelectItem = (item) => {
    onChange(item);
  };

  const renderItem = ({ item ,index}) => {
    var percent = parseInt(item.progress);
    let color;
    if (percent > 80) {
      color = 'green';
    } else if (percent < 50) {
      color = 'red';
    } else {
      color = 'orange';
    }
    var questionPaperCount = 0;
    if (props.PreviousQuestionPaperByCount) {

      let obj = props.PreviousQuestionPaperByCount?.find(
        (o) => o.uniTopicId == item.universalTopicId
      );
      if (obj) {
        questionPaperCount = obj.prevRepeatedCount;
      }

    }

    var gatequestionPaperCount = 0;
    if (props.GatePreviousQuestionPaperByCount) {

      let obj = props.GatePreviousQuestionPaperByCount?.find(
        (o) => o.uniTopicId == item.universalTopicId
      );
      if (obj) {
        gatequestionPaperCount = obj.prevRepeatedCount;
      }

    }
    return (
      <View style={{
       borderWidth: 1, width: windowWidth / 2.15,
        backgroundColor: COLORS.whiteColor, justifyContent: "center",
        borderRadius: 8,borderColor:"transparent",
        marginLeft: 8, marginTop: 10,
      }}>
        <View style={{ flex: 0.9 }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelectItem(item)}

          >
            <View
              style={{ flex: 1 }}
            >
              <Image
                source={{ uri: item?.image }}
                style={styles.image}
                resizeMode={'cover'}
              />
              <View style={styles.absview}>
                <Text style={styles.textstyle}>
                  {` ${item?.topicName}`}
                </Text>
              </View>

              <View>
                {item.progress ? (
                  <Progress.Bar
                    progress={parseInt(item.progress) / 100}
                    width={windowWidth / 2.15}
                    color={color}
                    height={2}
                    unfilledColor={'lightgrey'}
                    borderColor={'transparent'}
                  />
                ) : (
                  <Progress.Bar
                    progress={0}
                    width={windowWidth / 2.15}
                    color={color}
                    height={2}
                    unfilledColor={'lightgrey'}
                    borderColor={'transparent'}
                  />
                )}
              </View>



            </View>

          </TouchableOpacity>
        </View>
       


      </View>
    );
  };
  const getQuestionPapers = (topicitem, questionpapers, type) => {
    props.navigation.navigate('TopicQuestionpapertype', { topicitem: topicitem, questionpapertype: type, questionpaper: questionpapers })
  }
  useEffect(() => {
    // f(JSON.stringify(props.PreviousQuestionPaperByCount));
    // topicId: '06e15f20-f577-11ed-a7e5-19018bf1e7d4',
  });
  return (
    <>
     
        <FlatList
          data={data}
          keyExtractor={(item) => item.idx}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2} // Set the number of columns to 2
        //   ItemSeparatorComponent={ItemSeparator}
        />
        {/* <FlatList
        data={data}
        keyExtractor={(item) => item?.idx}
        numColumns={2}
        style={{flexWrap:"wrap"}}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      /> */}
      
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      /> */}
    </>
  );
};

export default TopicsList;

const styles = StyleSheet.create({
  card: {
    width: windowWidth / 2.15,
    height: height / 6,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 8,
  //  marginLeft: 8, marginTop: 10
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',

  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  subtitle: {
    color: COLORS.black,
    fontWeight: '400',
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'mulish-regular',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    // marginLeft: 6,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    marginRight: 3,
  },
  chaptersWithIcon: {
    // Your style for chapters with icon
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'mulish-regular',
    textAlign: 'left',
    color: COLORS.lightGray,
  },
  timeWithIcon: {
    // Your style for time with icon
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'mulish-regular',
    textAlign: 'left',
    color: COLORS.lightGray,
  },
  absview: { width: "100%", height: 55, backgroundColor: "rgba(0, 0, 0, 0.6)", position: "absolute", bottom: 0 },
  textstyle: { fontSize: 13, color: "white", textAlign: "center" },
  container: {

    marginVertical: 10,
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
