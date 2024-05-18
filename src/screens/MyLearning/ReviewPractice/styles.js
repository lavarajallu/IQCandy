import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appSecondaryColor,
  },
  mainview: {
    flex: 0.85,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.whiteColor,
    borderRadius: 4,
    marginVertical: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemview: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  itemtext: {
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 14,
  },
  itembottomview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 30,
    alignItems: 'center',
  },
  itemsubview: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  progresssubview: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  emptyview: {
    width: 60,
    height: 1,
    backgroundColor: 'black',
  },
  analysistext: {
    textAlign: 'left',
    fontSize: 12,
  },
});
export default styles;
