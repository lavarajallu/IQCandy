import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: COLORS.appSecondaryColor,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: COLORS.appSecondaryColor,
  },
  topview: {
    flex: 0.2,
    justifyContent: 'center',
  },
  topinsideview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageview: {
    width: 85,
    height: 85,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 85 / 2,
  },

  bottomview: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
  },
});
export default styles;
