import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Make sure to import AsyncStorage or the storage library you're using

import {
  Alert,
  BackHandler,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { CalendarList } from "react-native-calendars";
import Modal from "react-native-modal";
import { selectUser } from "../store/authManagement/selector";
import { selectmyCalender } from "../store/student/myCalender/selector";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { getschedulefiltered } from "../api/myCalender";
import { COLORS } from "../constants/colors";
import { getTopicDetails, getChapterDetails } from "../api/search";
import { selectSearch } from "../store/student/search/selector";

const CalendarPage = ({ route, navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { scheduledata } = useSelector(selectmyCalender);
  const { topicDetails, chapterDetails } = useSelector(selectSearch);

  const [items, setItems] = useState({
    "2023-12-01": [{ name: "Event 1" }],
    "2023-12-02": [{ name: "Event 2A" }, { name: "Event 2B" }],
    // Add more data as needed
  });
  const [visiblemonths, setvisiblemonths] = useState([]);
  const [isspinner, setisspinner] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [evemnsdata, setevemnsdata] = useState([]);
  const [markeddata, setmarkeddata] = useState([]);
  const [neweventsdata, setneweventsdata] = useState([]);
  const [newmodal, setnewmodal] = useState(false);
  const [eventtapped, seteventtapped] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const startingmonths = [
    {
      dateString: "2024-06-03",
      day: 3,
      month: 6,
      timestamp: 1717372800000,
      year: 2024,
    },
    {
      dateString: "2024-07-03",
      day: 3,
      month: 7,
      timestamp: 1717372800000,
      year: 2024,
    },
  ];
  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    // 3-6-2024
    var monthsarraya = [];
    var obj1 = {
      dateString: currentDate,
      day: day,
      month: month,
      timestamp: 1717372800000,
      year: year,
    };
    var obj2 = {
      dateString: currentDate,
      day: day,
      month: month + 1,
      timestamp: 1717372800000,
      year: year,
    };
    monthsarraya.push(obj1);
    monthsarraya.push(obj2);

    getevents(monthsarraya);
  }, []);
  const getmonts = (months) => {
    setvisiblemonths(months);
    setisspinner(false);
    getevents(months);
  };

  const getevents = (visiblemonths) => {
    var startdate = moment(new Date(visiblemonths[0]?.dateString)); // Now
    var enddate = moment(
      new Date(visiblemonths[visiblemonths.length - 1]?.dateString)
    );
    var data = {
      userId: user?.userInfo?.userId,
      fromDate: moment(startdate)
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss"),
      toDate: moment(enddate).endOf("month").format("YYYY-MM-DD HH:mm:ss"),
    };
    getschedulefiltered({
      dispatch,
      data: data,
      userId: user?.userInfo?.userId,
    });
  };
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  useEffect(() => {
    if (scheduledata && scheduledata?.length > 0) {
      var newarray = [];
      scheduledata?.map((res, i) => {
        newarray.push(moment.utc(res.scheduleDate).format("YYYY-MM-DD"));
      });
      const uniqueAges = newarray?.filter(unique);

      var newmarkedarray = [];
      var newitemsarray = [];
      var newobj = {};
      var newmarkedobjarr = {};
      uniqueAges.map((res, i) => {
        var subobjarr = [];
        scheduledata.map((newres, i) => {
          if (res === moment.utc(newres.scheduleDate).format("YYYY-MM-DD")) {
            subobjarr.push(newres);
          }
        });
        newobj[res] = subobjarr;
      });
      uniqueAges.map((res, i) => {
        var newmarkedobj = {};
        scheduledata.map((newres, i) => {
          if (res === moment.utc(newres.scheduleDate).format("YYYY-MM-DD")) {
            newmarkedobj = {
              customStyles: {
                container: {
                  backgroundColor: COLORS.appSecondaryColor,
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            };
          }
        });
        newmarkedobjarr[res] = newmarkedobj;
      });
      setevemnsdata(newobj);
      setmarkeddata(newmarkedobjarr);
    }
  }, [scheduledata]);
  const onDayPress = (day) => {
    var result = [];
    if (Object.keys(evemnsdata).length > 0) {
      const keys = Object.keys(evemnsdata);
      keys.forEach((key, index) => {
        if (key === day.dateString) {
          result = evemnsdata[key];
        }
      });
      setneweventsdata(result);
      setnewmodal(true);
    } else {
      setneweventsdata([]);
      setnewmodal(true);
    }
  };
  const neweventTapped = (event) => {
    seteventtapped(event);
    setshowmodal(true);
  };
  const renderdataItem = ({ item }) => {
    return (
      <TouchableOpacity
        testID={"item"}
        style={{
          backgroundColor: "white",
          flex: 1,
          borderRadius: 5,
          padding: 10,
          marginRight: 10,
          justifyContent: "space-around",
          marginTop: 17,
        }}
        onPress={() => neweventTapped(item)}
      >
        <Text style={{ color: COLORS.appSecondaryColor }}>{item.title}</Text>
        <Text style={{ color: COLORS.appSecondaryColor }}>
          {moment.utc(item.start).format("LT")} -{" "}
          {moment.utc(item.end).format("LT")}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderEmptyDate = () => {
    return (
      <View
        style={{ height: 15, flex: 1, alignItems: "center", marginTop: 30 }}
      >
        <Text>No events in this date</Text>
      </View>
    );
  };
  const rowHasChanged = ({ r1, r2 }) => {
    return r1.name !== r2.name;
  };
  const modalclose = () => {
    setnewmodal(false);
  };
  const renderfootor = () => {
    return (
      <TouchableOpacity
        onPress={modalclose}
        style={{
          backgroundColor: COLORS.appSecondaryColor,
          padding: 10,
          justifyContent: "center",
          width: 200,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          CANCEL
        </Text>
      </TouchableOpacity>
    );
  };
  const newrenderitem = ({ item }) => {
    // var newdate = moment.utc(item.scheduleDate).format('LT')
    var newdate = new Date(item.scheduleDate).setTime(
      new Date(item.scheduleDate).getTime() + 1 * 60 * 60 * 1000
    );
    var enddate = moment.utc(newdate).format("LT");

    var additionalinfo = JSON.parse(item.additionalInfo);
    return (
      <View style={{ height: 90, marginBottom: 20 }}>
        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}
        >
          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.appSecondaryColor, fontSize: 12 }}>
              {moment.utc(new Date(item.scheduleDate)).format("MM/DD")}
            </Text>
            <Text style={{ color: COLORS.appSecondaryColor, fontSize: 12 }}>
              {moment.utc(new Date(item.scheduleDate)).format("ddd")}
            </Text>
          </View>
          <View
            style={{
              flex: 0.55,
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: COLORS.appSecondaryColor,
              }}
            >
              {additionalinfo.title}
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.appSecondaryColor }}>
              {moment.utc(item.scheduleDate).format("LT")}-{enddate}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => ongo(item)}
              style={{ backgroundColor: COLORS.appSecondaryColor, padding: 20 }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>GO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const gotoChaptersPage = async (item) => {
    var additionalitem = JSON.parse(item?.additionalInfo);
    const authToken = await AsyncStorage.getItem("userToken");
    setSelectedItem(item);
    var subjectId = additionalitem?.subjectId;
    var chapterId = additionalitem?.chapterId;
    var boardId = user?.userOrg?.boardId;
    var gradeId = user?.userOrg?.gradeId;

    var topicId = item.scheduleTypeId;
    var url =
      "https://api.iqcandy.com/api/iqcandy" +
      `/boards/${boardId}/grades/${gradeId}/subjects/${subjectId}/chapters/${chapterId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwt: authToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          if (json.data) {
            var chapterDetails = json.data;
            var url =
              "https://api.iqcandy.com/api/iqcandy" +
              `/boards/${boardId}/grades/${gradeId}/subjects/${subjectId}/chapters/${chapterId}/topics/${topicId}`;
            fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                jwt: authToken,
              },
            })
              .then((response) => response.json())
              .then((json) => {
                if (json) {
                  if (json.data) {
                    additionalitem["topicId"] = item.scheduleTypeId;
                    additionalitem["image"] = json.data.image;
                    navigation.navigate("ActivityResources", {
                      topicItem: { ...additionalitem },
                      chapterItem: chapterDetails,

                      from: "calender",
                    });
                  }
                }
              })
              .catch((error) => console.error(error));
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const ongo = (item) => {
    seteventtapped((eventtapped) => {
      setnewmodal((newmodal) => {
        gotoChaptersPage(item);

        return false;
      });
      gotoChaptersPage(item);

      return item;
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isspinner ? (
          <Text>Loading</Text>
        ) : (
          <CalendarList
            onVisibleMonthsChange={(months) => {
              getmonts(months);
            }}
            pastScrollRange={50}
            futureScrollRange={100}
            scrollEnabled
            showScrollIndicator
            current={new Date()}
            onDayPress={onDayPress}
            renderItem={renderdataItem}
            renderEmptyData={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob
            markingType={"custom"}
            markedDates={markeddata}
          />
        )}
      </View>
      <TouchableWithoutFeedback onPress={() => setshowmodal(false)}>
        <Modal isVisible={showmodal} hasBackdrop={false}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
            }}
          >
            <View
              style={{
                width: windowWidth / 1.2,
                backgroundColor: "white",
                marginVertical: 15,
              }}
            >
              <View style={{ backgroundColor: "white" }}>
                <TouchableOpacity onPress={() => setshowmodal(false)}>
                  <Image
                    source={require("../../assets/images/cancel.png")}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.appSecondaryColor,
                      alignSelf: "flex-end",
                      marginVertical: 10,
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
                {eventtapped !== null ? (
                  <View style={{ padding: 20 }}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {eventtapped.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingVertical: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>
                        Event Start:{" "}
                        {moment.utc(eventtapped.start).format("llll")}{" "}
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 10 }}>
                        Event End: {moment.utc(eventtapped.end).format("llll")}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => ongo(eventtapped)}
                      style={{
                        height: 50,
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: COLORS.appSecondaryColor,
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        sdsad
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>NoData</Text>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
      <Modal
        testID={"modal"}
        isVisible={newmodal}
        // onSwipeComplete={this.closenewmodal.bind(this)}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              height: windowHeight / 1.4,
              backgroundColor: "lightgrey",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginVertical: 20,
                fontWeight: "bold",
                color: COLORS.appSecondaryColor,
                textAlign: "center",
              }}
            >
              Scheduled Topics
            </Text>

            {neweventsdata.length > 0 ? (
              <>
                <FlatList
                  style={{ marginBottom: 30 }}
                  keyExtractor={(item) => item.additionalInfo.scheduleId}
                  ListFooterComponent={renderfootor}
                  data={neweventsdata}
                  renderItem={newrenderitem}
                />
              </>
            ) : (
              <>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: COLORS.appSecondaryColor,
                      fontSize: 18,
                    }}
                  >
                    No Events
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={modalclose}
                  style={{
                    backgroundColor: COLORS.appSecondaryColor,
                    padding: 10,
                    justifyContent: "center",
                    width: 200,
                    alignSelf: "center",
                    marginTop: 30,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarPage;
