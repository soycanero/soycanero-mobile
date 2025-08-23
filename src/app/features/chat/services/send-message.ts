import {
  addDoc,
  collection,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from '@react-native-firebase/firestore';
import { CreateMessageDto, MessageDoc } from '../types/message';
import { collections } from '../../../constants/collections';

export const sendMessage = async (
  conversationId: string,
  message: CreateMessageDto,
) => {
  try {
    const messageCollectionPath = `${collections.conversations}/${conversationId}/${collections.messages}`;

    const messageDoc: Omit<MessageDoc, 'id'> = {
      ...message,
      createdAt: Timestamp.now(),
      deliveredTo: [message.senderId],
      readBy: [message.senderId],
    };

    const collectionRef = collection(getFirestore(), messageCollectionPath);

    await addDoc(collectionRef, messageDoc);

    await updateDoc(
      doc(getFirestore(), collections.conversations, conversationId),
      {
        lastMessage: messageDoc,
        updatedAt: Timestamp.now(),
      },
    );
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
