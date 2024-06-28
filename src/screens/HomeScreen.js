import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import MyCourses from './MyCourses';
import i18n from '../i18n/index1';
import { useTranslation } from 'react-i18next';

import TopicsInProgress from './TopicsInProgress';
import MyLearning from './MyLearning';
import { selectUser } from '../store/authManagement/selector';
import { imagePaths } from '../constants/path';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardHeaderLabel from '../components/CardHeaderLabel';
import { COLORS } from '../constants/colors';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'testing Title',
    body: 'And here is the body!',
    data: { someData: 'testingpush notifications' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

const HomeScreen = ({ route, navigation }) => {
  const { t } = useTranslation(); //i18n instance

  const { user } = useSelector(selectUser);
  const { logos } = imagePaths;
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    getversion();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const platformValue = Platform.OS === 'ios' ? 0.32 : 0.36;
  useEffect(() => {
    // AsyncStorage.getItem('pushtoken').then(async (pushtoken) => {
    //   if (pushtoken) {
    //     // Dispatch an action to update the Redux state with the token
    //     await sendPushNotification(pushtoken);
    //   }
    // });
  }, []);
  const getversion = () => {
    fetch(`https://api.iqcandy.com/api/iqcandy/app-version/latest`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 201) {
          if (json.data) {
            var appversion = json.data.version;
            //var data = appversion.split('v');
            ///alert(data[1])
            if (10.7 < appversion) {
              // alert(appversion)
              //    alert("appveriosn"+appversion)
              navigation.navigate('VersionUpdate');
              // Actions.versionupdate();
            }
          }
        } else {
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: platformValue,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <ImageBackground
            source={require('../../assets/images/dashboardrect.png')}
            style={styles.imageView}
          > */}
          <View style={styles.imageView}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.35, justifyContent: 'space-around' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Subjects')}
                  style={{ alignItems: 'flex-end' }}
                >
                  <Image
                    source={require('../../assets/images/engage.png')}
                    style={{
                      height: 123 / 2.5,
                      width: 236 / 2.5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyPractice')}
                  style={{ alignItems: 'flex-end' }}
                >
                  <Image
                    source={require('../../assets/images/evaluate.png')}
                    style={{
                      height: 123 / 2.5,
                      width: 236 / 2.5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <ImageBackground
                  source={require('../../assets/images/dashboardimg.png')}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 120 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {user?.userInfo?.profilePic ? (
                    <Image
                      source={{
                        uri: user.userInfo.profilePic,
                      }}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 50,
                      }}
                    />
                  ) : (
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                      }}
                      source={require('../../assets/images/avatar.jpeg')}
                    />
                  )}
                </ImageBackground>
              </View>

              <View style={{ flex: 0.35, justifyContent: 'space-around' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LearningAnalysis')}
                >
                  <Image
                    source={require('../../assets/images/explore.png')}
                    style={{
                      height: 123 / 2.5,
                      width: 236 / 2.5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => {
                      Alert.alert('IQ Candy', 'Coming Soon');
                    }
                    // navigation.navigate('ReferEarn', { from: 'dashboard' })
                  }
                >
                  <Image
                    source={require('../../assets/images/referearn.png')}
                    style={{
                      height: 123 / 2.5,
                      width: 236 / 2.5,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* </ImageBackground> */}
        </View>

        <View style={{ flex: platformValue, marginTop: 10 }}>
          <MyCourses lhTitle={t('mylibrary')} navigation={navigation} />
        </View>

        <View style={{ flex: platformValue, marginTop: 10 }}>
          <MyLearning lhTitle={t('mylearning')} navigation={navigation} />
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={{ flex: platformValue, padding: 0, marginTop: 20 }}>
          <TopicsInProgress
            lhTitle={t('mytopicsinprogress')}
            navigation={navigation}
          />
        </View>
        <View style={{ marginVertical: 30 }}>
          {/* Refer & Earn Card disabled */}
          {/* <View stye={{ flex: 1 }}>
            <CardHeaderLabel lHLabel={'Refer & Earn'} />
            <View style={styles.referview}>
              <View style={styles.referleftview}>
                <Text style={{ fontSize: 15 }}>
                  <Text style={{ fontSize: 20 }}>Invite</Text> your Friends
                </Text>
                <Text style={{ marginTop: 5, fontSize: 15 }}>
                  Refer your friends to the{' '}
                  <Text
                    style={{ fontSize: 15, color: COLORS.appSecondaryColor }}
                  >
                    IQ Candy{' '}
                  </Text>
                  App by sharing your unique referral code
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ReferEarn', { from: 'dashboard' })
                  }
                  style={styles.referbutton}
                >
                  <Text style={{ color: 'white' }}>Refer Now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.referright}>
                <Image
                  source={require('./../../assets/images/instructions.png')}
                  style={styles.referimg}
                />
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: height * 0.25,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dashBoardBackgroundColor,
  },
  referview: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  referleftview: {
    flex: 0.7,
    marginLeft: 10,
  },
  referbutton: {
    padding: 10,
    marginTop: 5,
    backgroundColor: COLORS.appSecondaryColor,
    width: 100,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  referright: { flex: 0.3 },
  referimg: {
    width: 227 / 2.5,
    height: 293 / 2.5,
  },
});

export default HomeScreen;
