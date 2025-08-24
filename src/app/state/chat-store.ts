import {
  Conversation,
  ConversationWithMessages,
} from '@/features/chat/types/conversation';
import { ChatUser } from '@/features/chat/types/chat-user';
import { create } from 'zustand';
import { Message } from '@/features/chat/types/message';

interface ChatStore {
  chatUsers: ChatUser[];
  conversations: Record<Conversation['id'], ConversationWithMessages>;
  setChatUsers: (users: ChatUser[]) => void;
  setConversation: (conversation: ConversationWithMessages) => void;
  setConversations: (conversations: ConversationWithMessages[]) => void;
  setMessageInConversation: (conversationId: string, message: Message) => void;
}

export const useChatStore = create<ChatStore>(set => ({
  chatUsers: [],
  conversations: {},

  setChatUsers: (users: ChatUser[]) => set({ chatUsers: users }),

  setConversation: (conversation: ConversationWithMessages) =>
    set(state => ({
      conversations: {
        ...state.conversations,
        [conversation.id]: conversation,
      },
    })),

  setConversations: (conversations: ConversationWithMessages[]) => {
    const conversationsMap = conversations.reduce((acc, conversation) => {
      acc[conversation.id] = conversation;
      return acc;
    }, {} as Record<Conversation['id'], ConversationWithMessages>);

    set({ conversations: conversationsMap });
  },

  setMessageInConversation: (conversationId: string, message: Message) =>
    set(state => {
      const currentMessages =
        state.conversations[conversationId]?.messages || [];

      // Verificar si el mensaje ya existe por ID
      const alreadyExists = currentMessages.some(m => m.id === message.id);
      if (alreadyExists) return state;

      return {
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [message, ...currentMessages],
            lastMessage: message,
          },
        },
      };
    }),
}));
