import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { selectUser } from '../../store/authManagement/selector';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSearchData,
  getTopicDetails,
  getChapterDetails,
} from '../../api/search';
import { getValidaPackages } from '../../api/validatePackages';
import { selectValidatePackage } from '../../store/student/validatePackages/selector';
import { selectSearch } from '../../store/student/search/selector';
import { COLORS } from '../../constants/colors';
import styles from './styles';
import i18n from '../../i18n/index1';
import { useTranslation } from 'react-i18next';

const Search = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); //i18n instance

  const { user } = useSelector(selectUser);
  const [searchvalue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [validpackages, setValidPAckages] = useState({});
  const [noData, setNoData] = useState(false);
  const [spinner, setSpinner] = useState(false);
  var [selectedItem, setSelectedItem] = useState({});
  const { validatePackage } = useSelector(selectValidatePackage);
  const { searchData, topicDetails, chapterDetails } =
    useSelector(selectSearch);
  const { navigation } = props;
  useEffect(() => {
    // getValidaPackages({
    //   dispatch,
    //   userId: user?.userInfo?.userId,
    // });
  }, [user]);

  const onChangeText = (text) => {
    if (text !== '') {
      setSearchValue(text);
      setSpinner(true);
      ongetserached(text);
    } else {
      setSearchValue(text);
      setSpinner(false);
      setSearchList([]);
    }
  };
  ongetserached = (text) => {
    getSearchData({
      dispatch,
      userId: user?.userInfo?.userId,
      searchValue: text,
    });
  };
  useEffect(() => {
    if (searchData && searchData.length > 0) {
      setSearchList(searchData);
      setSpinner(false);
      setNoData(false);
    } else {
      setSearchList([]);
      setSpinner(false);
      setNoData(false);
    }
  }, [searchData]);
  const oncross = () => {
    setSearchValue('');
    setSearchList([]);
    setNoData(false);
    setSpinner(false);
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onItem(item)}>
        <View style={{ padding: 10, paddingVertical: 20 }} key={index}>
          <Text>
            {item.searchEntity === 'chapter'
              ? item.chapterName
              : item.topicName}
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
      </TouchableOpacity>
    );
  };
  const onItem = (item) => {
    if (item.searchEntity === 'topic') {
      setSelectedItem(item);
      getTopicDetails({
        dispatch,
        userId: user?.userInfo?.userId,
        boardId: user?.userOrg?.boardId,
        subjectId: item.subjectId,
        chapterId: item.chapterId,
        topicId: item.topicId,
        gradeId: user?.userOrg?.gradeId,
      });
      //   Actions.push('topicmainview', { from: 'searchpage', data: item });
    } else if (item.searchEntity === 'chapter') {
      setSelectedItem(item);
      getChapterDetails({
        dispatch,
        userId: user?.userInfo?.userId,
        boardId: user?.userOrg?.boardId,
        subjectId: item.subjectId,
        chapterId: item.chapterId,
        gradeId: user?.userOrg?.gradeId,
      });
    }
  };
  useEffect(() => {
    if (searchList && searchList.length > 0) {
      if (topicDetails && Object.keys(topicDetails).length > 0) {
        setSearchList([]);
        setSearchValue('');
        navigation.navigate('ActivityResources', {
          from: 'search',
          topicItem: { ...selectedItem, ['image']: topicDetails.image },
          chapterItem: {},
        });
      }
    }
  }, [topicDetails]);
  useEffect(() => {
    if (searchList && searchList.length > 0) {
      if (chapterDetails && Object.keys(chapterDetails).length > 0) {
        setSearchList([]);
        setSearchValue('');
        navigation.navigate('MyTopics', {
          from: 'search',
          chapterItem: { ...selectedItem, ['image']: chapterDetails.image },
        });
      }
    }
  }, [chapterDetails]);
  const onYes = () => {
    navigation.navigate('BuyPackages');
  };
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.searchbar}>
          <TextInput
            value={searchvalue}
            // editable={
            //   (user?.role?.roleName === 'General Student' &&
            //     validatePackage?.subscriptionStatus === 'active') ||
            //   user?.role?.roleName === 'Student'
            //     ? true
            //     : false
            // }
            placeholder={t('searchplaceholder')}
            placeholderTextColor={'grey'}
            style={styles.searchtext}
            onChangeText={onChangeText}
          />
          {searchvalue !== '' ? (
            <TouchableOpacity onPress={oncross}>
              <Image
                source={require('../../../assets/images/cancel.png')}
                style={styles.cancelimage}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomView}>
        {spinner ? (
          <View style={styles.spinnerview}>
            <ActivityIndicator />
          </View>
        ) : searchList?.length > 0 ? (
          <FlatList
            data={searchList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            //ItemSeparatorComponent={this.itemseperator.bind(this)}
          />
        ) : noData ? (
          <View style={styles.spinnerview}>
            <Text>{t('nodata')}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Search;
