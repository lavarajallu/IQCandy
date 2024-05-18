import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchbar: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '90%',
    borderRadius: 20,
    color: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  searchtext: {
    height: 50,
    width: '89%',
    borderRadius: 20,
    color: 'black',
    paddingLeft: 8,
  },
  cancelimage: {
    width: 20,
    height: 20,
    tintColor: COLORS.appSecondaryColor,
    marginRight: 10,
  },
  bottomView: { flex: 0.9 },
  spinnerview: {
    flex: 1,
    alignItems: 'center',
  },
  subscribeText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  boldText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  subscibebutton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: COLORS.appSecondaryColor,
    marginTop: 50,
  },
});

export default styles;
