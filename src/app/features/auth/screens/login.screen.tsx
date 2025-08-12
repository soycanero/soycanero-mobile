import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '../../../state/auth-store';
import { Text, Button } from 'react-native-paper';

export default function LoginScreen() {
  const loginAction = useAuthStore(state => state.login);
  // const loginAsAGuestAction = useAuthStore(state => state.loginAsAGuest);

  const handleSignIn = () => {
    loginAction();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button onPress={handleSignIn}>Sign In</Button>
    </View>
  );
}
