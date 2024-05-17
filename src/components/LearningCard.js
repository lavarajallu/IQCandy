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
import { imagePaths } from '../constants/path';
import CircleProgressIndicator from './ProgressIndicator';
const { width, height } = Dimensions.get('window');

const LearningCard = (props) => {
  const { item, onChange } = props;
  const { learningCard } = imagePaths;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        onChange();
      }}
    >
      <View
        style={{
          flex: 1,
          //  marginTop: 5,
          backgroundColor: item.color,
          //marginHorizontal: 4,
          borderWidth:1,
          borderColor:"transparent",
          borderRadius: 10,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}
      >
      
        <Image
          source={item.image_uri}
          resizeMode='contain'
          style={{ height: 25, width: 25, tintColor: 'white' }}
        />
          <Text
          style={{
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            fontSize: 20,
            fontWeight: '300',
         //   textAlign: 'right',
          }}
        >
          {item?.title}
        </Text>
      </View>

      {/* <View
        style={{
          flex: 0.75,

          // justifyContent: 'space-around',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 0.7 }}>
            <Text
              style={{
                color: COLORS.black,
                fontFamily: 'mulish-semibold',
                fontSize: 12,
                textAlign: 'left',

                marginLeft: 15,
              }}
              numberOfLines={2}
            >
              Role Readiness ScoresdRole
            </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <CircleProgressIndicator value={item?.progress} />
          </View>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = {
  cardContainer: {
    flex: 1,
    width: width /1.12,
    height: 60,
    
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

export default LearningCard;
