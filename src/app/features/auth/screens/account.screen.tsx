import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '../../../state/auth-store';
import { Text, Button } from 'react-native-paper';

export default function AccountScreen() {
  const setUser = useAuthStore(state => state.setUser);

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account Screen</Text>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
}
