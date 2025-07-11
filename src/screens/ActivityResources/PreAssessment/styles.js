import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
import { COLORS } from "../../../constants/colors";

const styles = StyleSheet.create({
  mainScrollview: {
    paddingBottom: 30,
    paddingTop: 20,
  },
  scrollinside: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "mulish-bold",
    color: COLORS.whiteColor,
  },
  container: {
    flex: 0.85,
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
  mainVew: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topViewheader: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "mulish-medium",
    color: COLORS.black,
  },
  timerView: {
    flexDirection: "row",
    backgroundColor: COLORS.coursesColor,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "mulish-bold",
    color: COLORS.whiteColor,
  },
  questionidtext: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 5,
  },
  mathjaxtext: {
    // backgroundColor: 'red',
    width: "90%",
    marginTop: Platform.OS === "android" ? 5 : 0,
    // borderWidth: 2,
    // borderRadius:10,
    // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
    marginLeft: 10,
    justifyContent: "flex-start",
    // alignSelf: 'flex-start',
  },
  bottomView: {
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "space-between",
    //marginLeft: 10,
    // marginRight: 10,
    alignItems: "center",
  },
  bottomsubview: {
    flex: 1,
    flexDirection: "row",
  },
  previousview: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  previousbutton: {
    backgroundColor: COLORS.appSecondaryColor,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  nextbuttonView: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  sorryview: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  sorrytext: {
    fontSize: 14,
    textAlign: "center",
  },
  buttonViewsorry: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  innerbuttonview: {
    padding: 5,
  },
});

export default styles;
