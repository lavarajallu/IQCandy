import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { goBack } from '../../utils/navigationUtils';
import { COLORS } from '../../constants/colors';
const REACT_APP_RAZORPAY_URL = 'https://secure.payu.in/_payment';
const REACT_APP_RAZORPAY_KEY = 'rzp_live_TOvkgnISWcCcke'; //"rzp_test_4p2cFlw7vaotvb"
const REACT_APP_RAZORPAY_NAME = 'IQ Candy';
const REACT_APP_RAZORPAY_DESCRIPTION = 'SmartGen Technologies Pvt Ltd';
import RazorpayCheckout from 'react-native-razorpay';

import {
  SafeAreaView,
  View,
  Platform,
  Image,
  Text,
  Keyboard,
  Dimensions,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { selectUser } from '../../store/authManagement/selector';
const { width, height } = Dimensions.get('window');
import {
  getsubjectpackages,
  activationapi,
  promoCodeapi,
  paymentapi,
  razorapyapi,
} from '../../api/validatePackages';
import { selectValidatePackage } from '../../store/student/validatePackages/selector';
import styles from './styles';
import { setgetassesmentsdata } from '../../store/student/myCourses/slice';
const BuyPackages = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const {
    getpackages,
    activatioapidata,
    promocodeapidata,
    razorpaydata,
    paymentapidata,
  } = useSelector(selectValidatePackage);
  const [subjects, setSubjects] = useState([]);
  const [setPackage, setsetPackage] = useState({});
  const [total, settotal] = useState(0);
  const [sgst, setsgst] = useState(0);
  const [seconds, setSeconds] = useState(120);
  const [cgst, setcgst] = useState(0);
  const [finaltotal, setfinaltotal] = useState(0);
  const [promocode, setPromocode] = useState('');
  const [activationcode, setactivationcode] = useState('');
  const [discount_amount, setdiscount_amount] = useState(0);
  const [isProcessing, setisprocessing] = useState(false);
  const [error, seterror] = useState('');
  const [promostatus, setpromostatus] = useState('');
  const [promostatusref, setpromostatusref] = useState('');
  const [discount_coupon, setdiscount_coupons] = useState('');
  const [promoCodeDetails, setpromocodedetails] = useState({});
  const [orderId, setorderId] = useState('');
  const backAction = () => {
    goBack(navigation);
  };
  useEffect(() => {
    var branchId = user?.userOrg.branchId;
    //var url = baseUrl + `/packages/${branchId}/list`;
    getsubjectpackages({
      dispatch,
      userId: user?.userInfo?.userId,
      branchId: branchId,
    });
  }, [user]);
  useEffect(() => {
    if (getpackages && Object.keys(getpackages).length > 0) {
      var newpackge = getpackages.subjectPackages
        ? getpackages.subjectPackages.concat(getpackages.groupPackage)
        : getpackages.groupPackage
        ? getpackages.groupPackage
        : null;

      setSubjects(newpackge);
    }
  });
  useEffect(() => {
    if (activatioapidata?.code === 201) {
      setactivationcode('');
      Alert.alert('IQ Candy', 'Activation code applied successfully.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('DrawerNavigation');
          },
        },
      ]);
    } else {
      setactivationcode('');
    }
  }, [activatioapidata]);
  const onCheckBoxClick = (item, index) => {
    var totalval = parseInt(item.cost);
    var totalgst = 0;

    totalgst = (totalval * 9) / 100;
    setsetPackage(item);
    settotal(totalval);
    setsgst(totalgst);
    setcgst(totalgst);
    setfinaltotal(parseFloat(totalval - discount_amount + totalgst + totalgst));
  };
  const renderItem = ({ item, index }) => {
    // const isTablet = DeviceConstants.isTablet; // false
    var paddingver = 20,
      headfint = 16,
      rupeefont = 16,
      checkbox = 17;

    return (
      <View
        style={{
          backgroundColor: '#fdf6f6',
          padding: paddingver,
          marginBottom: 10,
          flexDirection: 'row',
        }}
      >
        <View style={styles.titleView}>
          <Text style={{ fontSize: headfint }}>{item.name}</Text>
        </View>
        <View style={styles.emptyView} />
        <View style={{ flex: 0.4 }}>
          <Text style={[styles.text, { fontSize: rupeefont }]}>
            <Text style={{ fontSize: headfint }}>
              ₹ {item.cost}
              {'\n'}
            </Text>
            {'Validity: '}
            {item.toMonth}/{item.toYear}
          </Text>
        </View>
        <View style={styles.emptyView} />

        <View style={styles.radioBtnView}>
          {item === setPackage ? (
            <TouchableOpacity onPress={() => onCheckBoxClick(item, false)}>
              <Image
                source={require('../../../assets/images/check.png')}
                style={{
                  width: checkbox,
                  height: checkbox,
                  alignSelf: 'center',
                  tintColor: '#959595',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onCheckBoxClick(item, true)}>
              <Image
                source={require('../../../assets/images/uncheck.png')}
                style={{
                  width: checkbox,
                  height: checkbox,
                  alignSelf: 'center',
                  tintColor: '#959595',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const onPay = () => {
    var totalnew = total - discount_amount + cgst + sgst;
    if (total) {
      neworderIDAPI();
    }
  };
  const neworderIDAPI = () => {
    let body = {
      paymentType: 'razorpay',
      packageId: setPackage.id,
      activationCode: '',
      packageCost: parseFloat(total),
      cgst: parseFloat(cgst),
      sgst: parseFloat(sgst),
      promoCode: promoCodeDetails?.promoCode || '',
      promoCodeId: promoCodeDetails?.id || '',
      promoCodeAmount: discount_amount,
      totalPrice: parseFloat(
        parseFloat(
          parseFloat(total) -
            parseFloat(discount_amount) +
            parseFloat(cgst) +
            parseFloat(sgst)
        ).toFixed(2)
      ),
      userId: user?.userInfo?.userId,
    };

    paymentapi({
      dispatch,
      data: body,
      packageId: setPackage.id,
    });
  };
  useEffect(() => {
    if (paymentapidata && paymentapidata?.orderId) {
      setorderId(paymentapidata?.orderId);
      initiatePayment(paymentapidata);
    }
  }, [paymentapidata]);
  const initiatePayment = (data) => {
    const { amount, orderId, currency } = data;

    //  var amount = 1
    var options = {
      description: 'IQ Candy',
      image: require('../../../assets/images/Logo.jpg'),
      currency,
      key: REACT_APP_RAZORPAY_KEY,
      amount: amount.toString(),
      name: 'IQ Candy',
      order_id: orderId, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        name: user?.userInfo.firstName + ' ' + user?.userInfo.lastName,
        email: user?.userInfo.email,
        contact: user?.userInfo.mobileNumber,
      },

      notes: {
        address: '',
      },
      theme: {
        color: '#61dafb',
      },
    };
    RazorpayCheckout.open(options).then((response) => {
      const newdata = {
        orderCreationId: data.id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        reference_id: data.id,
      };
      razorapyapi({
        dispatch,
        userId: user?.userInfo?.userId,
      });
    });
  };
  useState(() => {
    if (razorpaydata?.data) {
      if (razorpaydata?.data?.paymentStatus === 'payment_success') {
        Alert.alert('IQ Candy', 'Payment is done successfully.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('DrawerNavigation');
            },
          },
        ]);
      } else {
        Alert.alert('IQ Candy', 'Payment is not done please try agian.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('DrawerNavigation');
            },
          },
        ]);
      }
    } else {
    }
  }, [razorpaydata]);
  const onactivationapply = () => {
    Keyboard.dismiss();
    setactivationcode('');
    let data = {
      paymentType: 'activation_card',
      packageId: setPackage.id,
      activationCode: activationcode,
      packageCost: parseFloat(total),
      cgst: parseFloat(cgst),
      sgst: parseFloat(sgst),
      promoCode: '',
      promoCodeId: '',
      promoCodeAmount: 0,
      totalPrice: finaltotal,
      userId: user?.userInfo?.userId,
    };
    // setisprocessing(true);
    activationapi({
      dispatch,
      data: data,
    });
    //   var url = baseUrl + `/packages/${this.state.setPackage.id}/payments`;
    //   fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       jwt: this.state.token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       this.setState({
    //         isProcessing: false,
    //       });
    //       if (result.code === 201) {
    //         this.setState({
    //           activationcode: '',
    //         });
    //         Alert.alert('IQ Candy', 'Activation code applied successfully.', [
    //           {
    //             text: 'OK',
    //             onPress: () => {
    //               Actions.dashboard({ type: 'reset' });
    //             },
    //           },
    //         ]);
    //       } else {
    //         alert(result.error.message);
    //         this.setState({
    //           activationcode: '',
    //         });
    //       }
    //     });
  };
  const promoCodeAPI = () => {
    Keyboard.dismiss();
    setPromocode('');
    const data = {
      userId: user?.userInfo.userId,
    };

    promoCodeapi({
      dispatch,
      data: data,
      promocode: promocode,
    });
  };
  useEffect(() => {
    if (promocodeapidata?.data) {
      if (promocodeapidata?.data?.promoCodeType === 'money') {
        setdiscount_amount(parseFloat(result.data.discount));
        setsgst(
          parseFloat(
            ((total - promocodeapidata.data.discount) * 9) / 100
          ).toFixed(2)
        );
        setcgst(
          parseFloat(
            ((total - promocodeapidata.data.discount) * 9) / 100
          ).toFixed(2)
        );
        setpromocodedetails(promocodeapidata.data);
        starttimer();
      } else if (promocodeapidata.data.promoCodeType === 'percentage') {
        let percentage = (total * promocodeapidata.data.discount) / 100;
        setpromocodedetails(promocodeapidata.data);
        setdiscount_amount(Math.round(percentage));
        setsgst(parseFloat(((total - percentage) * 9) / 100).toFixed(2));
        setcgst(parseFloat(((total - percentage) * 9) / 100).toFixed(2));

        starttimer();
      } else {
        seterror('Invalid Coupon');
        setPromocode('');
        setpromostatus(true);
        setpromostatusref(promocodeapidata.data.reference_id);
        setdiscount_coupons(promocode);
      }
    } else {
      seterror(promocodeapidata.message);
      setPromocode('');
      setpromostatus(true);
      setpromostatusref('');
      setdiscount_coupons('');
    }
  }, [promocodeapidata]);
  const starttimer = () => {
    var interval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(interval);
        setpromostatus(false), setPromocode('');
        setSeconds(121);
        setdiscount_amount(0);
      }
      setSeconds(seconds - 1);
    }, 1000);
  };
  var headfont = 18,
    textinputheight = 50,
    paywidth = width / 2.5;

  var newtotal = parseFloat(total);
  var discunt = parseFloat(discount_amount);
  var newcgst = parseFloat(cgst);
  var newsgst = parseFloat(sgst);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.appSecondaryColor }}
    >
      <Header backAction={backAction} headerTitle={'Buy Packages'} />
      <View
        style={{
          flex: 0.85,
          backgroundColor: COLORS.whiteColor,
          marginHorizontal: width * 0.03,
          borderWidth: 1,
          borderColor: COLORS.whiteColor,
          borderRadius: 4,
          marginVertical: 10,
          shadowOffset: { width: 2, height: 4 },
          shadowColor: COLORS.black,
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={200}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {subjects.length > 0 ? (
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                {/* <Text style={{ fontSize: 20, color: colors.Themecolor, }} >Single Packages</Text> */}

                <FlatList
                  data={subjects}
                  renderItem={renderItem}
                  extraData={route.params}
                  keyExtractor={(item) => item.id}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 12 }}>No Data</Text>
              </View>
            )}

            {total > 0 ? (
              <>
                <>
                  <View
                    style={{
                      margin: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <TextInput
                      style={{
                        borderColor: 'lightgrey',
                        borderBottomWidth: 1,
                        borderWidth: 0.5,
                        borderColor: 'lightgrey',
                        height: textinputheight,
                        paddingStart: 10,
                        width: width / 1.2,
                        fontSize: 14,
                        borderRadius: 10,
                      }}
                      placeholder='Having Promocode ?'
                      placeholderTextColor={'darkgrey'}
                      value={promocode}
                      onChangeText={(promocode) => {
                        setPromocode(promocode);
                        seterror('');
                      }}
                    />
                    {promocode === '' ? null : (
                      <TouchableOpacity
                        onPress={promoCodeAPI}
                        style={{
                          position: 'absolute',
                          paddingHorizontal: 10,
                          marginLeft: width / 1.5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 14 }}>Apply</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {promocode === '' ? null : error !== '' ? (
                    <Text style={{ color: 'red', marginLeft: 20 }}>
                      Invalid Coupon
                    </Text>
                  ) : null}
                </>
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <TextInput
                    style={{
                      borderColor: 'lightgrey',
                      borderBottomWidth: 1,
                      borderWidth: 0.5,
                      borderColor: 'lightgrey',
                      height: textinputheight,
                      paddingStart: 10,
                      width: width / 1.2,
                      fontSize: 14,
                      borderRadius: 10,
                    }}
                    value={activationcode}
                    placeholder='Having Activationcode ?'
                    placeholderTextColor={'darkgrey'}
                    onChangeText={(activationcode) =>
                      setactivationcode(activationcode)
                    }
                  />
                  {activationcode === '' ? null : (
                    <TouchableOpacity
                      onPress={onactivationapply}
                      style={{
                        position: 'absolute',
                        paddingHorizontal: 10,
                        marginLeft: width / 1.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>Apply</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ margin: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      Price
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      ₹ {total}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      Discount (-)
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      ₹ {discount_amount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      CGST (9%)
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      ₹ {cgst}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      SGST (9%)
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      ₹ {sgst}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                      }}
                    >
                      ₹{' '}
                      {parseFloat(
                        newtotal - discunt + newcgst + newsgst
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: COLORS.appSecondaryColor,
                    flexDirection: 'row',
                    height: textinputheight,
                    borderRadius: 10,
                    marginVertical: 20,
                    width: paywidth,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={onPay}
                    style={{
                      flexDirection: 'row',
                      height: textinputheight,
                      borderRadius: 10,
                      width: paywidth,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={[styles.payText, { fontSize: 14 }]}>Pay</Text>
                    {seconds !== 120 && promocode !== '' ? (
                      <Text style={{ fontSize: 15, color: 'white' }}>
                        ({parseInt(seconds / 60, 10)}:
                        {parseInt(seconds % 60, 10)})
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {isProcessing ? (
        <View
          style={{
            height: height,
            width: width,
            position: 'absolute',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default BuyPackages;
