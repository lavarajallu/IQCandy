/* eslint-disable react/no-this-in-sfc */

import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View,Dimensions } from 'react-native';
//import DeviceConstants from 'react-native-device-constants';
import Slider from '@react-native-community/slider';
import getVideoId from 'get-video-id';
import * as ScreenOrientation from 'expo-screen-orientation';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
import styles from './styles';
var initial = 0;
let interval;
// import AWS from 'aws-sdk/dist/aws-sdk-react-native';

// const credentials = new AWS.Crendentials({ accessKeyId: 'AKIAZR3HR6PZJ3FGC25V', secretAccessKey: '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'})
// const s3 = new AWS.S3({ credentials, signatureVersion: 'v1', region: 'ap-south-1'});
// var timesarray = [];
const NormalVideoViewComponent = (props) => {
  const playerRef = useRef(null);
  const { questionsArray } = props;
  // let [spinner, setSpinner] = useState(true);
  let [youtubedata, setyoutubedata] = useState(props.data);
  // let [visisted, setVisited] = useState(false);
  let [pausedtime, setPausedTime] = useState(null);

  let [currentTime, setCurrentTime] = useState(0);

  let [duration, setDuration] = useState(0);
  let [data, setData] = useState(null);
  let [videoid, setvideoid] = useState('');
  let [show, setShow] = useState(null);
  let [questiondisplay, setQuestionDisplay] = useState(null);
  let [fullscreen, setFullScreen] = useState(false);
  let [isPlaying, setisplaying] = useState(true);
  let [index, setIndex] = useState(0);
  let [questionsarray, setquestionsarray] = useState([]);
  let [loading, setLoading] = useState(true);
  let [newarr, setnewarr] = useState([]);

  useEffect(() => {
  ///  Orientation.addOrientationListener(handleOrientation);
    // console.log("PRopssss.......",questionsArray)
    if (props.data) {
      var videoid = getVideoId(props.data.url);
    }
    if (questionsArray.length > 0) {
      //   console.log("hhhhhhh")
      let orders = questionsArray;
      orders.sort(function (a, b) {
        let dateA = parseInt(a.timeInSec);
        let dateB = parseInt(b.timeInSec);
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

      // console.log("ordersordersorders",orders)
      setquestionsarray(orders);
      setQuestionDisplay(orders[0]);
      // setPausedTime(parseInt(orders[0].question.timeinsec))
      // setNormlaData(props.data);

      var newarr = [];
      orders.map((res, i) => {
        var time = parseInt(res.timeInSec);
        newarr.push(time);
        console.log('timesarrayyyyy', newarr);
        setnewarr(newarr);
      });
    } else {
      setLoading(false);
    }
    if (videoid) {
      console.log('ssdsd', videoid);
      setvideoid(videoid.id);
      setLoading(false);
    }
  }, [questionsArray]);
  props.forwardRef((name, value) => {
    console.log('dkfjkldnfkldf', name, value);
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
    setIndex(index + 1);
    setisplaying(true);
    interval = setInterval(async () => {
      var count = null;
      var compare = false;
      var elapsed_sec;
      if (this._youTubeRef) {
        elapsed_sec = await this._youTubeRef?.getCurrentTime();
      }
      setCurrentTime(elapsed_sec);

      let result = newarr.filter(
        (o1) => parseInt(o1) === parseInt(elapsed_sec)
      );
      console.log('oiffff', Math.floor(elapsed_sec), result, pausedtime);
      if (parseInt(elapsed_sec) === result[0]) {
        if (parseInt(elapsed_sec) === pausedtime) {
        } else {
          //  ismodal = true
          var newdata = questionsArray.filter(
            (o1) => parseInt(o1.timeInSec) === result[0]
          );
          setisplaying(false);
          setData(newdata[0]);
          setShow(true);
          setPausedTime(result[0]);
          props.onPause(newdata[0]);

          //    this.setState({ isPlaying: false,data:newdata[0],show: true,pausedtime: result[0]},()=>this.props.onPause(this.state.data));
          clearInterval(interval);
          //    this.setState({
          //     time: elapsed_sec,
          //     elapsed: elapsed_sec,

          //   })
        }
      }
    }, 1000);
  };
  handleReady = (data) => {
    this._youTubeRef?.getDuration().then((getDuration) => {
      console.log('youtubedatayoutubedata', youtubedata);
      setDuration(parseInt(getDuration));
    });
    if (youtubedata.videoPausedAt > 1) {
      this._youTubeRef?.seekTo(youtubedata.videoPausedAt, true);
      setCurrentTime(youtubedata.videoPausedAt);
      initial = 0;
    }
    if (Platform.OS === 'ios') {
      this._youTubeRef?.reloadIframe();
    }
  };
  onStateChange = (e) => {
    if (this._youTubeRef) {
      //  console.log("eee",e.state,"playing")

      if (initial === 0) {
        console.log('intuallalaaa', e.state, 'playing');
        if (e.state === 'playing') {
          this.onReady();
        }
      }
    }
  };
  onReady = () => {
    console.log('kdnddddk', newarr);
    if (this._youTubeRef) {
      initial = 1;
      interval = setInterval(async () => {
        const elapsed_sec = await this._youTubeRef?.getCurrentTime();
        setCurrentTime(elapsed_sec);
        //console.log("0show",elapsed_sec)
        let result = newarr.filter(
          (o1) => parseInt(o1) === parseInt(elapsed_sec)
        );
        console.log('0show', elapsed_sec, result);
        if (parseInt(elapsed_sec) === result[0]) {
          //this.setState({show: true})
          //console.log("0show",parseInt(elapsed_sec), this.state.pausedtime)
          if (show === true) {
            //console.log("ifff")
          } else {
            // console.log("questionsarray",parseInt(questionsArray[0].timeInSec),result[0])

            var newdata = questionsArray.filter(
              (o1) => parseInt(o1.timeInSec) === result[0]
            );
            console.log('newtomeee', JSON.stringify(newdata));
            setisplaying(false);
            setData(newdata[0]);
            setPausedTime(result[0]);
            props.onPause(newdata[0]);
            clearInterval(interval);

            //  this.setState({
            //   time: elapsed_sec,
            //   elapsed: elapsed_sec,

            // })
          }
        }
      }, 1000);
    }
  };
  getcurrentTime = async () => {
    setisplaying(false);
    if (this._youTubeRef) {
      // if (DeviceConstants.isTablet) {
      //   Orientation.lockToLandscape();
      // } else {
      //   Orientation.lockToPortrait();
      // }
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      initial = 0;
      let elapsed_sec = await this._youTubeRef?.getCurrentTime();
      let duration = await this._youTubeRef?.getDuration();
      console.log('kdnckdnckdc', elapsed_sec, duration);
      clearInterval(interval);
      props.onBackNew(elapsed_sec, duration);
    }
  };
  onNext = async () => {
    initial = 0;
    setisplaying(false);

    if (this._youTubeRef) {
      // if (DeviceConstants.isTablet) {
      //   Orientation.lockToLandscape();
      // } else {
      //   Orientation.lockToPortrait();
      // }
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      let elapsed_sec = await this._youTubeRef?.getCurrentTime();
      let duration = await this._youTubeRef?.getDuration();
      clearInterval(interval);
      props.onActivityNext(elapsed_sec, duration);
    }
  };
  onPrevious = async () => {
    initial = 0;
    setisplaying(false);
    if (this._youTubeRef) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      let elapsed_sec = await this._youTubeRef?.getCurrentTime();
      let duration = await this._youTubeRef?.getDuration();
      clearInterval(interval);
      props.onActivityPrevious(elapsed_sec, duration);
    }
  };
  onRewatch = (data) => {
    console.log('DAtaaaa', newarr);
    if (this._youTubeRef) {
      console.log('onerrewarch', pausedtime);
      var value = newarr.indexOf(pausedtime);
      var newwatch = newarr[value - 1];
      console.log('onqustionnnjdndjsdjsndjsnd', newwatch);
      var newvalue = newarr.indexOf(newwatch);
      console.log('d,cdnd', newvalue);
      if (newvalue === -1) {
        this._youTubeRef?.seekTo(0, true);
        setCurrentTime(0);
        setShow(false);
        setisplaying(true);
        this.onReady();
      } else {
        this._youTubeRef?.seekTo(newarr[newvalue] + 1, true);
        setCurrentTime(newarr[newvalue] + 1);
        setShow(false);
        setisplaying(true);
        this.onReady();
      }
    }
  };

  handleOrientation = (orientation) => {
    console.log('orintatin', orientation);
    // orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
    //   ? (this.setState({fullscreen: true}), StatusBar.setHidden(true))
    //   : (this.setState({ fullscreen: false}),
    //   StatusBar.setHidden(false);
  };

  onfullscreen = () => {
    setFullScreen(!fullscreen);
    console.log('FUllll', fullscreen);
    props.onfullscreen();

    //   Orientation.lockToLandscapeLeft();
  };
  handlescreenfull = (val) => {
    console.log('fulll', val);
    setFullScreen(val);
    val
    ? ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      )
    : ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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
              source={require('../../../../../assets/images/videos/point.png')}
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

  //var isTablet = DeviceConstants.isTablet;
  var fullimg = 20,
    playicon = 15,
    subfont = 12,
    progrsheight = 30;
  // if (isTablet) {
  //   (fullimg = 30), (playicon = 25), (subfont = 18), (progrsheight = 40);
  // }
  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
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
          <View style={{ flex: 1, justifyContent: 'center', }}>
            {Platform.OS === 'ios' ? 
            <YouTube
              ref={(component) => {
                this._youTubeRef = component;
              }}
              apiKey={'AIzaSyB1DjYP6DVdeu2l8i33gZ6PdMfA9piDHsY'}
              controls={0}
              videoId={videoid}
              play={isPlaying} // control playback of video with true/false
              onReady={handleReady}
              onChangeState={onStateChange}
              style={{ height: fullscreen ? '100%' : '50%' }}
              onError={(error)=>{console.log("Errororororrrrrr",error)}}
            /> : 
            
            <YoutubePlayer  ref={(component) => {
              this._youTubeRef = component;
            }}
            apiKey={'AIzaSyB1DjYP6DVdeu2l8i33gZ6PdMfA9piDHsY'}
            controls={0}
            videoId={videoid}
            play={!isPlaying} // control playback of video with true/false
            onReady={handleReady}
            onChangeState={onStateChange}
            height={ fullscreen ? windowWidth /1.5: 250 }
            onError={(error)=>{console.log("Errororororrrrrr",error)}} />}
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
                  source={require('../../../../../assets/images/videos/halfscreen.png')}
                  style={{
                    width: fullimg,
                    height: fullimg,
                    tintColor: 'white',
                  }}
                />
              ) : (
                <Image
                  source={require('../../../../../assets/images/videos/fullscreen.png')}
                  style={{
                    width: fullimg,
                    height: fullimg,
                    tintColor: 'white',
                  }}
                />
              )}
            </TouchableOpacity>
            {Platform.OS === 'ios' ? 
            <>
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
                  <View style={[styles.subright, { marginLeft: 5 }]}>
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
                  <TouchableOpacity onPress={handleMainButtonTouch}>
                    {isPlaying ? (
                      <Image
                        source={require('../../../../../assets/images/pause.png')}
                        style={{
                          width: playicon,
                          height: playicon,
                          tintColor: 'white',
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../../../../../assets/images/play.png')}
                        style={{
                          width: playicon,
                          height: playicon,
                          tintColor: 'white',
                        }}
                      />
                    )}
                  </TouchableOpacity>
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
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        thumbImage={
                          Platform.OS === 'ios'
                            ? require('../../../../../assets/images/thumb1.png')
                            : require('../../../../../assets/images/thumb.png')
                        }
                        value={currentTime} // Which is updated by videoRef.onProgress listener
                        onSlidingStart={(value) => {
                          console.log('slidingstarte', value, currentTime);
                        }}
                        onValueChange={(value) => {
                          console.log('prsl', value, '', currentTime);
                          if (parseInt(value) > parseInt(currentTime)) {
                            console.log('prigressvl', value, '', currentTime);
                            if (props.resourcedata.percentage !== 0) {
                              setCurrentTime(parseInt(value));
                              if (pausedtime > parseInt(value)) {
                                setPausedTime(null);
                              }

                              this._youTubeRef?.seekTo(parseInt(value), true);
                            } else {
                              // console.log("sadfkajshdfkuahfkudhfkad")
                              this._youTubeRef?.seekTo(
                                parseInt(currentTime),
                                true
                              );
                            }
                          } else {
                            setCurrentTime(parseInt(value));
                            if (pausedtime > parseInt(value)) {
                              setPausedTime(null);
                            }

                            this._youTubeRef?.seekTo(parseInt(value), true);
                          }
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
            </View></> : null}
          </View>
        </View>
      </View>
    </View>
  );
};
export default NormalVideoViewComponent;
