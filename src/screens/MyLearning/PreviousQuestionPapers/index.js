//Post Assessment
import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from '../../../utils/navigationUtils';
import { COLORS } from '../../../constants/colors';
import Header from '../../../components/Header';
import PreQuestionPaperCard from '../../../components/PreQuestionPaperCard';
import { useTranslation } from 'react-i18next';

import {
  getPreviousQuesPaperTypes,
  getQuestionPapers,
} from '../../../api/myLearning';
import { selectMyLearning } from '../../../store/student/myLearning/selector';
import { selectUser } from '../../../store/authManagement/selector';
import i18n from '../../../i18n/index1';

const PreviousQuestionPapers = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { t } = useTranslation(); //i18n instance

  const { previousQuesPaperTypes, questionPapers } =
    useSelector(selectMyLearning);
  useEffect(() => {
    if (user) {
      getPreviousQuesPaperTypes({
        dispatch,
        userId: user?.userInfo?.userId,
      });

      getQuestionPapers({
        dispatch,
        userId: user?.userInfo?.userId,
      });
    }
  }, [user]);

  const backAction = () => {
    goBack(navigation);
  };

  const gotoActivityResouce = (item) => {
    navigation.navigate('PrePaperAssessment', { data: item });
  };

  const renderItem = ({ item }) => (
    <PreQuestionPaperCard
      item={item}
      onPress={() => {
        gotoActivityResouce(item);
      }}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        It seems that there is no question paper types here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={t('pqp')} />
      <View style={[styles.container, styles.shadowProp]}>
        <FlatList
          data={questionPapers?.items}
          keyExtractor={(item) => item.questionPaperId}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default PreviousQuestionPapers;

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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2,
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    color: COLORS.tabBarLabelInactiveColor,
    fontFamily: 'mulish-regular',
  },
});
