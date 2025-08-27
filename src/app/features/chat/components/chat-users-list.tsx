/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Button, Card, Text } from 'react-native-paper';
import { findOrCreateConversation } from '../services/find-or-create-conversation';
import { getChatUsers } from '../services/get-chat-users';
import { useAuthStore } from '@/state/auth-store';
import { User } from '@/features/shared/types/users';
import { View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

import { useNavigation } from '@react-navigation/native';

export default function ChatUsersList() {
  const userId = useAuthStore(state => state.firebaseUser?.uid);

  const [users, setUsers] = React.useState<User[]>([]);

  const navigation = useNavigation<any>();

  const fetchChatUsers = React.useCallback(async () => {
    try {
      if (!userId) {
        throw new Error('User id not found');
      }
      const chatUsersResponse = await getChatUsers(userId, 10);
      setUsers(chatUsersResponse.users);
    } catch (error) {
      console.error(error);
    }
  }, [setUsers, userId]);

  React.useEffect(() => {
    fetchChatUsers();
  }, [fetchChatUsers]);

  const handlePressUser = React.useCallback(
    (user: User) => async () => {
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      console.log('User pressed:', user);
      try {
        const conversation = await findOrCreateConversation({
          participants: [userId, user.id],
        });
        console.log(
          'Conversation created or found successfully with id',
          conversation.id,
        );
        navigation.navigate('Conversation', {
          conversationId: conversation.id,
        });
      } catch (error) {
        console.error('Error finding or creating conversation:', error);
      }
    },
    [navigation, userId],
  );

  return (
    <View>
      <FlatList
        data={users}
        ListHeaderComponent={() => (
          <>
            <Text variant="titleLarge">Users Available</Text>
            <Button mode="contained">Refresh Users</Button>
          </>
        )}
        ListHeaderComponentStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ paddingHorizontal: 16, paddingBottom: 8 }}
            onPress={handlePressUser(item)}
          >
            <Card
              style={{
                paddingVertical: 16,
                paddingHorizontal: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Svg height="40" width="40" viewBox="0 0 100 100">
                  <Circle cx="50" cy="50" r="40" fill="#ccc" />
                </Svg>
                <Text>{item.email}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
