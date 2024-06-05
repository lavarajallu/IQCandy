import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DynamicHeader from '../../components/DynamicHeader';
import ChaptersList from '../../components/ChaptersList';
import Modal from 'react-native-modal';

import { textContent } from '../../constants/content';
import { goBack } from '../../utils/navigationUtils'; // Import the common function
import { selectMyCourses } from '../../store/student/myCourses/selector';
import { selectUser } from '../../store/authManagement/selector';
import { getChapters } from '../../api/myCourses';
import { getValidaPackages } from '../../api/validatePackages';
import { selectValidatePackage } from '../../store/student/validatePackages/selector';
import { COLORS } from '../../constants/colors';
import styles from './styles';
import i18n from '../../i18n';

const MyChapters = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { chapters } = useSelector(selectMyCourses);
  const { subjectItem } = route.params;
  const { validatePackage } = useSelector(selectValidatePackage);
  const [isvisible, setVisible] = useState(false);
  const goToTopics = (item) => {
    navigation.navigate('MyTopics', {
      chapterItem: item,
      subjectItem: subjectItem,
    });
  };

  useEffect(() => {
    if (user) {
      const payload = {
        boardId: user.userOrg.boardId,
        gradeId: user.userOrg.gradeId,
        subjectId: subjectItem?.subjectId,
        // universityId: user.userOrg.universityId,
        // branchId: user.userOrg.branchId,
        // semesterId: user.userOrg.semesterId,
        // subjectId: subjectItem?.subjectId,
        offset: 0,
        limit: 1000,
      };

      getChapters({
        data: payload,
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  }, [route]);
  const onlockmodal = () => {
    setVisible(true);
  };
  const onYes = () => {
    setVisible(false);
    navigation.navigate('BuyPackages');
  };
  const onNo = () => {
    setVisible(false);
  };
  return (
    <>
      <DynamicHeader
        title={subjectItem?.name}
        backAction={() => {
          if (route.params.from === 'search') {
            navigation.navigate('DrawerNavigation', {
              from: 'mychapters',
              navigation: navigation,
            });
          } else {
            navigation.navigate('DrawerNavigation', {
              from: 'mychapters',
              navigation: navigation,
            });
          }
          // Handle back button press
        }}
        imageSource={{ uri: subjectItem?.image }}
        labels={[chapters?.items?.length + ' ' + i18n.t('chapters')]}
      />

      <ChaptersList
        data={chapters?.items}
        user={user}
        onChange={(item) => goToTopics(item)}
        onlockmodal={onlockmodal}
        // validatePackage={validatePackage ? validatePackage : null}
      />
      <Modal isVisible={isvisible}>
        <View style={styles.modalview}>
          <View style={styles.modalinnerview}>
            <Text style={styles.modalheadtext}>
              Please subscribe for full access
            </Text>
            <Text style={styles.modalsubtext}> Please subscribe now </Text>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={onNo}>
                <View style={styles.buttoninnerview}>
                  <Text style={styles.buttonText}>No</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onYes}>
                <View style={styles.buttoninnerview}>
                  <Text style={styles.buttonText}>YES</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyChapters;
