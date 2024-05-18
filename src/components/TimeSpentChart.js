import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ChartView from './HighChart.js';

const TimeSpentChart = ({ testResult }) => {
  // const { testResult } = props;
  let [chartOptions, setChartOptions] = useState(null);
  let [showdata, setData] = useState(true);
  let [chartConfig, setChartConfig] = useState(null);
  let [spinner, setspinner] = useState(true);

  useEffect(() => {
    if (testResult) {
      if (testResult?.length > 0) {
        let labels = [];
        let idealTimeData = [];
        let spentTimeData = [];
        let spentTimeColors = [];
        testResult?.forEach((tq, i) => {
          labels.push(`${i + 1} (${tq.markAllocation}M)`);
          idealTimeData.push(Math.abs(tq.actualDuration));
          spentTimeData.push(Math.abs(tq.timeTaken));
          const color =
            tq.analysis === 'Lost' ||
            tq.analysis === 'Un Answered' ||
            tq.analysis === 'Extra Time'
              ? '#f94d48'
              : '#a3ba6d';
          spentTimeColors.push(color);
        });

        const conf = {
          chart: {
            type: 'bar',
            animation: {
              duration: 100,
            },
            style: {
              fontFamily: 'Roboto, sans-serif',
            },
          },
          title: {
            text: '',
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            categories: labels,
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
          },
          exporting: {
            enabled: false,
          },
          fill: {
            colors: ['#a14321', '#307698'],
          },
          yAxis: {
            title: {
              text: 'Seconds',
            },
            labels: {
              formatter() {
                return `${value}s`;
              },
            },
          },
          series: [
            {
              name: 'Time Spent',
              data: spentTimeData,
              colorByPoint: true,
              colors: spentTimeColors,
            },
            { name: 'Ideal Optimized Time', data: idealTimeData },
          ],
        };
        const options = {
          global: {
            useUTC: false,
          },
          lang: {
            decimalPoint: ',',
            thousandsSep: '.',
          },
        };
        setChartOptions(options);
        setChartConfig(conf);
        setspinner(false);
      } else {
        setspinner(false);
        setData(false);
      }
    }
  }, [testResult]);

  var headfont = 12,
    smallbox = 10;

  return spinner ? (
    <Text style={{ textAlign: 'center', fontSize: headfont }}>Loading....</Text>
  ) : showdata ? (
    <View>
      {/* <ChartWeb
        style={{ height: testResult?.length * 150, flex: 1 }}
        height={testResult?.length * 150}
        config={chartConfig}
        options={chartOptions}
        originWhitelist={['*']}
      /> */}
      <ChartView
        style={{ height: testResult?.length * 150 }}
        height={testResult?.length * 150}
        config={chartConfig}
        options={chartOptions}
        originWhitelist={['*']}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marignLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: smallbox,
              height: smallbox,
              backgroundColor: '#7CB5EC',
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: headfont }}>IDEAL TIME</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: smallbox,
              height: smallbox,
              backgroundColor: '#A3BA6D',
              alignItems: 'center',
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: headfont }}>CORRECT</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marignLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: smallbox,
              height: smallbox,
              backgroundColor: '#F94D48',
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: headfont }}>IN CORRECT</Text>
        </View>
      </View>
    </View>
  ) : (
    <Text style={{ textAlign: 'center', fontSize: headfont }}>No Data</Text>
  );
};

export default TimeSpentChart;
