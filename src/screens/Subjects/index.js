//Post Assessment

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
//import Pdf from 'react-native-pdf';

import { goBack } from '../../utils/navigationUtils';
import { COLORS } from '../../constants/colors';
import Header from '../../components/Header';
import { selectUser } from '../../store/authManagement/selector';
import { selectMyCourses } from '../../store/student/myCourses/selector';
import ItemSeparator from '../../components/ItemSeparator';
import CoursesCard from '../../components/CoursesCard';
import i18n from '../../i18n';

const Subjects = ({ route, navigation }) => {
  const { notesActivityData } = useSelector(selectMyCourses);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { subjects } = useSelector(selectMyCourses);

  const backAction = () => {
    goBack(navigation);
  };

  const renderItem = ({ item }) => (
    <CoursesCard
      item={item}
      onChange={(item) => gotoChaptersPage(item)}
      fromscreen={'Fullsubjects'}
    />
  );
  const gotoChaptersPage = (item) => {
    navigation.navigate('MyChapters', { subjectItem: item });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={i18n.t('subjects')} />
      <View style={[styles.container, styles.shadowProp]}>
        <FlatList
          data={subjects?.items}
          keyExtractor={(item) => item.idx}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2} // Set the number of columns to 2
          //   ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

export default Subjects;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  container: {
    flex: 0.85,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.whiteColor,
    borderRadius: 4,
    marginVertical: 10,
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
