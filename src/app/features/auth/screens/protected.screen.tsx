import { Text, Button } from 'react-native-paper';
import { useAuthStore } from '@/state/auth-store';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function ProtectedScreen(props: React.PropsWithChildren) {
  const { authStatus } = useAuthStore();

  const navigation = useNavigation<any>();

  if (authStatus !== 'authenticated') {
    return (
      <>
        <Text style={{ marginTop: 50, textAlign: 'center' }}>
          Inicia sesión para acceder
        </Text>
        <Button onPress={() => navigation.navigate('Login')}>
          Iniciar sesion
        </Button>
      </>
    );
  }
  return <>{props.children}</>;
}
