import { sendOtpFunction } from '../services/send-otp';
import { Text, Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { useAppNavigation } from '@/navigation/use-app-navigation';
import { useAuthStore } from '@/state/auth-store';
import Layout from '@/features/shared/layout';
import React from 'react';

export default function LoginScreen() {
  const loginAction = useAuthStore(state => state.login);
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useAppNavigation();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await sendOtpFunction({
        email,
      });
      if (response.success) {
        loginAction();
        navigation.navigate('AuthStack', {
          screen: 'CodeVerification',
          params: { email },
        });
        // navigation.navigate('MainTabs', { screen: 'Home' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout mode="view" containerStyle={{ justifyContent: 'center', gap: 8 }}>
      <Text
        variant="titleLarge"
        style={{ fontWeight: 'bold', textAlign: 'center' }}
      >
        Iniciar sesion
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Button mode="contained" onPress={handleSignIn}>
        {loading ? <ActivityIndicator /> : 'Sign In'}
      </Button>
    </Layout>
  );
}
