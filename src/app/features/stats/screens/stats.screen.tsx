/* eslint-disable react-native/no-inline-styles */
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import Layout from '@/features/shared/layout';
import React from 'react';
import StatsChart from '../components/stats-chart';

export default function StatsScreen() {
  return (
    <Layout mode="scroll">
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>
          Stats Screen
        </Text>
        <Text>Testing libs</Text>

        <StatsChart />
      </View>
    </Layout>
  );
}
