import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.25,
  },
  imageBackground: {
    flex: 1,
  },
  curvedLineContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  curvedLine: {
    flex: 1,
    marginTop: height * 0.16,
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.35,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 0.45,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.appSecondaryColor,
  },
  buttonText: {
    color: COLORS.whiteColor,
    fontSize: 20,
    fontFamily: 'mulish-bold',
    fontWeight: '700',
  },
  createAccountText: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: 'mulish-regular',
    fontWeight: '200',
    marginTop: 10,
  },
  createAccountLink: {
    color: COLORS.appSecondaryColor,
    fontFamily: 'mulish-bold',
    fontWeight: '700',
  },
  forgotPasswordText: {
    textAlign: 'right',
    // padding: width * 0.05,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'mulish-bold',
    color: COLORS.coursesColor,
    textDecorationLine: 'underline',
  },
  remembertext: {
    color: COLORS.appSecondaryColor,
    fontSize: 13,
    marginLeft: 5,
  },
  checkbox: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    tintColor: 'lightgrey',
  },
  checkboxview: {
    flexDirection: 'row',
  },
  middleView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleLeftView: {
    flex: 0.5,
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginLeft: 16,
  },
});

export default styles;
