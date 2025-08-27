import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';
import { create } from 'zustand';
import { localStorageKeys } from '@/constants/local-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

type AuthStatus =
  | 'unauthenticated'
  | 'waiting-code'
  | 'in-register'
  | 'guest'
  | 'authenticated';

interface AuthStore {
  authStatus: AuthStatus;
  firebaseUser: FirebaseAuthTypes.User | null;
  isInitialized: boolean;
  login: () => Promise<void>;
  loginAsAGuest: () => Promise<void>;
  verifyCode: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(set => ({
  authStatus: 'unauthenticated',
  firebaseUser: null,
  isInitialized: false,

  loginAsAGuest: async () => {
    const status: AuthStatus = 'guest';
    await EncryptedStorage.setItem(localStorageKeys.USER_TYPE, status);
    set({ authStatus: 'guest', firebaseUser: null });
  },

  login: async () => {
    const status: AuthStatus = 'waiting-code';
    await EncryptedStorage.setItem(localStorageKeys.USER_TYPE, status);
    set({ authStatus: status });
  },

  verifyCode: async () => {
    // TODO: Add logic for register
    // const status: AuthStatus = 'in-register';
    const status: AuthStatus = 'authenticated';
    await EncryptedStorage.setItem(localStorageKeys.USER_TYPE, status);
    set({ authStatus: status });
  },

  register: async () => {
    const status: AuthStatus = 'authenticated';
    await EncryptedStorage.setItem(localStorageKeys.USER_TYPE, status);
    set({ authStatus: status });
  },

  logout: async () => {
    const auth = getAuth();
    await signOut(auth);
    await EncryptedStorage.removeItem(localStorageKeys.USER_TYPE);
    set({ authStatus: 'unauthenticated', firebaseUser: null });
  },

  initialize: async () => {
    const storedType = await EncryptedStorage.getItem(
      localStorageKeys.USER_TYPE,
    );

    const auth = getAuth();
    // Escuchamos cambios de Firebase
    onAuthStateChanged(auth, user => {
      if (user) {
        set({
          firebaseUser: user,
          authStatus: 'authenticated',
          isInitialized: true,
        });
      } else if (storedType === 'guest') {
        set({ firebaseUser: null, authStatus: 'guest', isInitialized: true });
      } else {
        set({
          firebaseUser: null,
          authStatus: 'unauthenticated',
          isInitialized: true,
        });
      }
    });
  },
}));
