import React from 'react';
// import auth from '@react-native-firebase/auth';
import { useAuthStore } from '../state/auth-store';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const setUser = useAuthStore(state => state.setUser);
  const setLoading = useAuthStore(state => state.setLoading);

  React.useEffect(() => {
    // const unsubscribe = auth().onAuthStateChanged(user => {
    // setUser({ name: 'Juan' });
    setLoading(false);
    // });
    // return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
