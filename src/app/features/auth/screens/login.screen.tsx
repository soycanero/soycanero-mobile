import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthStore } from '../../../state/auth-store';

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
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}
