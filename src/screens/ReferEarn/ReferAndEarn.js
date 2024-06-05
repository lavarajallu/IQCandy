import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Share } from 'react-native';
import Button from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { upperCaseText } from '../../constants/helpers';
import { useSelector, useDispatch } from 'react-redux';

import { getReferalCode } from '../../api/referAndEarn';
const { width, height } = Dimensions.get('window');
import { selectUser } from '../../store/authManagement/selector';
import { selectReferandEarn } from '../../store/student/referAndEarn/selector';
import i18n from '../../i18n';

const ReferAndEarn = (props) => {
  const { referCode } = props;
  const [spinner, setSpinner] = useState(true);
  const [referalcode, setReferalCode] = useState('null');

  useEffect(() => {
    if (referCode && Object.keys(referCode).length > 0) {
      var inviteUrl = referCode?.inviteUrl;
      var newdata = inviteUrl.split('/');

      var newcode = newdata[newdata.length - 1];

      var code = newcode.split('-');
      var referalcode = code[1];
      setReferalCode(referalcode);
      setSpinner(false);
    }
  });
  const onRefer = async () => {
    const options = {
      title: 'IQ Candy',
      subject: 'Referal Invite',
      message: 'HI Your Referal code is  ' + referalcode,
    };
    try {
      const result = await Share.share({
        message: 'HI Your Referal code is ' + referalcode,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.instructionsImage}>
        <Image source={require('../../../assets/images/Refer/tab02.png')} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t('referhelptext')}</Text>

        <Text style={styles.description}>{i18n.t('referhelptext2')}</Text>

        <Text style={styles.referCodeLabel}>{i18n.t('yourreferecode')}</Text>

        <View style={styles.referCodeContainer}>
          {spinner ? (
            <Text>{i18n.t('loading')}</Text>
          ) : (
            <Text style={styles.referCodeText}>{referalcode}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={i18n.t('refernow')}
            textStyle={styles.buttonText}
            onPress={() => onRefer()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructionsImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold',
    color: COLORS.coursesColor,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'mulish-medium',
    color: COLORS.black,
    marginVertical: 10,
  },
  referCodeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold',
    color: COLORS.coursesColor,
    marginVertical: 5,
  },
  referCodeContainer: {
    backgroundColor: '#DEFCFF',
    height: 50,
    width: width * 0.5,
    borderRadius: 8,
    justifyContent: 'center',
  },
  referCodeText: {
    color: '#43969F',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  button: {
    width: width * 0.8,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.appSecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.whiteColor,
    fontSize: 20,
    fontFamily: 'mulish-bold',
    fontWeight: '700',
  },
});

export default ReferAndEarn;
