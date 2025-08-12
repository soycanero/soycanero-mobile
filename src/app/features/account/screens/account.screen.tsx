import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuthStore } from '../../../state/auth-store';

export default function AccountScreen() {
  const logoutAction = useAuthStore(state => state.logout);

  const handleSignOut = () => {
    logoutAction();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account Screen</Text>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
}
