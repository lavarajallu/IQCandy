
import { View,StyleSheet ,Dimensions,Platform} from 'react-native';
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
    flex: 0.9,
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
  tabItem: {
    flex:0.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'mulish-bold',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  mainScrollview: {
    paddingBottom: 30,
    paddingTop: 20,
  },
  scrollinside: {
    flexDirection: 'row',
  },
  questionidtext: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 5,
  },
  mathjaxtext: {
    // backgroundColor: 'red',
    width: '90%',
    marginTop: Platform.OS === 'android' ? 5 : 0,
    // borderWidth: 2,
    // borderRadius:10,
    // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
    marginLeft: 10,
    justifyContent: 'flex-start',
    // alignSelf: 'flex-start',
  },
  bottomView: {
   
    flexDirection: 'row',
  
  },
  bottomsubview: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor:"green",
   // justifyContent:"space-evenly",
    marginHorizontal:10,
    alignItems:"center"
  },
  previousview: {
    flex: 0.5,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  previousbutton: {
    backgroundColor: COLORS.appSecondaryColor,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
  },
  nextbuttonView: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});
export default styles;
