import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import moment from 'moment';

import { SHADOW_STYLES } from '../../constants/helpers';
import { selectUser } from '../../store/authManagement/selector';
import { selectReferandEarn } from '../../store/student/referAndEarn/selector';
import { getPayoutData } from '../../api/referAndEarn';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Colors } from 'react-native-activity-rings/dist/src/Themes';
import i18n from '../../i18n';
const { width } = Dimensions.get('window');

const commonStyles = {
  flexContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headingContainer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  imageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: width * 0.8,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW_STYLES,
  },
  buttonText: {
    color: COLORS.tabBarLabelInactiveColor,
    fontSize: 20,
    fontFamily: 'mulish-bold',
    fontWeight: '700',
  },
  mainView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    flex: 1,
    backgroundColor: COLORS.appSecondaryColor,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  headerSubView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headertext: {
    color: 'white',
    fontSize: 15,
  },
  listMainView: {
    flex: 1,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 20,
  },
  listsubview: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listtext: {
    fontSize: 15,
  },
  nodataview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Payouts = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { payoutData } = useSelector(selectReferandEarn);
  const [paymemntload, setPaymentLoad] = useState(true);
  useEffect(() => {
    getPayoutData({
      dispatch,
      userId: user?.userInfo?.userId,
    });
  }, [user]);
  useState(() => {
    if (payoutData) {
      setPaymentLoad(false);
    }
  });
  const FlatList_Headerpayout = () => {
    var itemwidth = 60,
      newfont = 15;

    return (
      ////<ScrollView horizontal>
      <View style={commonStyles.headerView}>
        <View
          style={[
            commonStyles.headerSubView,
            {
              width: itemwidth,
            },
          ]}
        >
          <Text style={commonStyles.headertext}>{'S.No'}</Text>
        </View>
        <View
          style={[
            commonStyles.headerSubView,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.headertext}>{'Amount'}</Text>
        </View>
        <View
          style={[
            commonStyles.headerSubView,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.headertext}>{'Payment Mode'}</Text>
        </View>
        <View
          style={[
            commonStyles.headerSubView,
            {
              width: itemwidth + 60,
            },
          ]}
        >
          <Text style={commonStyles.headertext}>{'Redeem Points'}</Text>
        </View>
        <View
          style={[
            commonStyles.headerSubView,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.headertext}>{'Payout Requested Date'}</Text>
        </View>
        <View
          style={[
            commonStyles.headerSubView,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.headertext}>{'Payment Status'}</Text>
        </View>
      </View>
      //  </ScrollView>
    );
  };
  const renderpaymentinfo = ({ item, index }) => {
    var itemwidth = 60,
      newfont = 15;

    return (
      // <ScrollView horizontal>
      <View style={commonStyles.listMainView}>
        <View
          style={[
            commonStyles.listsubview,
            {
              width: itemwidth,
            },
          ]}
        >
          <Text style={commonStyles.listtext}>{index + 1}</Text>
        </View>
        <View
          style={[
            commonStyles.listsubview,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.listtext}>{item.amount}</Text>
        </View>
        <View
          style={[
            commonStyles.listsubview,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.listtext}>{item.mode}</Text>
        </View>
        <View
          style={[
            commonStyles.listsubview,
            {
              width: itemwidth + 60,
            },
          ]}
        >
          <Text style={commonStyles.listtext}>{item.points}</Text>
        </View>
        <View
          style={[
            commonStyles.listsubview,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.listtext}>
            {item.payoutRequestedAt
              ? moment(new Date(item.payoutRequestedAt * 1000)).format(
                  'MMMM Do YYYY'
                )
              : null}
          </Text>
        </View>
        <View
          style={[
            commonStyles.listsubview,
            {
              width: itemwidth + 40,
            },
          ]}
        >
          <Text style={commonStyles.listtext}>{item.payoutStatus}</Text>
        </View>
      </View>
      // </ScrollView>
    );
  };
  return (
    <>
      <View style={commonStyles.flexContainer}>
        <View style={commonStyles.headingContainer}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'mulish-bold',
              textAlign: 'left',
            }}
          >
            Payment Information:
          </Text>
        </View>
        {paymemntload ? (
          <View style={commonStyles.mainView}>
            <Text style={{ fontSize: 15 }}>{i18n.t('loading')}</Text>
          </View>
        ) : payoutData?.items?.length > 0 ? (
          <ScrollView horizontal>
            <FlatList
              ListHeaderComponent={FlatList_Headerpayout}
              data={payoutData?.items}
              renderItem={renderpaymentinfo}
            />
          </ScrollView>
        ) : (
          <View style={commonStyles.nodataview}>
            <View style={commonStyles.imageContainer}>
              <Image
                source={require('../../../assets/images/Refer/no_data.png')}
              />
            </View>
            <View style={commonStyles.buttonContainer}>
              <View style={commonStyles.button}>
                <Text style={commonStyles.buttonText}>{i18n.t('nodata')}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default Payouts;
