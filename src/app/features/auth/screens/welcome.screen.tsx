import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido</Text>
      <Button onPress={() => navigation.navigate('Login')} >Continuar</Button>
    </View>
  );
}
