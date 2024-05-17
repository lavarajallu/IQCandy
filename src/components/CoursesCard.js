import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';
import ProgressLine from './ProgressLine';
import { SHADOW_STYLES } from '../constants/helpers';
const { width, height } = Dimensions.get('window');
import ProgressBar from 'react-native-progress/Bar';
const windowWidth = Dimensions.get('window').width;

const CoursesCard = (props) => {
  const { item, onChange, title, fromscreen } = props;

  const chapterLocation = () => {
    console.log('chapterLocation:', item?.text);
  };
  ``;
  var cardcontainer;
  if (fromscreen === 'Fullsubjects') {
    var progreswwidth = width / 1.2,
      cardcontainer = {
        width: width * 0.41,
        height: Platform.OS === 'ios' ? height / 4.65 : height / 3.84,
        backgroundColor: COLORS.whiteColor,
        borderRadius: 8,
        marginLeft: 8,
      };
  } else {
    var progreswwidth = width * 0.41,
      cardcontainer = {
        width: width * 0.41,
        height: Platform.OS === 'ios' ? height / 4.65 : height / 3.84,
        backgroundColor: COLORS.whiteColor,
        borderRadius: 8,
        marginLeft: 8,
      };
  }
  var color;
  if (item?.progress) {
    var percent = parseInt(item?.progress);

    if (percent > 80) {
      color = 'green';
    } else if (percent < 50) {
      color = 'red';
    } else {
      color = 'orange';
    }
  }
  console.log("sfljfdk", item?.image)
  return (
    fromscreen === 'Dashboard' || fromscreen === 'progresstopics' ?


      <TouchableOpacity
        style={{
          width: width / 1.8,
          height: height / 6,
          backgroundColor: COLORS.whiteColor,
          borderRadius: 8,
          marginLeft: 8,
          marginHorizontal:10
        }}
        onPress={() => {
          onChange(item);
        }}
      >
        <View
          style={{ flex: 1 }}
        >
          {/* Your Image Component with dimensions */}
          {/* Replace 'YourImageSource' with the actual source of your image */}
          <Image
            source={{ uri: item?.image }}
            style={styles.image}
            resizeMode={fromscreen === 'Fullsubjects' ? 'stretch' : 'cover'}
          />
          <View style={styles.absview}>
            <Text style={styles.textstyle}>
              {title === 'topics' ? item?.topicName : item?.name}
            </Text>
          </View>

          <View>
            <ProgressBar
              progress={percent ? percent / 100 : 0}
              width={
                fromscreen === 'Fullsubjects'
                  ? progreswwidth / 1.05
                  : width / 1.8
              }
              height={2}
              color={color}
              unfilledColor={'lightgrey'}
              borderColor={'transparent'}
            />
          </View>



        </View>

      </TouchableOpacity>
      :
      <TouchableOpacity
        style={{
          width: width / 2.3,
          height: height / 6,
          backgroundColor: COLORS.whiteColor,
          borderRadius: 8,
          marginLeft: 8,
          marginTop: 10
        }}
        onPress={() => {
          onChange(item);
        }}
      >
        <View
          style={{ flex: 1 }}
        >
          {/* Your Image Component with dimensions */}
          {/* Replace 'YourImageSource' with the actual source of your image */}
          <Image
            source={{ uri: item?.image }}
            style={styles.image}
            resizeMode={fromscreen === 'Fullsubjects' ? 'stretch' : 'cover'}
          />
          <View style={styles.absview}>
            <Text style={styles.textstyle}>
              {title === 'topics' ? item?.topicName : item?.name}
            </Text>
          </View>

          <View>
            <ProgressBar
              progress={percent ? percent / 100 : 0}
              width={
                width / 2.3
              }
              height={2}
              color={color}
              unfilledColor={'lightgrey'}
              borderColor={'transparent'}
            />
          </View>



        </View>

      </TouchableOpacity>

  );
};

const styles = {
  cardContainer: {
    width: width * 0.41,
    height: Platform.OS === 'ios' ? height / 4.65 : height / 3.84,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 8,
    marginLeft: 8,
  },
  imageContainer: {
    //  height: 117,
    padding: 5,
    // Add other styles as needed
  },
  absview: { width: "100%", height: 50, backgroundColor: "rgba(0, 0, 0, 0.6)", position: "absolute", bottom: 0 },
  textstyle: { fontSize: 14, color: "white", textAlign: "center" },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 4,
  },
  textContainer: {
    height: 52,
    marginTop: 2,
    paddingLeft: 6,
    // alignItems: 'center',
    justifyContent: 'space-between',
    // Add other styles as needed
  },
  mainText: {
    fontSize: 13,
    fontFamily: 'mulish-bold',
    // Add other styles as needed
  },
  button: {
    width: 60,
    height: 18,
    backgroundColor: COLORS.appPrimaryColor,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 2,
    // Add other styles as needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  smallTextLabel: {
    fontSize: 9,
    textAlign: 'left',
    fontFamily: 'mulish-regular',
    marginTop: 2,
    // Add other styles as needed
  },
};

export default CoursesCard;
