// Create a Drawer Navigator
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authManagement/selector';

import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../constants/colors';
import BottomTabNavigation from './BottomTabNavigation';
import { imagePaths } from '../constants/path';
import ReferEarn from '../screens/ReferEarn';
import ContactUs from '../screens/ContactUs';
import ProfilePage from '../screens/ProfilePage';
import ChangePassword from '../screens/ChangePassword';
import { clearUser } from '../store/authManagement/slice';
import { useDispatch } from 'react-redux';

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ route,navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const handleLogout = (navigation) => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userInfo');
            dispatch(clearUser());
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.whiteColor,
              }}
            >
              {user?.userInfo?.profilePic ? (
                <Image
                  source={{
                    uri: user.userInfo.profilePic,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    marginBottom: 12,
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      marginBottom: 12,
                      resizeMode: 'contain',
                    }}
                    source={imagePaths.logos.profileAvatarImage}
                  />
                </TouchableOpacity>
              )}

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'mulish-bold',
                  color: COLORS.black,
                }}
              >
                {user?.userInfo?.firstName} {user?.userInfo?.lastName}
              </Text>
            </View>

            <DrawerItemList {...props}
          />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        activeTintColor: COLORS.appSecondaryColor,
        inactiveTintColor: COLORS.black,
        drawerStyle: {
          backgroundColor: COLORS.whiteColor,
          width: 250,
        },
      }}
    >
      <Drawer.Screen
        name='BottomTabNavigation'
        options={{
          drawerLabelStyle: {
            fontFamily: 'mulish-medium',
            textAlign: 'left',
            fontSize: 14,
          },
          drawerLabel: 'Home',
          title: 'IQ Candy',
          headerTitleAlign: 'center', // Align title in the center
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleLogout(navigation)}
              style={{ marginRight: 10 }}
            >
              <AntDesign name='logout' size={24} color='white' />
            </TouchableOpacity>
          ),

          headerShadowVisible: false,
          drawerIcon: () => (
            <IonIcon name='home-outline' size={24} color={COLORS.black} />
          ),
        }}
        component={BottomTabNavigation}
      />
      <Drawer.Screen
        name='Profile'
        options={{
          drawerLabelStyle: {
            fontFamily: 'mulish-medium',
            textAlign: 'left',
            fontSize: 14,
          },
          drawerLabel: 'My Profile',
          title: 'My Profile',
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 20 / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/editicon.png')}
                style={{ width: 10, height: 10 , tintColor:COLORS.appSecondaryColor}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          drawerIcon: () => (
            <IonIcon
              name='person-circle-outline'
              size={24}
              color={COLORS.black}
            />
          ),
        }}
        component={ProfilePage}
      />
      <Drawer.Screen
        name='Refer & Earn'
        options={{
          drawerLabelStyle: {
            fontFamily: 'mulish-medium',
            textAlign: 'left',
            fontSize: 14,
          },
          drawerLabel: 'Refer & Earn',
          title: 'Refer & Earn',
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
          headerShadowVisible: false,
          drawerIcon: () => (
            <IonIcon name='cash-outline' size={24} color={COLORS.black} />
          ),
        }}
        component={ReferEarn}
      />
      <Drawer.Screen
        name='Change Password'
        options={{
          drawerLabelStyle: {
            fontFamily: 'mulish-medium',
            textAlign: 'left',
            fontSize: 14,
          },
          drawerLabel: 'Change Password',
          title: 'Change Password',
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
          headerShadowVisible: false,
          drawerIcon: () => (
            <IonIcon
              name='lock-closed-outline'
              size={24}
              color={COLORS.black}
            />
          ),
        }}
        component={ChangePassword}
      />
      <Drawer.Screen
        name='Contact Us'
        options={{
          drawerLabelStyle: {
            fontFamily: 'mulish-medium',
            textAlign: 'left',
            fontSize: 14,
          },
          drawerLabel: 'Contact Us',
          title: 'Contact Us',
          headerTintColor: COLORS.whiteColor,
          headerStyle: {
            backgroundColor: COLORS.appSecondaryColor,
          },
          headerTitleStyle: {
            color: COLORS.whiteColor,
            fontFamily: 'mulish-bold',
            textAlign: 'justify',
            fontSize: 16,
          },
          headerShadowVisible: false,
          drawerIcon: () => (
            <IonIcon name='call-outline' size={24} color={COLORS.black} />
          ),
        }}
        component={ContactUs}
       // onPress={()=>alert('hiii')}
      />
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
