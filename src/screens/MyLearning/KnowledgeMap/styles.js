import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  container: {
    flex: 0.95,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.whiteColor,
    borderRadius: 4,
    marginVertical: 10,
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  cardContainer: {
    width: '47%',
    height: 71,
    borderRadius: 4.78,
    backgroundColor: '#F2F2F2',
    marginVertical: 5,
    marginLeft: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cardTitle: {
    flex: 0.7,
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'mulish-medium',
    fontSize: 12,
  },
  cardPercentage: {
    flex: 0.3,
    textAlign: 'right',
    fontFamily: 'mulish-bold',
    fontSize: 14,
    position: 'absolute',
    right: 10, // Adjust the right position as needed
    bottom: 10, // Adjust the bottom position as needed
  },
  bulletListContainer: {
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default styles;
