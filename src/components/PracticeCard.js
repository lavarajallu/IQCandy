import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../constants/colors';
import ProgressLine from './ProgressLine';
import { SHADOW_STYLES } from '../constants/helpers';
import ProgressBar from 'react-native-progress/Bar';

const { width, height } = Dimensions.get('window');

const ParcticeCard = (props) => {
  const { item, onChange } = props;
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
  return (
    <TouchableOpacity
      style={{
        width: width / 2.3,
        height: height / 6,
        backgroundColor: COLORS.whiteColor,
        borderRadius: 8,
        marginLeft: 8,
        marginTop: 10,
      }}
      onPress={() => {
        onChange('HIELLO');
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Your Image Component with dimensions */}
        {/* Replace 'YourImageSource' with the actual source of your image */}
        <Image
          source={{ uri: item?.image }}
          style={styles.image}
          resizeMode={'cover'}
        />
        <View style={styles.absview}>
          <Text style={styles.textstyle} numberOfLines={2}>
            {item?.name}
          </Text>
        </View>

        <View>
          <ProgressBar
            progress={percent ? percent / 100 : 0}
            width={width / 2.3}
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
    //   height: Platform.OS === 'ios' ? height / 4.65 : height / 3.84,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginLeft: 14,
    marginTop: 14,
    paddingBottom: 10,
    ...SHADOW_STYLES,
  },
  imageContainer: {
    width: Platform.OS === 'ios' ? width * 0.41 : width * 0.41,
    height: 117,
    padding: 5,
  },
  absview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    bottom: 0,
  },
  textstyle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'mulish-bold',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 4,
  },
  textContainer: {
    //height: 52,
    marginTop: 2,
    paddingLeft: 6,
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 13,
    fontFamily: 'mulish-bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 18,
    backgroundColor: COLORS.appPrimaryColor,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 2,
  },
  smallTextLabel: {
    fontSize: 9,
    textAlign: 'left',
    fontFamily: 'mulish-regular',
    marginTop: 2,
  },
};

export default ParcticeCard;
