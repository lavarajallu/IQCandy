import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  //  WebView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
const win = Dimensions.get('window');
class ChartWeb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: `<html>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
                    <style media="screen" type="text/css">
                    #container {
                        width:100%;
                        height:100%;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        position:absolute;
                        user-select: none;
                        -webkit-user-select: none;
                    }
                    </style>
                    <head>
                        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
                        <script src="https://code.highcharts.com/5.0.12/highcharts.js"></script>
                        ${
                          this.props.stock
                            ? '<script src="https://code.highcharts.com/stock/highstock.js"></script>'
                            : '<script src="https://code.highcharts.com/highcharts.js"></script>'
                        }
                        ${
                          this.props.more
                            ? '<script src="https://code.highcharts.com/highcharts-more.js"></script>'
                            : ''
                        }
                        ${
                          this.props.guage
                            ? '<script src="https://code.highcharts.com/modules/solid-gauge.js"></script>'
                            : ''
                        }
                    </head>
                    <body>
                        <div id="container"></div>
                    </body>
                    <script>
                      $(function () {
                        Highcharts.chart('container', ${JSON.stringify(
                          this.props.config
                        )});
                        Highcharts.setOptions(${JSON.stringify(
                          this.props.options
                        )});
                      })
                    </script>
          </html>
            `,
      end: `</html>`,
      Wlayout: {
        height: win.height,
        width: win.width,
      },
    };
  }
  reRenderWebView(e) {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }

  render() {
    let config = JSON.stringify(this.props.config, function (key, value) {
      //create string of json but if it detects function it uses toString()
      return typeof value === 'function' ? value.toString() : value;
    });

    config = JSON.parse(config);

    return (
      <SafeAreaView style={this.props.style}>
        <View style={this.props.style}>
          <WebView
            androidLayerType='hardware'
            onLayout={this.reRenderWebView.bind(this)}
            // onLayout={this.reRenderWebView}
            // style={styles.full}
            source={{ html: `${this.state.init}`, baseUrl: 'web/' }}
            javaScriptEnabled
            domStorageEnabled
            scalesPageToFit
            scrollEnabled={false}
            automaticallyAdjustContentInsets
            height={500}
            {...this.props}
          />
        </View>
      </SafeAreaView>
    );
  }
}

var flattenObject = function (obj, str = '{') {
  Object.keys(obj).forEach(function (key) {
    str += `${key}: ${flattenText(obj[key])}, `;
  });
  return `${str.slice(0, str.length - 2)}}`;
};

var flattenText = function (item, key) {
  if (key === 'y') console.log(item, typeof item);
  var str = '';
  if (item && typeof item === 'object' && item.length === undefined) {
    str += flattenObject(item);
  } else if (item && typeof item === 'object' && item.length !== undefined) {
    str += '[';
    item.forEach(function (k2) {
      str += `${flattenText(k2)}, `;
    });
    if (item.length > 0) str = str.slice(0, str.length - 2);
    str += ']';
  } else if (typeof item === 'string' && item.slice(0, 8) === 'function') {
    str += `${item}`;
  } else if (typeof item === 'string') {
    str += `\"${item.replace(/"/g, '\\"')}\"`;
  } else {
    str += `${item}`;
  }
  return str;
};

var styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 0.99,
    minHeight: 1,
  },
});

module.exports = ChartWeb;
