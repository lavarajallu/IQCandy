import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import ProgressLine from './ProgressLine';
import { imagePaths } from '../constants/path';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import * as Progress from 'react-native-progress';
const ChaptersList = (props) => {
  const { data, onChange, validatePackage, onlockmodal, user } = props;

  const onSelectItem = (item) => {
    onChange(item,);
  };
  const onSelectItemlock = (item) =>{
    onlock(true);
  }
  const onlock = () => {
    onlockmodal(true);
  };
  const renderItem = ({ item, index }) => {
    const progresswidth = windowWidth / 2.15
    console.log("dafjkdaflkdfd", user?.role?.roleName
      , validatePackage)
    var percent = parseInt(item.progress);
    const role = user?.role?.roleName
    let color;
    if (percent > 80) {
      color = 'green';
    } else if (percent < 50) {
      color = 'red';
    } else {
      color = 'orange';
    }
    return (
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
            {` ${item?.chapterName}`}
          </Text>
        </View>

        <View>
          {item.progress ? (
            <Progress.Bar
              progress={parseInt(item.progress) / 100}
              width={progresswidth}
              color={color}
              height={2}
              unfilledColor={'lightgrey'}
              borderColor={'transparent'}
            />
          ) : (
            <Progress.Bar
              progress={0}
              width={progresswidth}
              color={color}
              height={2}
              unfilledColor={'lightgrey'}
              borderColor={'transparent'}
            />
          )}
        </View>



      </View>

    </TouchableOpacity>
    )
  };
  return (
    <>



      {/* <FlatList
          data={data}
          key={'_'}
          // keyExtractor={item => "_" + item.chapterId}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        /> */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.idx}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2} // Set the number of columns to 2
      //   ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default ChaptersList;

const styles = StyleSheet.create({
  card: {
    width: windowWidth / 2.15,
    height: height / 6,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 8,
    marginVertical: 10,
    marginLeft: 10
    // /padding: 4,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 5 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContent: {
    // justifyContent: 'space-between',
    // alignItems: 'center',
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
  absview: { width: "100%", height: 50, backgroundColor: "rgba(0, 0, 0, 0.6)", position: "absolute", bottom: 0 },
  textstyle: { fontSize: 14, color: "white", textAlign: "center" },
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
