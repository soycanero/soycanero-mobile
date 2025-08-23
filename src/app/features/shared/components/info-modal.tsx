import React from 'react';
import { View } from 'react-native';
import { useModalStore } from '../../../state/modal-store';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

export default function InfoModal({ navigation }: any) {
  const modalStore = useModalStore(state => state);

  const handleClose = React.useCallback(() => {
    modalStore.closeModal();
    navigation.goBack();
  }, [modalStore, navigation]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (modalStore.timeToClose) {
      timer = setTimeout(() => {
        handleClose();
      }, modalStore.timeToClose);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [handleClose, modalStore.timeToClose]);

  if (modalStore.type === 'loading') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (modalStore.type === 'info') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {modalStore.infoMessage && <Text>{modalStore.infoMessage}</Text>}
        <Button onPress={handleClose}>Cerrar</Button>
      </View>
    );
  }

  if (modalStore.type === null) {
    handleClose();
    return null;
  }
}
