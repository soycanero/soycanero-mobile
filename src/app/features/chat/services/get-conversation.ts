import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { collections } from '../../../constants/collections';
import {
  Conversation,
  ConversationDoc,
  ConversationWithMessages,
} from '../types/conversation';

export const getConversation = async (
  conversationId: string,
): Promise<ConversationWithMessages | null> => {
  try {
    const collectionPath = `${collections.conversations}/${conversationId}`;

    const conversationRef = doc(getFirestore(), collectionPath);

    const conversationSnapshot = await getDoc(conversationRef);

    if (!conversationSnapshot.exists) {
      console.warn('Conversation not found:', conversationId);
      return null;
    }
    const conversationData = conversationSnapshot.data() as ConversationDoc;
    const conversation: Conversation = mapConversationDoc(conversationData);

    return {
      ...conversation,
      messages: [], // Inicialmente no tenemos mensajes, se pueden cargar después
    };
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

const mapConversationDoc = (docData: ConversationDoc): Conversation => {
  return {
    id: docData.id,
    participants: docData.participants,
    lastMessage: undefined,
    createdAt: docData.createdAt.toDate(),
    isTyping: docData.isTyping || false,
  };
};
