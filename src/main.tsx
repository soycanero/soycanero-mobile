import AppProvider from './app/providers/app-provider';
// import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './app/navigation/app-navigator';
import React from 'react';
import { customTheme } from './app/constants/theme';

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </PaperProvider>
  );
}
