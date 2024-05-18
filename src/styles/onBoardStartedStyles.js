import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageBackground: { height: height, width: width },
  safeViewContainer: { flex: 1 },
  profileContainer: { flex: 0.62 },
  profileView: {
    flex: 0.07,
    justifyContent: 'flex-end',
    paddingLeft: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 40,
  },
  primaryLogoContainer: { flex: 0.57 },
  primaryLogoView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 35,
    marginTop: Platform.OS === 'ios' ? 55 : 12,
  },
  getStartedButtonContainer: {
    flex: 0.38,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Platform.OS === 'ios' ? 20 : 30,
  },
  introTitleText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'mulish-bold',
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 35,
  },
  introDescriptionText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'mulish-regular',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
});

export default styles;
