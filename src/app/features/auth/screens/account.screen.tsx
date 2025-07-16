import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthStore } from '../../../state/auth-store';

export default function AccountScreen() {
  const setUser = useAuthStore(state => state.setUser);

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
