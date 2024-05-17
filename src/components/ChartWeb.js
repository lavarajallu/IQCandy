import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const ChartWeb = (props) => {
  const win = Dimensions.get('window');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const dummyData = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Dummy Column Chart',
      },
      xAxis: {
        categories: ['Category 1', 'Category 2', 'Category 3'],
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          name: 'Series 1',
          data: [3, 7, 2],
        },
        {
          name: 'Series 2',
          data: [5, 2, 8],
        },
      ],
    };
    const initHtml = `<html>
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
          props.stock
            ? '<script src="https://code.highcharts.com/stock/highstock.js"></script>'
            : '<script src="https://code.highcharts.com/highcharts.js"></script>'
        }
        ${
          props.more
            ? '<script src="https://code.highcharts.com/highcharts-more.js"></script>'
            : ''
        }
        ${
          props.guage
            ? '<script src="https://code.highcharts.com/modules/solid-gauge.js"></script>'
            : ''
        }
      </head>
      <body>
        <div id="container"></div>
      </body>
      <script>
        $(function () {
          Highcharts.chart('container', ${JSON.stringify(dummyData)});
          Highcharts.setOptions(${JSON.stringify(props.options)});
        })
      </script>
    </html>`;

    setHtml(initHtml);
  }, [props.config, props.options, props.stock, props.more, props.guage]);

  const reRenderWebView = (e) => {
    // Handle layout changes if needed
  };

  return (
    <SafeAreaView style={props.style}>
      <WebView
        androidLayerType='hardware'
        onLayout={reRenderWebView}
        source={{ html: html, baseUrl: 'web/' }}
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit
        scrollEnabled={false}
        automaticallyAdjustContentInsets
        height={500}
        {...props}
      />
    </SafeAreaView>
  );
};

export default ChartWeb;
