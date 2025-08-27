import { Timestamp } from '@react-native-firebase/firestore';
import { Message, MessageDoc } from './message';

export interface ConversationBase {
  id: string;
  participants: string[];
  isTyping: boolean;
}

export interface ConversationDoc extends ConversationBase {
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  lastMessage?: MessageDoc;
}

export interface Conversation extends ConversationBase {
  createdAt: Date;
  lastMessage?: Message;
}

export interface CreateConversationDto {
  participants: string[];
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}
