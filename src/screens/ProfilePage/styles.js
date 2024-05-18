import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appSecondaryColor,
  },
  topview: {
    flex: 0.2,
  },
  topinsideview: {
    flex: 1,
    flexDirection: 'row',
  },
  imageview: {
    flex: 0.32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 40,
  },
  headingview: {
    flex: 0.68,
    justifyContent: 'center',
  },
  headingtext: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  headingsubtext: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: '600',
    color: 'white',
  },
  bottomview: {
    flex: 0.8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
  },
});
export default styles;
