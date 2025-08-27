import {
  FirebaseFirestoreTypes,
  getFirestore,
  query,
  collection,
  where,
  limit,
  getDocs,
  startAfter,
} from '@react-native-firebase/firestore';
import { collections } from '@/constants/collections';
import { User, UserDoc } from '@/features/shared/types/users';

export const getChatUsers = async (
  userId: string,
  limitSize = 10,
  lastDocSnapshot?: FirebaseFirestoreTypes.DocumentSnapshot,
) => {
  try {
    let q = query(
      collection(getFirestore(), collections.users),
      where('id', '!=', userId),
      limit(limitSize),
    );

    // // Si hay un documento desde el cual continuar, aplicamos paginación
    if (lastDocSnapshot) {
      q = query(
        collection(getFirestore(), collections.users),
        where('id', '!=', userId),
        limit(limitSize),
        startAfter(lastDocSnapshot),
      );
    }

    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot = await getDocs(
      q,
    );

    const users = querySnapshot.docs.map(doc => userMap(doc.data() as UserDoc));

    // Esto te sirve para la siguiente consulta (paginación)
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      users,
      lastVisible, // úsalo para la siguiente llamada a `getChatUsers`
      hasMore: querySnapshot.size === limitSize,
    };
  } catch (error) {
    console.error('Error getting paginated users:', error);
    throw error;
  }
};

const userMap = (user: UserDoc): User => ({
  ...user,
  createdAt: user.createdAt.toDate(),
});
