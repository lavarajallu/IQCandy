import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"green"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    paddingLeft: width * 0.15,
    width: width * 0.4,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'mulish-bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.whiteColor,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
    marginHorizontal: 10,
    fontFamily: 'mulish-regular',
    color: COLORS.whiteColor,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.58,
    width: width * 0.95,
    opacity: Platform.OS === 'ios' ? 0.85 : 0.7,
    borderRadius: 16,
  },
  nextArrowView: {
    position: 'relative',
    marginTop: -width * 0.145,
  },
  mainView: {
    height: height,
  },
});

export default styles;
