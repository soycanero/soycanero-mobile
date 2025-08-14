import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Layout from '../../shared/layout';

export default function RegisterScreen() {
  return (
    <Layout mode="scroll">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Register Screen</Text>
      </View>
    </Layout>
  );
}
