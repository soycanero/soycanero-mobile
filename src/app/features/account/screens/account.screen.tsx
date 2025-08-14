import React from 'react';
import { View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { useAuthStore } from '../../../state/auth-store';
import { getAuth, signOut } from '@react-native-firebase/auth';

export default function AccountScreen() {
  const [loading, setLoading] = React.useState(false);
  const logoutAction = useAuthStore(state => state.logout);
  const firebaseUser = useAuthStore(state => state.firebaseUser);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signOut(auth);
      console.log('User signed out!');
      logoutAction();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Text variant="titleLarge">Account Screen</Text>
      <Text>{firebaseUser?.email}</Text>

      <Button mode="contained" onPress={handleSignOut} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : 'Sign Out'}
      </Button>
    </View>
  );
}
