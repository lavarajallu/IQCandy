import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import Instructions from './Instructions';
import ReferAndEarn from './ReferAndEarn';
import ReferredUsers from './ReferredUsers';
import { SHADOW_STYLES } from '../../constants/helpers';
import Payouts from './Payouts';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import { goBack } from '../../utils/navigationUtils';
import Header from '../../components/Header';
import { getReferalCode, postPayouts } from '../../api/referAndEarn';
import { selectUser } from '../../store/authManagement/selector';
import { selectReferandEarn } from '../../store/student/referAndEarn/selector';
import { validateAccountPoint } from '../../constants/helpers';
const { width } = Dimensions.get('window');
const options = [
  { value: 'bank_account', label: 'Bank Account' },
  { value: 'vpa', label: 'VPA' },
];
const ReferEarn = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { referCode, postPayout } = useSelector(selectReferandEarn);
  var [accountTypevalue, setaccounttypevalue] = useState('bank_account');
  const [newmodal, setnewmodal] = useState(false);
  const [accountnmae, setaccountnmae] = useState('');
  const [accountnumber, setaccountnumber] = useState('');
  const [accountpoints, setaccountpoints] = useState('');
  const [ifsccode, setifsccode] = useState('');
  const [vpaAddress, setvpaAddress] = useState('');
  const [fromscreen, setfromscreen] = useState('load');
  const [accountType, setaccounttype] = useState({
    value: 'bank_account',
    label: 'Bank Account',
  });

  useEffect(() => {
    if (route?.params?.from === 'dashboard') {
      setfromscreen('dashboard');
    } else {
      setfromscreen('sidemenu');
    }
    getReferalCode({
      dispatch,
      userId: user?.userInfo?.userId,
    });
  }, [user]);
  const tabs = [
    { id: '1', title: 'Instructions' },
    { id: '2', title: 'Refer & Earn' },
    { id: '3', title: 'Referred Users' },
    { id: '4', title: 'Payouts' },
  ];

  const [selectedTab, setSelectedTab] = useState('1'); // Default selected tab ID
  const onredeempoints = () => {
    setnewmodal(true);
  };
  const renderTab = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.tabItem,
        {
          backgroundColor:
            selectedTab === item.id ? COLORS.appSecondaryColor : '#F8F8F8',
        },
      ]}
      onPress={() => setSelectedTab(item.id)}
    >
      <Text
        style={[
          styles.tabText,
          { color: selectedTab === item.id ? COLORS.whiteColor : COLORS.black },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  const onsubmitreddem = async () => {
    if (accountnmae === '') {
      alert('Please enter Name');
    } else if (accountpoints === '') {
      alert('please enter Points');
    } else if (!validateAccountPoint(accountpoints)) {
      alert('points should be numbers only');
    } else if (accountnumber === '') {
      alert('Please enter Account Number');
    } else if (ifsccode === '') {
      alert('Please enter IFSC Number');
    } else if (accountTypevalue === 'vpa' && vpaAddress === '') {
      alert('Please enter VPA Number');
    } else {
      const data = {
        userId: user?.userInfo?.userId,
        accountType: accountTypevalue,
        name: accountnmae,
        points: +accountpoints,
      };
      if ((accountTypevalue = 'bank_account')) {
        data.ifsc = ifsccode;
        data.accountNumber = accountnumber;
      } else {
        data.vpaAddress = vpaAddress;
      }
      await postPayouts({ data: data, navigation, dispatch });
    }
  };
  useState(() => {
    if (postPayout && postPayout.code === 201) {
      setnewmodal(false);
    }
  });
  const backAction = () => {
    goBack(navigation);
  };
  return fromscreen === 'dashboard' ? (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Refer & Earn'} />
      <View style={[styles.container, styles.shadowProp]}>
        <View style={styles.tabBarContainer}>
          <View style={styles.tabsContainer}>
            {/* Render custom tabs */}
            {tabs.map(renderTab)}
          </View>

          {/* Render your content based on the selected tab */}
          {selectedTab === '1' && <Instructions />}
          {selectedTab === '2' && <ReferAndEarn referCode={referCode} />}
          {selectedTab === '3' && (
            <ReferredUsers
              referCode={referCode}
              onredeempoints={onredeempoints}
            />
          )}
          {selectedTab === '4' && <Payouts />}

          <Modal isVisible={newmodal}>
            <KeyboardAvoidingView
              style={{ flex: 1, justifyContent: 'center' }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View style={styles.modalview}>
                <>
                  <Text>Account Type:</Text>
                  <Dropdown
                    style={styles.dropdownview}
                    placeholderStyle={{
                      fontSize: 16,
                    }}
                    selectedTextStyle={{
                      fontSize: 16,
                    }}
                    data={options}
                    maxHeight={300}
                    labelField='label'
                    valueField='value'
                    placeholder='Select item'
                    value={accountTypevalue}
                    onChange={(item) => {
                      setaccounttypevalue(item.value);
                      setaccounttype(item);
                    }}
                  />
                </>
                {accountTypevalue === 'bank_account' ? (
                  <>
                    <>
                      <Text style={styles.modaltext}>Name:</Text>
                      <TextInput
                        style={styles.modaltextinput}
                        onChangeText={(text) => setaccountnmae(text)}
                        value={accountnmae}
                      />
                    </>
                    <>
                      <Text style={styles.modaltext}>Account Number:</Text>
                      <TextInput
                        style={styles.modaltextinput}
                        onChangeText={(text) => setaccountnumber(text)}
                        value={accountnumber}
                      />
                    </>
                    <>
                      <Text style={styles.modaltext}>IFSC Code:</Text>
                      <TextInput
                        style={styles.modaltextinput}
                        onChangeText={(text) => setifsccode(text)}
                        value={ifsccode}
                      />
                    </>
                    <>
                      <Text style={styles.modaltext}>Points:</Text>
                      <TextInput
                        style={styles.modaltextinput}
                        onChangeText={(text) => setaccountpoints(text)}
                        value={accountpoints}
                      />
                    </>
                  </>
                ) : (
                  <>
                    <>
                      <Text style={{ marginTop: 10 }}>Name:</Text>
                      <TextInput
                        style={{
                          marginTop: 10,
                          height: 50,
                          borderWidth: 1,
                          borderColor: 'lightgrey',
                          backgroundColor: 'white',
                          borderRadius: 12,
                          padding: 12,
                        }}
                        onChangeText={(text) => setaccountnmae(text)}
                        value={accountnmae}
                      />
                    </>
                    <>
                      <Text style={styles.modaltext}>VPA Address:</Text>
                      <TextInput
                        style={styles.modaltextinput}
                        onChangeText={(text) => setvpaAddress(text)}
                        value={vpaAddress}
                      />
                    </>
                    <>
                      <Text style={styles.modaltext}>Points:</Text>
                      <TextInput
                        style={styles.modaltextinput}
                        onChangeText={(text) => setaccountpoints(text)}
                        value={accountpoints}
                      />
                    </>
                  </>
                )}

                <View style={styles.modalbottomView}>
                  <TouchableOpacity
                    onPress={() => setnewmodal(false)}
                    style={styles.modalbutton}
                  >
                    <Text style={styles.modalbuttontext}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onsubmitreddem}
                    style={styles.modalbutton}
                  >
                    <Text style={styles.modalbuttontext}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabsContainer}>
        {/* Render custom tabs */}
        {tabs.map(renderTab)}
      </View>

      {/* Render your content based on the selected tab */}
      {selectedTab === '1' && <Instructions />}
      {selectedTab === '2' && <ReferAndEarn referCode={referCode} />}
      {selectedTab === '3' && (
        <ReferredUsers referCode={referCode} onredeempoints={onredeempoints} />
      )}
      {selectedTab === '4' && <Payouts />}

      <Modal isVisible={newmodal}>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'center' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalview}>
            <>
              <Text>Account Type:</Text>
              <Dropdown
                style={styles.dropdownview}
                placeholderStyle={{
                  fontSize: 16,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                }}
                data={options}
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder='Select item'
                value={accountTypevalue}
                onChange={(item) => {
                  setaccounttypevalue(item.value);
                  setaccounttype(item);
                }}
              />
            </>
            {accountTypevalue === 'bank_account' ? (
              <>
                <>
                  <Text style={styles.modaltext}>Name:</Text>
                  <TextInput
                    style={styles.modaltextinput}
                    onChangeText={(text) => setaccountnmae(text)}
                    value={accountnmae}
                  />
                </>
                <>
                  <Text style={styles.modaltext}>Account Number:</Text>
                  <TextInput
                    style={styles.modaltextinput}
                    onChangeText={(text) => setaccountnumber(text)}
                    value={accountnumber}
                  />
                </>
                <>
                  <Text style={styles.modaltext}>IFSC Code:</Text>
                  <TextInput
                    style={styles.modaltextinput}
                    onChangeText={(text) => setifsccode(text)}
                    value={ifsccode}
                  />
                </>
                <>
                  <Text style={styles.modaltext}>Points:</Text>
                  <TextInput
                    style={styles.modaltextinput}
                    onChangeText={(text) => setaccountpoints(text)}
                    value={accountpoints}
                  />
                </>
              </>
            ) : (
              <>
                <>
                  <Text style={{ marginTop: 10 }}>Name:</Text>
                  <TextInput
                    style={{
                      marginTop: 10,
                      height: 50,
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      backgroundColor: 'white',
                      borderRadius: 12,
                      padding: 12,
                    }}
                    onChangeText={(text) => setaccountnmae(text)}
                    value={accountnmae}
                  />
                </>
                <>
                  <Text style={styles.modaltext}>VPA Address:</Text>
                  <TextInput
                    style={styles.modaltextinput}
                    onChangeText={(text) => setvpaAddress(text)}
                    value={vpaAddress}
                  />
                </>
                <>
                  <Text style={styles.modaltext}>Points:</Text>
                  <TextInput
                    style={styles.modaltextinput}
                    onChangeText={(text) => setaccountpoints(text)}
                    value={accountpoints}
                  />
                </>
              </>
            )}

            <View style={styles.modalbottomView}>
              <TouchableOpacity
                onPress={() => setnewmodal(false)}
                style={styles.modalbutton}
              >
                <Text style={styles.modalbuttontext}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onsubmitreddem}
                style={styles.modalbutton}
              >
                <Text style={styles.modalbuttontext}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: '#f0f0f0',
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
  modalview: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  modaltextinput: {
    marginTop: 10,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  modalbottomView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalbuttontext: { color: 'white', fontSize: 16 },

  modalbutton: {
    height: 40,
    backgroundColor: COLORS.appSecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modaltext: {
    marginTop: 10,
  },
  tabBarContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add space between buttons
  },
  tabItem: {
    height: 35,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.appSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
    ...SHADOW_STYLES,
  },
  tabText: {
    fontSize: 10,
    fontFamily: 'mulish-bold',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  dropdownview: {
    marginTop: 10,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
});

export default ReferEarn;
