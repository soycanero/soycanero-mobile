import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Layout from '../../shared/layout';
import Animated, { withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

export default function StatsScreen() {
  const size = useSharedValue(100);

  const handleIncrement = () => {
    size.value = withSpring(size.value + 50);
  };

  const handleDecrement = () => {
    size.value = withSpring(size.value - 50);
  };

  React.useEffect(() => {
    setInterval(() => {
      if (size.value >= 150) {
        handleDecrement();
      } else {
        handleIncrement();
      }
    }, 1500);
  }, []);

  return (
    <Layout mode="scroll">
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>
          Stats Screen
        </Text>
        <Text>Testing libs</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Animated.View
            style={{
              borderRadius: 16,
              width: size,
              height: size,
              backgroundColor: 'violet',
            }}
          />
        </View>
      </View>
    </Layout>
  );
}
