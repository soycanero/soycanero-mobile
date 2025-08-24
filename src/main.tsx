import { customTheme } from '@/constants/theme';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from '@/navigation/app-navigator';
import AppProvider from '@/providers/app-provider';
import React from 'react';

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </PaperProvider>
  );
}
