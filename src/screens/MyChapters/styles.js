import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  card: {
    height: 'auto', // Adjust the height as needed
    backgroundColor: COLORS.whiteColor,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 6,
    padding: 4,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '35%', // Adjust the width as needed
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  subtitle: {
    color: COLORS.black,
    fontWeight: '400',
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'mulish-regular',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    // marginLeft: 6,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    marginRight: 3,
  },
  chaptersWithIcon: {
    // Your style for chapters with icon
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'mulish-regular',
    textAlign: 'left',
    color: COLORS.lightGray,
  },
  timeWithIcon: {
    // Your style for time with icon
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'mulish-regular',
    textAlign: 'left',
    color: COLORS.lightGray,
  },
  modalview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalinnerview: {
    padding: 10,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 15,
  },
  modalheadtext: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  modalsubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttoninnerview: {
    backgroundColor: COLORS.appSecondaryColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default styles;
