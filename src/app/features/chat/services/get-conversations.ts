import {
  collection,
  FirebaseFirestoreTypes,
  getDocs,
  getFirestore,
  limit,
  query,
  startAfter,
  where,
} from '@react-native-firebase/firestore';
import { collections } from '@/constants/collections';
import { Conversation } from '../types/conversation';

export const getConversations = async (
  userId: string,
  limitSize = 10,
  lastDocSnapshot?: FirebaseFirestoreTypes.DocumentSnapshot,
) => {
  try {
    let q = query(
      collection(getFirestore(), collections.conversations),
      where('participants', 'array-contains', userId),
      limit(limitSize),
    );

    if (lastDocSnapshot) {
      q = query(
        collection(getFirestore(), collections.conversations),
        limit(limitSize),
        where('participants', 'array-contains', userId),
        startAfter(lastDocSnapshot),
      );
    }

    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot = await getDocs(
      q,
    );

    const conversations = querySnapshot.docs.map(
      doc => doc.data() as Conversation,
    );

    // Esto te sirve para la siguiente consulta (paginación)
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      conversations,
      lastVisible,
      hasMore: querySnapshot.size === limitSize,
    };
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw error;
  }
};
