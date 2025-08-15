import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Layout from '../../shared/layout';
import { useThemeStore } from '../../../state/theme-store';
import StatsHomeSection from '../../stats/components/stats-home-section';

export default function HomeScreen() {
  const setBarStyle = useThemeStore(state => state.setBarStyle);

  React.useEffect(() => {
    setBarStyle('dark-content');
  }, []);

  return (
    <Layout mode="scroll">
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>
          Hola Usuario
        </Text>
      </View>
      <StatsHomeSection />
    </Layout>
  );
}
