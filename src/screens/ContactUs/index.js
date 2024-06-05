import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/colors';
import { capitalizeFirstLetter } from '../../constants/helpers';
import i18n from '../../i18n';

const getIconByType = (type) => {
  switch (type) {
    // case 'phone':
    //   return <Icon name='phone' size={24} color={COLORS.whiteColor} />;
    case 'email':
      return <Icon name='envelope' size={24} color={COLORS.whiteColor} />;
    case 'website':
      return <Icon name='globe' size={24} color={COLORS.whiteColor} />;
    default:
      return null;
  }
};

const GenericContactCard = ({ contactInfo, contactType }) => {
  const handlePress = () => {
    switch (contactType) {
      // case 'phone':
      //   Linking.openURL(`tel:${contactInfo}`);
      //   break;
      case 'email':
        Linking.openURL(`mailto:${contactInfo}`);
        break;
      case 'website':
        Linking.openURL(contactInfo);
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.iconContainer}>{getIconByType(contactType)}</View>
      <View>
        <Text style={styles.cardText}>
          {capitalizeFirstLetter(contactType)}
        </Text>
        <Text style={styles.cardText}>{contactInfo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ContactUs = () => (
  <View style={styles.container}>
    {/* <GenericContactCard contactInfo='+66-035950595' contactType='phone' /> */}
    <GenericContactCard
      contactInfo='admin@iqcandy.com'
      contactType={i18n.t('email')}
    />
    <GenericContactCard
      contactInfo='https://www.iqcandy.com/'
      contactType={i18n.t('website')}
    />
  </View>
);

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

export default ContactUs;
