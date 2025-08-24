/* eslint-disable react-native/no-inline-styles */
import { screenHeight, screenWidth } from '@/constants/app';
import { Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';

import Layout from '@/features/shared/layout';
import { useThemeStore } from '@/state/theme-store';

export default function WelcomeScreen({ navigation }: any) {
  const setBarStyle = useThemeStore(state => state.setBarStyle);

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  useLayoutEffect(() => {
    setBarStyle('dark-content');
  });

  return (
    <Layout mode="view" containerStyle={{ justifyContent: 'flex-end' }}>
      <View>
        {/* Title */}
        <View
          style={{
            // borderWidth: 1,
            width: '100%',
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
            Bienvenido a Soy Cañero
          </Text>
        </View>
        {/* Carousel */}
        <View
          style={{
            // borderWidth: 1,
            height: screenHeight * 0.5,
            width: '100%',
          }}
        >
          <View
            style={{
              paddingVertical: 16,
              width: screenWidth,
              aspectRatio: 3 / 2,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Carousel</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: '100%',
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#D9D9D9',
                borderRadius: '100%',
              }}
            />
            <Text variant="bodyLarge">
              Beneficio de su perfil en soy cañero #1
            </Text>
          </View>
        </View>
        {/* Actions */}
        <View
          style={{
            borderWidth: 1,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 24,
            // flex: 1,
          }}
        >
          <Button onPress={handleGoToLogin} mode="contained">
            <Text variant="titleMedium">Iniciar Sesión</Text>
          </Button>
          <Text variant="titleMedium">¿No tienes cuenta? Regístrate</Text>
          {/* <Text variant="titleMedium">Ingresar como Invitado</Text> */}
          <Button onPress={handleGoToLogin}>
            <Text variant="titleMedium">Ingresar como Invitado</Text>
          </Button>
        </View>
      </View>
    </Layout>
  );
}
