import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido</Text>
      <Button title="Continuar" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
