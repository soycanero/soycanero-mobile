/* eslint-disable react-native/no-inline-styles */
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import StatsSectionCard from './stats-section-card';

export default function StatsHomeSection() {

  const navigation = useNavigation<any>();

  const handleGoSeeAll = () => {
    navigation.navigate('Stats');
  };
  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: 'black',
        }}
      >
        <Text variant="titleMedium">Indicadores</Text>
        <TouchableOpacity onPress={handleGoSeeAll}>
          <Text variant="titleMedium">Ver todos</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginHorizontal: 8,
          flexDirection: 'row',
        }}
      >
        {/* Card */}
        {[1, 2, 3].map(cardId => (
          <StatsSectionCard key={`stats-section-card-${cardId}`} />
        ))}
        {/* Card */}
      </ScrollView>
    </View>
  );
}
