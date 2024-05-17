import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  // ... Other styles ...
  inputContainer: {
    marginTop: 15,
    // marginBottom: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    marginHorizontal: 20,
    fontFamily: 'mulish-medium',
    color: COLORS.tabBarLabelInactiveColor,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tabBarLabelInactiveColor,
    borderRadius: 8,
    paddingRight: 8, // Adjust as needed
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    height: 42,
    paddingLeft: 8,
    color:"grey"
  },
  icon: {
    paddingLeft: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  errorMessage: {
    color: COLORS.appPrimaryColor,
    marginTop: 5,
    marginHorizontal: 20,
    fontFamily: 'mulish-regular',
  },
});

export default styles;
