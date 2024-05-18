import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { SHADOW_STYLES } from '../../constants/helpers';
import * as Progress from 'react-native-progress';
import { selectUser } from '../../store/authManagement/selector';
import { selectReferandEarn } from '../../store/student/referAndEarn/selector';
import { getRegisteredUsers } from '../../api/referAndEarn';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');
const data = [
  {
    inviteeEmail: 'hiii@gmail.com',
    inviteeFirstName: 'krishna',
    inviteeMobile: '123456789',
    accountStatus: 'pending',
    registrationStatus: 'active',
    subscriptionStatus: 'active',
  },
];
FlatList_Header = () => {
  var newfont = 15;
  var itemwidth = 60;
  return (
    ////<ScrollView horizontal>
    <View style={styles.listheadermainview}>
      <View style={[styles.itemsview, { width: itemwidth }]}>
        <Text style={styles.itemtext}>{'S.No'}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 90 }]}>
        <Text style={styles.itemtext}>{'Invitee Email'}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.itemtext}>{'Invitee FirstName'}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + itemwidth }]}>
        <Text style={styles.itemtext}>{'Invitee Mobile'}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.itemtext}>{'Account Status'}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.itemtext}>{'Registration Status'}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.itemtext}>{'Subscription Status'}</Text>
      </View>
    </View>
    //  </ScrollView>
  );
};
const renderItem = ({ item, index }) => {
  var itemwidth = 60,
    newfont = 15;

  return (
    // <ScrollView horizontal>
    <View style={styles.dataheadermainview}>
      <View style={[styles.itemsview, { width: itemwidth }]}>
        <Text style={styles.datatext}>{index + 1}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 90 }]}>
        <Text style={styles.datatext}>{item.inviteeEmail}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.datatext}>{item.inviteeFirstName}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + itemwidth }]}>
        <Text style={styles.datatext}>{item.inviteeMobile}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.datatext}>{item.accountStatus}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.datatext}>{item.registrationStatus}</Text>
      </View>
      <View style={[styles.itemsview, { width: itemwidth + 40 }]}>
        <Text style={styles.datatext}>{item.subscriptionStatus}</Text>
      </View>
    </View>
    // </ScrollView>
  );
};
const ReferredUsers = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { registeredUsers } = useSelector(selectReferandEarn);
  const [referalcode, setReferalCode] = useState('null');
  const [spinner, setSpinner] = useState(true);
  const { referCode, onredeempoints } = props;
  useEffect(() => {
    getRegisteredUsers({
      dispatch,
      userId: user?.userInfo?.userId,
    });
  }, [user]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={[styles.rectanglebox, { backgroundColor: '#C4EDFF' }]}>
            <View style={styles.innertopView}>
              <View style={styles.imageview}>
                <Image
                  source={require('../../../assets/images/Refer/users.png')}
                  style={styles.imagestyle}
                />
              </View>
              <View style={styles.toptextview}>
                <Text style={styles.toptext}>{'Total Referrals'}</Text>
              </View>
            </View>
            <View style={styles.progressView}>
              <Progress.Bar
                progress={0.3}
                width={width / 2.7}
                height={2}
                color={'#2AAFE8'}
                unfilledColor={'#C4EDFF'}
              />
            </View>

            <Text
              style={[
                styles.bottomtext,
                {
                  color: '#2AAFE8',
                },
              ]}
            >
              {registeredUsers?.totalCount || 0}
            </Text>
          </View>
          <View
            style={[
              styles.rectanglebox,
              {
                backgroundColor: '#E4FFC3',
              },
            ]}
          >
            <View style={styles.innertopView}>
              <View style={styles.imageview}>
                <Image
                  source={require('../../../assets/images/Refer/points.png')}
                  style={styles.imagestyle}
                />
              </View>
              <View style={styles.toptextview}>
                <Text style={styles.toptext}>{'Total Available Points'}</Text>
              </View>
            </View>
            <View style={styles.progressView}>
              <Progress.Bar
                progress={0.3}
                width={width / 2.7}
                height={2}
                color={'#77BF1C'}
                unfilledColor={'#E4FFC3'}
              />
            </View>

            <Text
              style={[
                styles.bottomtext,
                {
                  color: '#77BF1C',
                },
              ]}
            >
              {referCode?.userWallet?.rewardPoints || 0}
            </Text>
          </View>
          <View
            style={[
              styles.rectanglebox,
              {
                backgroundColor: '#FEDCBD',
              },
            ]}
          >
            <View style={styles.innertopView}>
              <View style={styles.imageview}>
                <Image
                  source={require('../../../assets/images/Refer/money.png')}
                  style={styles.imagestyle}
                />
              </View>
              <View style={styles.toptextview}>
                <Text style={styles.toptext}>{'Withdrawable Amount'}</Text>
              </View>
            </View>
            <View style={styles.progressView}>
              <Progress.Bar
                progress={0.3}
                width={width / 2.7}
                height={2}
                color={'#ED6A24'}
                unfilledColor={'#FEDCBD'}
              />
            </View>

            <Text
              style={[
                styles.bottomtext,
                {
                  color: '#ED6A24',
                },
              ]}
            >
              {referCode?.userWallet?.withdrawableCash || 0}
            </Text>
          </View>
        </View>
        <View style={styles.middleview}>
          <Text style={styles.middleviewtext}>Referred Users</Text>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={onredeempoints}
          >
            <Text style={styles.redeemtext}>Redeem Points</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView horizontal>
            <FlatList
              ListHeaderComponent={this.FlatList_Header}
              data={registeredUsers?.items}
              renderItem={renderItem}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  subcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  rectanglebox: {
    width: width / 2.5,
    height: 80,
    marginBottom: 20,
    justifyContent: 'space-around',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  innertopView: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageview: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyle: {
    width: 25,
    height: 25,
  },
  toptextview: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toptext: {
    marginRight: 10,
    color: 'black',
    fontWeight: 'bold',

    fontSize: 12,
  },
  progressView: {
    alignItems: 'center',
  },
  bottomtext: {
    fontSize: 12,
    marginLeft: 10,
    textAlign: 'left',
  },
  listheadermainview: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  itemsview: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemtext: {
    color: '#161616',
    fontSize: 15,
  },
  dataheadermainview: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 15,
  },
  datatext: {
    fontSize: 15,
  },
  middleview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
  },
  middleviewtext: {
    marginLeft: 10,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  redeemButton: {
    backgroundColor: COLORS.appSecondaryColor,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginRight: 10,
  },
  redeemtext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default ReferredUsers;
