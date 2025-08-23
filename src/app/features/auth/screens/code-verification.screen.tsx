/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Platform, StyleSheet, TextInputProps, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import Layout from '../../shared/layout';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { verifyOtpFunction } from '../services/verify-otp';
import { useAuthStore } from '../../../state/auth-store';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppNavigation } from '../../../navigation/use-app-navigation';
import { AuthStackParamList } from '../../../navigation/types';
import { signIn } from '../services/sign-in';

const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps['autoComplete']>({
  android: 'sms-otp',
  default: 'one-time-code',
});

type CodeVerificationRouteProp = RouteProp<
  AuthStackParamList,
  'CodeVerification'
>;

// type CodeVerificationNavigationProp = NativeStackNavigationProp<
//   AuthStackParamList,
//   'CodeVerification'
// >;

export default function CodeVerificationScreen() {
  const navigation = useAppNavigation();
  const route = useRoute<CodeVerificationRouteProp>();

  const { email } = route.params;
  const verifyCodeAction = useAuthStore(state => state.verifyCode);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      const response = await verifyOtpFunction({
        email,
        otp: value,
      });
      if (response.token) {
        // TODO: Do auth with Fb Auth

        await signIn({ token: response.token });
        verifyCodeAction();
        navigation.navigate('MainTabs', {
          screen: 'HomeStack',
          params: { screen: 'Home' },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout mode="view">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          Ingresa el codigo enviado
        </Text>
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          a tu correo electronico
        </Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={autoComplete}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused && <Cursor />)}
            </Text>
          )}
        />
        <Button mode="contained" onPress={handleVerifyCode}>
          {loading ? <ActivityIndicator /> : 'Sign In'}
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#000', // text color
  },
  focusCell: {
    borderColor: '#000',
  },
});
