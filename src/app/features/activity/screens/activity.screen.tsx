/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { Card, Text } from 'react-native-paper';
import { Chat, Users } from 'phosphor-react-native';
import { primaryColor } from '@/constants/theme';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@/features/shared/layout';
import React from 'react';

const SECTIONS = [
  { title: 'Conversations', screen: 'Conversations', icon: Chat },
  { title: 'Users', screen: 'ChatUsers', icon: Users },
];

export default function ActivityScreen() {
  const navigation = useNavigation<any>();

  const handlePressSection = React.useCallback(
    (screen: string) => () => {
      console.log('Pressed section:', screen);
      navigation.navigate(screen);
    },
    [navigation],
  );

  return (
    <Layout mode="view">
      <View>
        <Text
          variant="displaySmall"
          style={{ fontWeight: 'bold', paddingHorizontal: 16 }}
        >
          Activity Screen
        </Text>
        <View
          style={{
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Text variant="titleLarge" style={{ paddingHorizontal: 16 }}>
            Select an option to start chatting
          </Text>
          {SECTIONS.map(section => (
            <TouchableOpacity
              key={section.screen}
              onPress={handlePressSection(section.screen)}
              style={{
                paddingHorizontal: 16,
              }}
            >
              <Card
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      backgroundColor: '#eee',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {React.createElement(section.icon, {
                      size: 30,
                      color: primaryColor,
                    })}
                  </View>
                  <Text variant="titleSmall">{section.title}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Layout>
  );
}
