import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import StatsSectionCard from './stats-section-card';
// import { useAppNavigation } from '../../../navigation/use-app-navigation';
import { useNavigation } from '@react-navigation/native';

export default function StatsHomeSection() {
  // const navigation = useAppNavigation();
  const navigation = useNavigation<any>()

  const handleGoSeeAll = () => {
    navigation.navigate('Stats')
    // navigation.navigate('MainTabs', {
    //   screen: 'HomeStack',
    //   params: {
    //     screen: 'Stats',
    //   },
    // });
  };
  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text variant="titleMedium">Indicadores</Text>
        <TouchableOpacity onPress={handleGoSeeAll}>
          <Text variant="titleMedium">Ver todos</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          overflow: 'scroll',
          flexDirection: 'row',
          gap: 8,
        }}
      >
        {/* Card */}
        {[1, 2, 3].map(cardId => (
          <StatsSectionCard key={`stats-section-card-${cardId}`} />
        ))}
        {/* Card */}
      </View>
    </View>
  );
}
