import { ActivityIndicator } from 'react-native-paper';
import { useAuthStore } from '@/state/auth-store';
import { View } from 'react-native';
import React from 'react';

export default function AppProvider(props: React.PropsWithChildren) {
  const { initialize, isInitialized } = useAuthStore();

  React.useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{props.children}</>;
}
