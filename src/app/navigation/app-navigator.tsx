import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../features/auth/screens/welcome.screen';
import LoginScreen from '../features/auth/screens/login.screen';
import RegisterScreen from '../features/auth/screens/register.screen';
import HomeTabs from './home-tabs';
import { useAuthStore } from '../state/auth-store';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </>
      ) : (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      )}
    </Stack.Navigator>
  );
}
