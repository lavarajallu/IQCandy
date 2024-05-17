import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import ProgressBar from 'react-native-progress/Bar';
const { width, height } = Dimensions.get('window');
import ProgressLine from './ProgressLine';

const ActivityResourceCard = (props) => {
  const { item, onPress, progresscount, index, type ,activities} = props;

  const getLabelText = (item) => {
    const minutes = Math.floor(item?.duration / 60);
    const seconds = item.duration - minutes * 60;
    switch (item?.activityType) {
      case 'pre':
      case 'post':
        return `${item?.totalQuestions} Questions`;
      case 'html5':
        return '1 Referral Link';
        case 'web':
          return '1 Referral Link';
      case 'pdf':
        return `${item.pdfPages} Pages`;
      case 'video' :
        return ` ${
          item?.duration
            ? `1 Video | Duration : ${minutes}:${
                seconds > 9 ? seconds : '0' + seconds
              }`
            : '1 video | Duration : 0'
        }`;
        case 'conceptual_video':
          return ` ${
            item?.duration
              ? `1 Video | Duration : ${minutes}:${
                  seconds > 9 ? seconds : '0' + seconds
                }`
              : '1 video | Duration : 0'
          }`;
      
      case 'youtube':
        return ` ${
          item?.duration
            ? `1 youtube video | Duration : ${minutes}:${
                seconds > 9 ? seconds : '0' + seconds
              }`
            : '1 youtube video | Duration : 0'
        }`;
      default:
        return '';
    }
  };
  let color;
  var percent = item.progress;
  if (percent > 80) {
    color = 'green';
  } else if (percent < 50) {
    color = 'red';
  } else {
    color = 'orange';
  }
  var imageUrl = 'https://stepup-india.s3.ap-south-1.amazonaws.com';
  console.log('dfklkdsjfkldf', item);
  return (
    <>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={(item) => {
            onPress();
          }}
        >
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 25, height: 25 }}
              tintColor={COLORS.appSecondaryColor}
              source={{
                uri: `${imageUrl}/activities${item.faIcon}`,
              }}
              //resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image
              source={
                item?.activityType === 'pre'
                  ? require('../../assets/images/activityresources/pre_assignment.jpg')
                  : item?.activityType === 'post'
                  ? require('../../assets/images/activityresources/post_assignment.jpg')
                  : item?.activityType === 'html5'
                  ? require('../../assets/images/activityresources/notes.jpg')
                  : item?.activityType === 'video'
                  ? require('../../assets/images/activityresources/video.png')
                  : null
              } */}
          </View>

          {/* Title and Small Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.smallText}>{getLabelText(item)}</Text>
          </View>
          {type === 'icon' ? (
            <View style={[styles.imageContainer, { backgroundColor: 'white' }]}>
              {progresscount === 0 ? (
                index === 0 ? null : (
                  activities?.find((activity) => activity.activityType === 'pre') ?
                  <Image
                    source={require('../../assets/images/icons/lock.jpg')}
                    //style={{ width: 10, height: 10 }}
                  /> : null
                )
              ) : item.status === 'completed' ? (
                <Image
                  source={require('../../assets/images/icons/greentick.png')}
                  style={{ width: 20, height: 20 }}
                />
              ) : item.status === 'in_progress' ? (
                <Image
                  source={require('../../assets/images/icons/orangetick.png')}
                  style={{ width: 20, height: 20 }}
                />
              ) : (
                <Image
                  source={require('../../assets/images/icons/greytick.png')}
                  style={{ width: 20, height: 20 }}
                />
              )}
            </View>
          ) : (
            <View
              style={[styles.imageContainer, { backgroundColor: 'white' }]}
            />
          )}
        </TouchableOpacity>
        {type === 'icon' ? 
        <ProgressLine
          progressPercentage={item?.progress}
          color={color}
          unfilledColor={'lightgrey'}
        /> : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.1,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 5, // Add elevation for shadow on Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 5,
  },

  imageContainer: {
    flex: 0.15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.mediumGray, // Set your
  },
  textContainer: {
    flex: 0.7,
    marginLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'left',
    fontFamily: 'mulish-bold',
    fontWeight: '600',
    color: COLORS.black,
    fontSize: 14, // Adjust font size as needed
  },
  smallText: {
    textAlign: 'left',
    fontFamily: 'mulish-regular',
    fontWeight: '600',
    color: COLORS.lightGray,
    fontSize: 12,
    marginTop: 4,
  },
});

export default ActivityResourceCard;
