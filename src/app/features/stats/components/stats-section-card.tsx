/* eslint-disable react-native/no-inline-styles */
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function StatsSectionCard() {
  const width = Dimensions.get('screen').width * 0.65;
  const navigation = useNavigation<any>();

  const handleGoToStat = () => {
    navigation.navigate('Stats');
  };

  return (
    <TouchableOpacity
      onPress={handleGoToStat}
      style={{
        paddingHorizontal: 8,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          height: 80,
          overflow: 'hidden',
          width,
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'grey',
            // borderRadius: 200,
          }}
        />
        <View style={{}}>
          <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>
            $111,097
          </Text>
          <Text variant="titleSmall">Azucar/Quintal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
