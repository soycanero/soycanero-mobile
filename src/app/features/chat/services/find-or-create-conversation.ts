import {
  getFirestore,
  collection,
  where,
  limit,
  getDocs,
  query,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { collections } from '@/constants/collections';
import { createConversation } from './create-conversation';
import { CreateConversationDto } from '../types/conversation';

export const findOrCreateConversation = async (dto: CreateConversationDto) => {
  try {
    const firestore = getFirestore();

    // Primero, buscamos si ya existe una conversación con los participantes
    const q = query(
      collection(firestore, collections.conversations),
      where('participants', 'array-contains-any', dto.participants),
      limit(1),
    );
    const existingConversations: FirebaseFirestoreTypes.QuerySnapshot =
      await getDocs(q);

    if (!existingConversations.empty) {
      // Si encontramos una conversación existente, retornamos su referencia
      const conversationDoc = existingConversations.docs[0];
      return {
        ref: conversationDoc.ref,
        id: conversationDoc.id,
      };
    }
    // Si no existe, creamos una nueva conversación
    const newConversation = await createConversation(dto);
    return newConversation;
  } catch (error) {
    console.error('Error finding or creating conversation:', error);
    throw error;
  }
};
