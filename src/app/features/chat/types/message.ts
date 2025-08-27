import { Timestamp } from '@react-native-firebase/firestore';

interface MessageBase {
  id: string;
  text: string;
  conversationId: string;
  senderId: string;
  type: 'text' | 'image' | 'file';
  mediaUrl?: string;
  metadata?: MessageMetadata;
  readBy: string[];
  deliveredTo: string[];
}

export interface MessageDoc extends MessageBase {
  createdAt: Timestamp;
}

export interface Message extends MessageBase {
  createdAt: Date;
}

export interface MessageMetadata {
  preview?: string;
  fileSize?: number;
  filename?: string;
  mimeType?: string;
}

export interface CreateMessageDto {
  text: string;
  conversationId: string;
  senderId: string;
  type: 'text' | 'image' | 'file';
  mediaUrl?: string;
  metadata?: MessageMetadata;
}
