import { StatusBarStyle } from 'react-native';
import { create } from 'zustand';

interface ThemeStore {
  barStyle: StatusBarStyle;
  setBarStyle: (mode: StatusBarStyle) => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  barStyle: 'light-content',
  setBarStyle: (mode: StatusBarStyle) => {
    set({ barStyle: mode });
  },
}));
