import {
  addDoc,
  collection,
  FieldValue,
  getFirestore,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { collections } from '@/constants/collections';
import { CreateConversationDto } from '../types/conversation';

export const createConversation = async (dto: CreateConversationDto) => {
  try {
    const collectionRef = collection(getFirestore(), collections.conversations);

    const conversationRef = await addDoc(collectionRef, {
      ...dto,
      isTyping: false,
      createdAt: serverTimestamp() as FieldValue,
      lastMessage: null,
    });

    return {
      ref: conversationRef,
      id: conversationRef.id,
    };
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};
