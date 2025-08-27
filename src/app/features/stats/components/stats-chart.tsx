/* eslint-disable react-native/no-inline-styles */
import { CartesianChart, Line } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { View } from 'react-native';
import React from 'react';

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  date: i,
  value: 4000 + 30 * Math.random(),
}));

export default function StatsChart() {
  const font = useFont(
    require('../../../../assets/fonts/Roboto-Regular.ttf'),
    12,
  );

  return (
    <View style={{ height: 200, borderWidth: 1, borderRadius: 8 }}>
      <CartesianChart
        data={DATA} // 👈 specify your data
        xKey="date" // 👈 specify data key for x-axis
        yKeys={['value']} // 👈 specify data keys used for y-axis
        axisOptions={{
          font,
          formatXLabel: xValue => `${xValue} jun`,
          formatYLabel: yValue => `$${yValue}`,
        }} // 👈 we'll generate axis labels using given font.
      >
        {/* 👇 render function exposes various data, such as points. */}
        {({ points }) => (
          // 👇 and we'll use the Line component to render a line path.
          <Line points={points.value} color="blue" strokeWidth={3} />
        )}
      </CartesianChart>
    </View>
  );
}
