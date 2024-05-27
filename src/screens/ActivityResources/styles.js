import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

import { COLORS } from '../../constants/colors';
import { SHADOW_STYLES } from '../../constants/helpers';

const styles = StyleSheet.create({
  rowContainer: {
    // flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: width * 0.8,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.appSecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontFamily: 'mulish-bold',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 7,
    borderWidth: 1,
    marginLeft: 0,
    borderColor: COLORS.appSecondaryColor, // Set your desired border color
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ rotate: '180deg' }], // Rotate the icon
  },
  tabItem: {
    height: 42,
    width: width / 2.6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 10,
    ...SHADOW_STYLES,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'mulish-bold',
    textAlign: 'left',
  },
});

export default styles;
