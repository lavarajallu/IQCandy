import { StyleSheet, Dimensions, Platform } from 'react-native';
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
    flex: Platform.OS === 'ios' ? 0.22 : 0.25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.55,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 0.25,
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
    fontFamily: 'mulish-bold',
    fontWeight: '700',
    marginTop: 10,
  },
  createAccountLink: {
    color: COLORS.appSecondaryColor,
  },
  inputRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scrollContent: {
    flex: 0.55,
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  dropdownView: {
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
});

export default styles;
