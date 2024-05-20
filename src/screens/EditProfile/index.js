import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  View,
  Platform,
  Image,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { imagePaths } from '../../constants/path';
import * as Progress from 'react-native-progress';
const { width, height } = Dimensions.get('window');
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Header from '../../components/Header';
import { goBack } from '../../utils/navigationUtils';
import DropDownSearch from '../../components/DropdownSearch';
import { textContent } from '../../constants/content';
import Button from '../../components/Button';
import styles from './styles';
import { selectUser } from '../../store/authManagement/selector';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile, getUserData } from '../../api/profile';
import { selectMyProfile } from '../../store/student/MyProfile/selector';
import { COLORS } from '../../constants/colors';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('Phanendra');
  const [lastName, setLastName] = useState('Reddy');
  const [email, setEmail] = useState('phani@gmail.com');
  const [universityName, setUniversityNamae] = useState('GVPCEW');
  const [boardName, setBoardName] = useState('CSE');
  const [semisterName, setSemisterName] = useState('2');
  const [mobileNumber, setMobileNumber] = useState('1234567892');
  const [profilePic, setProfilepic] = useState(null);
  const { user } = useSelector(selectUser);
  const { updateProfiledata } = useSelector(selectMyProfile);
  const onChangeUniversity = (sub) => {
    setSelectedUniversity(sub);
  };

  const onChangeBranch = (branch) => {
    setSelectedBranch(branch);
  };

  const onChangeSemister = (sem) => {
    setSelectedSemister(sem);
  };
  const backAction = () => {
    goBack(navigation);
  };
  const selectPhototapped = () => {
    Alert.alert(
      'Choose Option',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Open Camera',
          onPress: () => openCamera(),
        },
        { text: 'Choose from Gallery', onPress: () => pickImage() },
      ],
      { cancelable: false }
    );
  };
  const openCamera = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();

    if (result.granted === false) {
      alert("You've refused to allow this app to access your photos!");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        console.log('dafkadjfdjf', result);

        setProfilepic(result.assets[0].base64);
      }
      // return result;
    }
  };
  useEffect(() => {
    if (updateProfiledata && Object.keys(updateProfiledata).length > 0) {
      getUserData({
        dispatch,
        navigation,
        userId: user?.userInfo?.userId,
      });
      Alert.alert('IQ Candy', 'Profile Updated successfully.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('DrawerNavigation');
          },
        },
      ]);
    }
  });
  const pickImage = async () => {
    //No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('dkjfbckjdbfjkdbfk', result);
    if (!result.canceled) {
      setProfilepic(result.assets[0].base64);
    }
  };
  useState(() => {
    if (user) {
      setFirstName(user.userInfo.firstName);
      setLastName(user.userInfo.lastName);
      setMobileNumber(user.userInfo.mobileNumber);
      setEmail(user.userInfo.email);
      setUniversityNamae(user.userOrg.boardName);
      //setBoardName(user.userOrg.schoolName);
      setSemisterName(user.userOrg.gradeName);
      setProfilepic(user.userInfo.profilePic);
    }
  });
  const update = async () => {
    var newnumber = Math.random();
    if (firstName === '') {
      alert('Please enter First Name');
    } else {
      let result = profilePic?.includes('https');

      if (result) {
        var normladata = {
          firstName: firstName,
          lastName: lastName,
          profilePic: profilePic,
          // fileName:"profilepic"+newnumber+".png"
        };
      } else if (profilePic !== null) {
        var normladata = {
          firstName: firstName,
          lastName: lastName,
          profilePic: 'data:image/png;base64,' + profilePic,
          fileName: 'profilepic' + newnumber + '.png',
        };
      } else {
        var normladata = {
          firstName: firstName,
          lastName: lastName,
          profilePic: null,
          // fileName:"profilepic"+newnumber+".png"
        };
      }
      await updateProfile({
        data: normladata,
        navigation,
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.appSecondaryColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backAction={backAction}
          headerTitle={'Edit Profile'}
          hedercolor={true}
        />

        <View style={styles.subcontainer}>
          <View style={styles.topview}>
            <View style={styles.topinsideview}>
              <TouchableOpacity onPress={selectPhototapped}>
                {profilePic?.indexOf('https') !== -1 ? (
                  <Image
                    source={{ uri: profilePic }}
                    style={styles.imageview}
                  />
                ) : profilePic.indexOf('https') === -1 ? (
                  <Image
                    source={{
                      uri: `data:image/gif;base64,${profilePic}`,
                    }}
                    style={styles.imageview}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/avatar.jpeg')}
                    style={styles.imageview}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  bottom: 85,
                  left: width / 1.8,
                  width: 20,
                  height: 20,
                  borderRadius: 25 / 2,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonIcon
                  name='pencil-outline'
                  size={15}
                  color={COLORS.appSecondaryColor}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomview}>
            <View style={{ flex: 1 }}>
              <View style={{ paddingBottom: 20 }}>
                <ValidatedTextInput
                  label='First Name'
                  editable={true}
                  placeholder='Enter your first name'
                  value={firstName}
                  onChangeText={setFirstName}
                  validation={''}
                  iconName='person-outline'
                />
                <ValidatedTextInput
                  editable={true}
                  label='Last Name'
                  placeholder='Enter your last name'
                  value={lastName}
                  onChangeText={setLastName}
                  validation={''}
                  iconName='person-outline'
                />
                <ValidatedTextInput
                  editable={false}
                  label='Contact'
                  placeholder='Enter your number'
                  value={mobileNumber}
                  inputMode={'numeric'}
                  keyboardType={'number-pad'}
                  onChangeText={setMobileNumber}
                  validation={{
                    showErrorMessage: setMobileNumber === '',
                    errorMessage: 'MobileNo cannot be empty',
                  }}
                  iconName='call-outline'
                />
                <ValidatedTextInput
                  editable={false}
                  label='Email'
                  placeholder='Enter your email Id'
                  value={email}
                  onChangeText={setEmail}
                  validation={{
                    showErrorMessage: setEmail === '',
                    errorMessage: 'Email cannot be empty',
                  }}
                  iconName='mail-outline'
                />
                <ValidatedTextInput
                  editable={false}
                  label='University Name'
                  placeholder='Enter your Board name'
                  value={universityName}
                  onChangeText={setUniversityNamae}
                  validation={{
                    showErrorMessage: setUniversityNamae === '',
                    errorMessage: 'Email cannot be empty',
                  }}
                  iconName='person-outline'
                />
               {/*} <ValidatedTextInput
                  editable={false}
                  label='Board Name'
                  placeholder='Enter your board name'
                  value={boardName}
                  onChangeText={setBoardName}
                  validation={{
                    showErrorMessage: setBoardName === '',
                    errorMessage: 'Email cannot be empty',
                  }}
                  iconName='call-outline'
                />*/}
                <ValidatedTextInput
                  editable={false}
                  label='Semister Name'
                  placeholder='Enter your Grade'
                  value={semisterName}
                  validation={{
                    showErrorMessage: semisterName === '',
                    errorMessage: 'Email cannot be empty',
                  }}
                  onChangeText={setSemisterName}
                  iconName='mail-outline'
                />

                {/* <View
                    style={{
                      justifyContent: 'flex-start',
                      marginLeft: 12,
                    }}
                  >
                    <DropDownSearch
                      placeholderText={'Select University'}
                      data={textContent?.subjectsList}
                      label={''}
                      width={width * 0.89}
                      handleChange={onChangeUniversity}
                      selectedValue={selectedUniversity}
                    />

                    <DropDownSearch
                      placeholderText={'Select Branch'}
                      data={textContent?.subjectsList}
                      label={''}
                      width={width * 0.89}
                      handleChange={onChangeBranch}
                      selectedValue={selectedBranch}
                    />
                    <DropDownSearch
                      placeholderText={'Select Semister'}
                      data={textContent?.subjectsList}
                      label={''}
                      width={width * 0.89}
                      handleChange={onChangeSemister}
                      selectedValue={selectedSemister}
                    />
                  </View> */}
              </View>

              <View style={{ marginBottom: 30 }}>
                <Button
                  title={'Update Profile'}
                  style={{
                    width: width * 0.9,
                    height: 50,
                    borderRadius: 8,
                    backgroundColor: 'red',
                    alignSelf: 'center',
                  }}
                  textStyle={{
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'mulish-bold',
                    fontWeight: '700',
                  }}
                  onPress={() => update()}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
