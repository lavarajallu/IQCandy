import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import { selectUser } from '../../store/authManagement/selector';

import { imagePaths } from '../../constants/path';
import * as Progress from 'react-native-progress';
const { width, height } = Dimensions.get('window');
import ValidatedTextInput from '../../components/ValidatedTextInput';
import styles from './styles';
import { getUserData } from '../../api/profile';
import { selectMyProfile } from '../../store/student/MyProfile/selector';
import { COLORS } from '../../constants/colors';
import i18n from '../../i18n/index1';
// import { setBranches } from '../../store/authManagement/slice';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation(); //i18n instance

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [firstName, setFirstName] = useState('Phanendra');
  const [lastName, setLastName] = useState('Reddy');
  const [email, setEmail] = useState('phani@gmail.com');
  const [universityName, setUniversityNamae] = useState('GVPCEW');
  const [boardName, setBoardName] = useState('CSE');
  const [semisterName, setSemisterName] = useState('2');
  const [mobileNumber, setMobileNumber] = useState('1234567892');
  const [profilePercent, setProfilePercent] = useState(0);
  const { userDetails } = useSelector(selectMyProfile);

  useEffect(() => {
    if (user && Object.keys(user)?.length > 0) {
      var data = user;
      if (Object.keys(data)?.length > 0) {
        var count = 0;
        if (data.userInfo['profilePic']) {
          count = count + 1;
        }
        if (data.userInfo.lastName) {
          count = count + 1;
        }
        if (data.userInfo.dob) {
          count = count + 1;
        }
        if (data.userInfo.mobileNumber) {
          count = count + 1;
        }
        if (data.userInfo.email) {
          count = count + 1;
        }
        if (data.userOrg.universityId) {
          count = count + 1;
        }
        if (data.userOrg.branchId) {
          count = count + 1;
        }
        if (data.userOrg.semesterId) {
          count = count + 1;
        }
        if (data.userInfo.gender) {
          count = count + 1;
        }
        // })

        var profileprcent = count / 8;
        setProfilePercent(profileprcent);
      }
      setFirstName(data.userInfo.firstName);
      setLastName(data.userInfo.lastName);
      setEmail(data.userInfo.email);
      setMobileNumber(data.userInfo.mobileNumber);
      setUniversityNamae(data.userOrg.boardName);
      setBoardName(data.userOrg.branchName);
      setSemisterName(data.userOrg.gradeName);
    }
  }, [user]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topview}>
          <View style={styles.topinsideview}>
            <View style={styles.imageview}>
              {user?.userInfo?.profilePic ? (
                <Image
                  source={{
                    uri: user.userInfo.profilePic,
                  }}
                  style={styles.imagestyles}
                />
              ) : (
                <Image
                  source={imagePaths.myChapters.headerImage}
                  style={styles.imagestyles}
                />
              )}
            </View>
            <View style={styles.headingview}>
              <Text style={styles.headingtext}>{firstName}</Text>
              <Progress.Bar
                progress={profilePercent}
                width={width / 1.8}
                color={'white'}
                unfilledColor={'rgba(255,255,255,0.6)'}
              />
              <Text style={styles.headingsubtext}>
                {Math.round(profilePercent * 100) > 100
                  ? 100
                  : Math.round(profilePercent * 100)}
                % {t('complete')}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomview}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentInsetAdjustmentBehavior='automatic'
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
            >
              <View style={{ paddingBottom: 20 }}>
                <ValidatedTextInput
                  label={t('firstname')}
                  editable={false}
                  placeholder={t('firstname')}
                  value={firstName}
                  onChangeText={setFirstName}
                  validation={''}
                  iconName='person-outline'
                />
                <ValidatedTextInput
                  editable={false}
                  label={t('lastname')}
                  placeholder={t('lastname')}
                  value={lastName}
                  onChangeText={setLastName}
                  validation={''}
                  iconName='person-outline'
                />
                <ValidatedTextInput
                  editable={false}
                  label={t('mobilenumber')}
                  placeholder={t('mobilenumber')}
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
                  label={t('email')}
                  placeholder={t('email')}
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
                {/* <ValidatedTextInput
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
                /> */}
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
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
