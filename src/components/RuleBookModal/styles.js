import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalsubview: {
    width: width / 1.05,
    height: height / 1.5,
    backgroundColor: COLORS.whiteColor,
    marginVertical: 15,
  },
  modaltopview: {
    paddingVertical: 20,
    backgroundColor: COLORS.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.appSecondaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  modalheadtext: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.appSecondaryColor,
    fontFamily: 'mulish-bold',
  },
  modalcancelimage: {
    width: 24,
    height: 24,
    tintColor: COLORS.appSecondaryColor,
  },
  modallistview: {
    padding: 10,
    margin: 4,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: COLORS.appSecondaryColor,
    marginHorizontal: 5,
  },
  modalsublistview: {
    flex: 1,
    flexDirection: 'row',
  },
  modallistleftview: {
    flex: 0.7,
    justifyContent: 'center',
  },
  modallistlefttext: {
    color: COLORS.appSecondaryColor,
    fontSize: 12,
    fontFamily: 'mulish-regular',
  },
  modallistrightview: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modallistbutton: {
    backgroundColor: COLORS.appSecondaryColor,
    width: width / 6.5,
    padding: 6,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalpointstext: {
    color: COLORS.whiteColor,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'mulish-bold',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
