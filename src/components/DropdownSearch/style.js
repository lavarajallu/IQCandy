import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'rgb(255, 255, 255)',
  },
  dropdown: {
    height: 45,
    width: 330,
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 15,
    padding: 10,
    marginLeft: 9,
  },
  icon: {
    marginRight: 5,
    //color: COLORS.tabBarLabelInactiveColor,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: 'mulish-bold',
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: 'mulish-regular',
    color: COLORS.tabBarLabelInactiveColor,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: 'mulish-medium',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },
  errorMessage: {
    color: COLORS.appPrimaryColor,
    marginTop: 5,
    marginHorizontal: 15,
    fontFamily: 'mulish-regular',
  },
});

export default styles;
