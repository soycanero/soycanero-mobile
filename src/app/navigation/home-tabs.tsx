/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/feed/screens/home.screen';
import ActivityScreen from '../features/feed/screens/activity.screen';
import MessagesScreen from '../features/chat/screens/messages.screen';
import AccountScreen from '../features/auth/screens/account.screen';
import { useAuthStore } from '../state/auth-store';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { user } = useAuthStore();

  const Protected = ({ children }: { children: React.ReactNode }) => {
    const navigation = useNavigation<any>();
    if (!user) {
      return (
        <>
          <Text style={{ marginTop: 50, textAlign: 'center' }}>
            Inicia sesión para acceder
          </Text>
          <Button
            title="Iniciar sesion"
            onPress={() => navigation.navigate('Login')}
          />
        </>
      );
    }
    return <>{children}</>;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen
        name="Messages"
        children={() => (
          <Protected>
            <MessagesScreen />
          </Protected>
        )}
      />
      <Tab.Screen
        name="Account"
        children={() => (
          <Protected>
            <AccountScreen />
          </Protected>
        )}
      />
    </Tab.Navigator>
  );
}
