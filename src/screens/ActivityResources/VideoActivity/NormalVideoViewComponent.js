import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
//import DeviceConstants from 'react-native-device-constants';
//import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import * as ScreenOrientation from 'expo-screen-orientation';
//import Orientation from 'react-native-orientation-locker';
//import { imageUrl } from '../../constants';
import styles from './styles';
// import AWS from 'aws-sdk/dist/aws-sdk-react-native';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
// var timesarray = [];

// var initial = 0;

// const windowHeigh = Dimensions.get('window').height;
const NormalVideoViewComponent = (props) => {
  const playerRef = useRef(null);
  const { questionsArray } = props;
  // let [spinner, setSpinner] = useState(true);
  const [normaldata, setNormlaData] = useState(props.data);
  const [vimeourl, setvimeourl] = useState(props.vimeourl);
  // let [visisted, setVisited] = useState(false);
  const [pausedtime, setPausedTime] = useState(null);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);
  const [data, setData] = useState(null);

  const [show, setShow] = useState(null);
  const [questiondisplay, setQuestionDisplay] = useState(null);
  const [fullscreen, setFullScreen] = useState(false);
  const [isPlaying, setisplaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [questionsarray, setquestionsarray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newarr, setnewarr] = useState([]);

  useEffect(() => {
    //  Orientation.addOrientationListener(handleOrientation);
    if (questionsArray?.length > 0) {
      var orders = questionsArray;
      setquestionsarray(orders);
      setQuestionDisplay(orders[0]);
   //   setPausedTime(parseInt(orders[0].timeInSec));
      setNormlaData(props.data);
      setLoading(false);
      var newarr = [];
      orders?.map((res, i) => {
        var time = parseInt(res?.timeInSec);
        newarr.push(time);
        setnewarr(newarr);
      });
    } else {
      setLoading(false);
    }
  }, [questionsArray]);

  props.forwardRef((name, value) => {
    if (name === 'rewatch') {
      onRewatch(value);
    } else if (name === 'questionsubmit') {
      onquestionSubmit(value);
    } else if (name === 'fullscreen') {
      handlescreenfull(value);
    } else if (name === 'gettime') {
      getcurrentTime();
    } else if (name === 'previous') {
      onPrevious();
    } else if (name === 'next') {
      onNext();
    }
  });

  onquestionSubmit = (time) => {
    setisplaying(false);
    setShow(false);
    if (questionsarray[index + 1]) {
      setPausedTime(parseInt(questionsarray[index + 1]?.timeInSec));
      setQuestionDisplay(questionsarray[index + 1]);
      setShow(false);
      setIndex(index + 1);
      setTimeout(() => {
        setisplaying(false);
      }, 500);
    } else {
      setPausedTime(null);
      setQuestionDisplay(null);
      setShow(false);
      setTimeout(() => {
        setisplaying(false);
      }, 500);
    }
  };

  onLoad = (data) => {
    //this.setInteractiveAxis(data);
    setDuration(parseInt(data.duration));
    if (normaldata.videoPausedAt) {
      //setCurrentTime(parseInt(75));
      //playerRef.current.seek(parseInt(normaldata.videoPausedAt));
    } else {
      setCurrentTime(0);
    }
  };
  const getcurrentTime = async () => {
    if (playerRef) {
      // if (DeviceConstants.isTablet) {
      //   Orientation.lockToLandscape();
      // } else {
      //   Orientation.lockToPortrait();
      // }
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
       props.onBackNew(currentTime, duration);
    }
  };
  onNext = async () => {
    if (playerRef) {
      // if (DeviceConstants.isTablet) {
      //   Orientation.lockToLandscape();
      // } else {
      //   Orientation.lockToPortrait();
      // }
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      props.onActivityNext(currentTime, duration);
    }
  };
  onPrevious = async () => {
    if (playerRef) {
      // if (DeviceConstants.isTablet) {
      //   Orientation.lockToLandscape();
      // } else {
      //   Orientation.lockToPortrait();
      // }
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      props.onActivityPrevious(currentTime, duration);
    }
  };
  onProgress = (data) => {
    //this.checkForPoints(parseInt(data.currentTime))
    setCurrentTime(parseInt(data.currentTime));
    const elapsed_sec = parseInt(data.currentTime);
    let result = newarr.filter((o1) => parseInt(o1) === elapsed_sec);

    if (elapsed_sec ===  result[0]) {
      if (parseInt(elapsed_sec) === pausedtime) {
        console.log("hii")
      } else {
        var newdata = questionsarray.filter(
          (o1) => parseInt(o1.timeInSec) === result[0]
        );
        //parseInt(this.state.questionsarray[0].question.timeinsec) ===
        setisplaying(true);
        setData(newdata[0]);
        setShow(true);
        setPausedTime(result[0]);
        props.onPause(newdata[0]);
        //this.setState({ isPlaying: true,data:this.state.questiondisplay,show: true},()=>this.props.onPause(this.state.data));
      }
    }
  };
  onRewatch = (data) => {
    if (playerRef) {
      var value = newarr.indexOf(pausedtime);
      var newwatch = newarr[value - 1];
      var newvalue = newarr.indexOf(newwatch);
      if (newvalue === -1) {
        playerRef.current.seek(0);
        setCurrentTime(0);
        setShow(false);
        setisplaying(false);
      } else {
        playerRef.current.seek(newarr[newvalue] + 1);
        setCurrentTime(newarr[newvalue] + 1);
        setShow(false);
        setisplaying(false);
      }
    }
  };

  const onfullscreen = () => {
    props.onfullscreen();

    //   Orientation.lockToLandscapeLeft();
  };
  handlescreenfull = (val) => {
    setFullScreen(val);
    val
      ? ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        )
      : ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // val
    //   ? Orientation.lockToLandscape()
    //   : DeviceConstants.isTablet
    //   ? Orientation.lockToLandscape()
    //   : Orientation.lockToPortrait();
  };
  handleMainButtonTouch = () => {
    setisplaying(!isPlaying);
  };
  toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };
  // useEffect(()=>{

  // },[timesarray])
  const timesarray = [];
  const arraydata = [];
  for (var i = 0; i < duration; i++) {
    arraydata.push({ value: i });
  }
  const YOUR_API_KEY = 'paste yout api key here';

  var count = 0;
  {
    arraydata.map((res, i) =>
      newarr.map((newrews, j) => {
        if (res.value === parseInt(newrews)) {
          timesarray.push(
            //<Text style={{color: "white",fontSize:13}} >?</Text>
            <Image
              style={{ width: 10, height: 10 }}
              source={require('../../../../assets/images/videos/point.png')}
              //resizeMode={FastImage.resizeMode.contain}
            />
            // <Image source={require('../../assets/images/videos/point.png')}
            //    style={{width:10,height:10}} />
          );
        } else {
          timesarray.push(
            <Text style={{ color: 'transparent', fontSize: 13 }}>?</Text>
          );
        }
      })
    );
  }

  // var isTablet = DeviceConstants.isTablet;
  var fullimg = 20,
    playicon = 15,
    subfont = 12,
    progrsheight = 30;
  // if (isTablet) {
  //   (fullimg = 30), (playicon = 25), (subfont = 18), (progrsheight = 40);
  // }
  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.mainView}>
      <View
        style={{
          width: '100%',
          height: fullscreen ? '100%' : '100%',
          backgroundColor: 'black',
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Video
              source={{
                uri:
                  props.activityType === 'conceptual_video'
                    ? props.vimeourl
                    : normaldata.url,
                headers: {
                  Referer: 'https://login.iqcandy.com/',
                },
              }} // Can be a URL or a local file.
              ref={playerRef}
              paused={isPlaying}
              //controls={true}
              // fullscreen={true}                          // Store referenc              // Callback when video cannot be loaded
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                elevation: 20,
              }}
              onLoad={onLoad}
              onError={(err) => console.log('errorrr', err)}
              resizeMode={fullscreen ? 'cover' : 'contain'}
              onProgress={onProgress}
            />
             <TouchableOpacity
              onPress={onfullscreen}
              style={{
                top: fullscreen ? 50 : 50,
                elevation: 20,
                position: 'absolute',
                padding: 10,
                backgroundColor: 'transparent',
                right: 10,
              }}
            >
              {fullscreen ? (
                <Image
                  source={require('../../../../assets/images/videos/halfscreen.png')}
                  style={{
                    width: fullimg,
                    height: fullimg,
                    tintColor: 'white',
                  }}
                />
              ) : (
                <Image
                  source={require('../../../../assets/images/videos/fullscreen.png')}
                  style={{
                    width: fullimg,
                    height: fullimg,
                    tintColor: 'white',
                  }}
                />
              )}
            </TouchableOpacity> 
            <View
              style={[
                styles.absview,
                { bottom: fullscreen ? 40 : 40, height: 40, borderRadius: 10 },
              ]}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <View style={{ flex: 0.65 }}>
                  <View style={[styles.subright, { marginLeft: 22 }]}>
                    {timesarray}
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>
            <View
              style={[
                styles.absview,
                {
                  bottom: fullscreen ? 30 : 30,
                  height: progrsheight,
                  borderRadius: 20,
                  backgroundColor: 'rgba(211,211,211,0.3)',
                },
              ]}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  {duration > 0 ? (
                    <TouchableOpacity onPress={handleMainButtonTouch}>
                      {!isPlaying ? (
                        <Image
                          source={require('../../../../assets/images/pause.png')}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: 'white',
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../../../assets/images/play.png')}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: 'white',
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  ) : null}
                  <Text style={{ color: 'white', fontSize: subfont }}>
                    {toHHMMSS(currentTime)}
                  </Text>
                </View>
                <View style={{ flex: 0.65 }}>
                  <View style={styles.subright}>
                    {duration > 0 ? (
                      <Slider
                        style={{ width: '100%', height: fullimg }}
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor='#FFFFFF'
                        maximumTrackTintColor='#000000'
                        thumbImage={
                          Platform.OS === 'ios'
                            ? require('../../../../assets/images/thumb1.png')
                            : require('../../../../assets/images/thumb.png')
                        }
                        value={currentTime} // Which is updated by videoRef.onProgress listener
                        onSlidingStart={(value) => {
                          console.log('slidingstarte', value, currentTime);
                        }}
                        onValueChange={(value) => {
                         // playerRef.current.seek(parseInt(currentTime));

                          // if (parseInt(value) > parseInt(currentTime)) {
                          //   if (props.resourcedata.percentage !== 0) {
                          //     console.log('playerRef', playerRef);
                          //     setCurrentTime(parseInt(value));
                          //     if (pausedtime > parseInt(value)) {
                          //       setPausedTime(null);
                          //     }

                          //     playerRef.current.seek(parseInt(value));
                          //   } else {
                          //     // console.log("sadfkajshdfkuahfkudhfkad")
                          //     playerRef.current.seek(parseInt(currentTime));
                          //   }
                          //   console.log('prigressvl', value, '', currentTime);
                          // } else {
                          //   console.log('playerRef', playerRef);
                          //   setCurrentTime(parseInt(value));
                          //   if (pausedtime > parseInt(value)) {
                          //     setPausedTime(null);
                          //   }

                          //   playerRef.current.seek(parseInt(value));
                          // }
                        }}
                      />
                    ) : null}
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: subfont }}>
                    {toHHMMSS(duration)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default NormalVideoViewComponent;
