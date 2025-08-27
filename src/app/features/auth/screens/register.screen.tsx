import { Text } from 'react-native-paper';
import { View } from 'react-native';
import Layout from '@/features/shared/layout';
import React from 'react';

export default function RegisterScreen() {
  return (
    <Layout mode="scroll">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Register Screen</Text>
      </View>
    </Layout>
  );
}
