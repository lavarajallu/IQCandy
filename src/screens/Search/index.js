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

const Search = (props) => {
  const dispatch = useDispatch();
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
    getValidaPackages({
      dispatch,
      userId: user?.userInfo?.userId,
    });
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
        universityId: user?.userOrg?.universityId,
        subjectId: item.subjectId,
        chapterId: item.chapterId,
        topicId: item.topicId,
        branchId: user?.userOrg?.branchId,
        semesterId: user?.userOrg?.semesterId,
      });
      //   Actions.push('topicmainview', { from: 'searchpage', data: item });
    } else if (item.searchEntity === 'chapter') {
      setSelectedItem(item);
      getChapterDetails({
        dispatch,
        userId: user?.userInfo?.userId,
        universityId: user?.userOrg?.universityId,
        subjectId: item.subjectId,
        chapterId: item.chapterId,
        branchId: user?.userOrg?.branchId,
        semesterId: user?.userOrg?.semesterId,
      });
    }
  };
  useEffect(() => {
    if (topicDetails && Object.keys(topicDetails).length > 0) {
      navigation.navigate('ActivityResources', {
        topicItem: { ...selectedItem, ['image']: topicDetails.image },
        chapterItem: {},
      });
    }
  }, [topicDetails]);
  useEffect(() => {
    if (chapterDetails && Object.keys(chapterDetails).length > 0) {
      navigation.navigate('MyTopics', {
        chapterItem: { ...selectedItem, ['image']: chapterDetails.image },
      });
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
            editable={
              (user?.role?.roleName === 'General Student' &&
                validatePackage?.subscriptionStatus === 'active') ||
              user?.role?.roleName === 'Student'
                ? true
                : false
            }
            placeholder={'Search for Chapters and Topics...'}
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
        ) : (user?.role?.roleName === 'General Student' &&
            validatePackage?.subscriptionStatus === 'active') ||
          user?.role?.roleName === 'Student' ? (
          searchList?.length > 0 ? (
            <FlatList
              data={searchList}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              //ItemSeparatorComponent={this.itemseperator.bind(this)}
            />
          ) : noData ? (
            <View style={styles.spinnerview}>
              <Text>No Data</Text>
            </View>
          ) : null
        ) : (
          <View style={styles.spinnerview}>
            <Text style={styles.subscribeText}>
              You need to subscribe to access this feature of searching
            </Text>
            <Text style={styles.boldText}> Please subscribe now </Text>
            <TouchableOpacity onPress={onYes}>
              <View style={styles.subscibebutton}>
                <Text style={{ color: 'white' }}>Subscribe</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
