/* eslint-disable react/no-unstable-nested-components */
import { Button, Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import React from 'react';

export default function ConversationsList() {
  return (
    <View>
      <FlatList
        data={[]}
        ListHeaderComponent={() => (
          <>
            <Text variant="titleLarge">Conversations List</Text>
            <Button mode="contained">Refresh Conversations</Button>
          </>
        )}
        renderItem={() => null}
        // keyExtractor={item => item.id}
      />
    </View>
  );
}
