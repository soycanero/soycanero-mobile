import EncryptedStorage from 'react-native-encrypted-storage';
import { create } from 'zustand';
import { localStorageKeys } from '../constants/local-storage';

type AuthStatus =
  | 'unauthenticated'
  | 'waiting-code'
  | 'in-register'
  | 'guest'
  | 'authenticated';

interface AuthStore {
  authStatus: AuthStatus;
  login: () => Promise<void>;
  loginAsAGuest: () => Promise<void>;
  verifyCode: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  isInitialized: boolean;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(set => ({
  authStatus: 'unauthenticated',
  isInitialized: false,

  loginAsAGuest: async () => {
    const status: AuthStatus = 'guest';
    await EncryptedStorage.setItem(localStorageKeys.USER_TYPE, status);
    set({ authStatus: status });
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
    const status: AuthStatus = 'unauthenticated';
    await EncryptedStorage.setItem(localStorageKeys.USER_TYPE, status);
    set({ authStatus: 'unauthenticated' });
  },

  initialize: async () => {
    const type = await EncryptedStorage.getItem(localStorageKeys.USER_TYPE);
    set({
      authStatus: (type as AuthStatus) ?? 'unauthenticated',
      isInitialized: true,
    });
  },
}));
