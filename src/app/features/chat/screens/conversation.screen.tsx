/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../../state/theme-store';
import { useChatStore } from '../../../state/chat-store';
import { ActivityStackParamList } from '../../../navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Message } from '../types/message';
import { useAuthStore } from '../../../state/auth-store';
import { getConversation } from '../services/get-conversation';
import { sendMessage } from '../services/send-message';
import { listenConversationMessages } from '../services/listen-conversation-messages';
import { Text } from 'react-native-paper';

type ConversationRouteProp = RouteProp<ActivityStackParamList, 'Conversation'>;

export default function ConversationScreen() {
  const route = useRoute<ConversationRouteProp>();
  const { conversationId } = route.params;
  const barStyle = useThemeStore(state => state.barStyle);
  const messages = useChatStore(
    state => state.conversations[conversationId]?.messages,
  );
  const setConversation = useChatStore(state => state.setConversation);
  const setMessageInConversation = useChatStore(
    state => state.setMessageInConversation,
  );
  const userId = useAuthStore(state => state.firebaseUser?.uid);

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!userId) {
      console.warn('User ID is not available');
      return;
    }
    if (!inputText.trim()) return;
    await sendMessage(conversationId, {
      text: inputText,
      conversationId,
      senderId: userId,
      type: 'text',
    });
    setInputText('');
  };

  const fetchConversation = React.useCallback(async () => {
    if (messages && messages.length > 0) {
      // Si ya tenemos mensajes, no necesitamos volver a cargar la conversación
      return;
    }
    const conversationFetched = await getConversation(conversationId);
    if (!conversationFetched) {
      console.warn('Conversation not found');
      return;
    }
    setConversation(conversationFetched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  React.useEffect(() => {
    fetchConversation();

    // Scroll to the bottom when the component mounts
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });

    const listener = listenConversationMessages(
      conversationId,
      setMessageInConversation,
    );

    return () => {
      listener(); // Detener la escucha cuando el componente se desmonte
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }: { item: Message }) => {
    const isMine = item.senderId === userId;
    return (
      <View
        style={[
          styles.messageBubble,
          isMine ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={{ color: isMine ? 'white' : 'black' }}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={barStyle} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
            }}
          >
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              inverted
              // scrollEnabled
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-end',
                padding: 12,
              }}
              style={{ flex: 1 }}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Escribe un mensaje..."
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
                blurOnSubmit={false}
                returnKeyType="send"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 12,
  },
  myMessage: {
    backgroundColor: '#326400ff',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#4fbd0bff',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});
