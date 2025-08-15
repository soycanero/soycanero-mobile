import { Dimensions, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
// import { useAppNavigation } from '../../../navigation/use-app-navigation';
import { useNavigation } from '@react-navigation/native';

export default function StatsSectionCard() {
  const width = Dimensions.get('screen').width * 0.65;
  // const navigation = useAppNavigation();
  const navigation = useNavigation<any>();

  const handleGoToStat = () => {
    navigation.navigate('Stats');
    // navigation.navigate('MainTabs', {
    //   screen: 'HomeStack',
    //   params: {
    //     screen: 'Stats',
    //   },
    // });
  };

  return (
    <TouchableOpacity onPress={handleGoToStat}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#000',
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
