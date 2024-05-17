import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: COLORS.appSecondaryColor,
  },
  mainview: {
    flex: 1,
    marginTop: 20,
  },
  loadingview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    flex: 1,
    paddingTop: 20,
  },
  firstRowView: {
    flexDirection: 'row',
  },
  firstRowMainView: {
    flex: 1,
    flexDirection: 'row',
  },
  leftfirstTextView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  leftfirsttext: {
    marginRight: 10,
  },
  rightfirsttext: {
    marginLeft: 10,
  },
  imageView: {
    backgroundColor: COLORS.appSecondaryColor,

    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyles: {
    height: 10,
    width: 10,
    alignSelf: 'center',
  },
  dividerline: {
    width: 2,
    height: 60,
    backgroundColor: COLORS.appSecondaryColor,
    alignSelf: 'center',
    marginLeft: 5,
  },
  subjectview: {
    flex: 0.42,
    justifyContent: 'center',
  },
  startbutton: {
    bottom: 10,
    alignSelf: 'center',
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.whiteColor,
    borderRadius: 4,
    marginVertical: 10,
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default styles;
