import {
  collection,
  FirebaseFirestoreTypes,
  getFirestore,
  onSnapshot,
  query,
} from '@react-native-firebase/firestore';
import { collections } from '@/constants/collections';
import { Message, MessageDoc } from '../types/message';

export const listenConversationMessages = (
  conversationId: string,
  setMessageInConversation: (conversationId: string, message: Message) => void,
) => {
  try {
    const collectionPath = `${collections.conversations}/${conversationId}/${collections.messages}`;

    const q = query(collection(getFirestore(), collectionPath));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('New message: ', change.doc.data());
            const newMessage = change.doc.data() as MessageDoc;
            const message: Message = {
              ...newMessage,
              createdAt: newMessage.createdAt.toDate(),
              id: change.doc.id,
            };
            setMessageInConversation(conversationId, message);
          }
        });
      },
    );
    return unsubscribe; // Return the unsubscribe function to stop listening when needed
  } catch (error) {
    console.error('Error listening to conversation messages:', error);
    throw error;
  }
};


