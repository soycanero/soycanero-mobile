import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '../../../state/auth-store';
import { Text, Button } from 'react-native-paper';

export default function LoginScreen() {
  const setUser = useAuthStore(state => state.setUser);

  const handleSignIn = () => {
    setUser({
      name: 'Juan',
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button onPress={handleSignIn}>Sign In</Button>
    </View>
  );
}
