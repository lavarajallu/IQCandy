import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { selectUser } from '../../store/authManagement/selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import { goBack } from '../../utils/navigationUtils';

import { COLORS } from '../../constants/colors';
import i18n from '../../i18n';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [langaugae, setlangaugae] = useState('');

  useEffect(() => {
    getData();
  }, []);
  getData = async () => {
    try {
      const localevalue = await AsyncStorage.getItem('@localevalue');

      if (localevalue) {
        setlangaugae(localevalue);
      }
    } catch (e) {
      return null;
    }
  };
  const onLanguage = (value) => {
    var language;
    if (value === 'th') {
      language = 'Thailand';
    } else {
      language = 'English';
    }
    Alert.alert('', 'Do you want to change the language to ' + language, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          i18n.locale = value;
          await AsyncStorage.setItem('@localevalue', value);
          setlangaugae(value);
          navigation.navigate('DrawerNavigation', { type: 'reset' });
        },
      },
    ]);
  };
  const backAction = () => {
    goBack(navigation);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        backAction={backAction}
        headerTitle={i18n.t('settings')}
        hedercolor={true}
      />
      <View style={styles.container}>
        <View>
          <Text style={{ marginLeft: 20, fontSize: 16 }}>
            {i18n.t('changelanguage')}:
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              onPress={() => onLanguage('en')}
              style={{
                height: 50,
                paddingHorizontal: 10,
                backgroundColor:
                  langaugae === 'en' ? COLORS.appSecondaryColor : 'white',
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                borderWidth: 1,
                borderColor: COLORS.appSecondaryColor,
              }}
            >
              <Text
                style={{
                  color:
                    langaugae === 'en' ? 'white' : COLORS.appSecondaryColor,
                }}
              >
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onLanguage('th')}
              style={{
                height: 50,
                paddingHorizontal: 10,
                backgroundColor:
                  langaugae === 'th' ? COLORS.appSecondaryColor : 'white',
                width: 100,
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.appSecondaryColor,
              }}
            >
              <Text
                style={{
                  color:
                    langaugae === 'th' ? 'white' : COLORS.appSecondaryColor,
                }}
              >
                ไทย
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.appSecondaryColor,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    color: COLORS.whiteColor,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold',
  },
});

export default Settings;
