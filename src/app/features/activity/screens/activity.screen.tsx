import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Layout from '../../shared/layout';
import ChatUsersList from '../../chat/components/chat-users-list';

export default function ActivityScreen() {
  return (
    <Layout mode="view">
      <View>
        <Text
          variant="displaySmall"
          style={{ fontWeight: 'bold', paddingHorizontal: 16 }}
        >
          Activity Screen
        </Text>
        <ChatUsersList />
      </View>
    </Layout>
  );
}
