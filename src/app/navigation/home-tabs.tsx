/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/feed/screens/home.screen';
import ActivityScreen from '../features/feed/screens/activity.screen';
import MessagesScreen from '../features/chat/screens/messages.screen';
import AccountScreen from '../features/auth/screens/account.screen';
import ProtectedScreen from '../features/auth/screens/protected.screen';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen
        name="Messages"
        children={() => (
          <ProtectedScreen>
            <MessagesScreen />
          </ProtectedScreen>
        )}
      />
      <Tab.Screen
        name="Account"
        children={() => (
          <ProtectedScreen>
            <AccountScreen />
          </ProtectedScreen>
        )}
      />
    </Tab.Navigator>
  );
}
