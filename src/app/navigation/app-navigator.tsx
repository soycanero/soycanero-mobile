import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

// ===== Screens =====
// Onboarding
import WelcomeScreen from '../features/auth/screens/welcome.screen';
import LoginScreen from '../features/auth/screens/login.screen';
import CodeVerificationScreen from '../features/auth/screens/code-verification.screen';
import RegisterScreen from '../features/auth/screens/register.screen';

// Main
import HomeScreen from '../features/feed/screens/home.screen';
import ActivityScreen from '../features/activity/screens/activity.screen';
import AccountScreen from '../features/account/screens/account.screen';
import StatsScreen from '../features/stats/screens/stats.screen';

import { useAuthStore } from '../state/auth-store';
import {
  AccountStackParamList,
  ActivityStackParamList,
  HomeStackParamList,
  AuthStackParamList,
  RootStackParamList,
} from './types';

// ===== Stacks =====
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const ActivityStackNav = createNativeStackNavigator<ActivityStackParamList>();
const AccountStackNav = createNativeStackNavigator<AccountStackParamList>();
const Tab = createBottomTabNavigator();

// ===== Navigators =====
function AuthStackNavigator() {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen
        name="CodeVerification"
        component={CodeVerificationScreen}
      />
      <AuthStackNav.Screen name="Register" component={RegisterScreen} />
    </AuthStackNav.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="Home" component={HomeScreen} />
      <HomeStackNav.Screen name="Stats" component={StatsScreen} />
    </HomeStackNav.Navigator>
  );
}

function ActivityStackNavigator() {
  return (
    <ActivityStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ActivityStackNav.Screen name="Activity" component={ActivityScreen} />
    </ActivityStackNav.Navigator>
  );
}

function AccountStackNavigator() {
  return (
    <AccountStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AccountStackNav.Screen name="Account" component={AccountScreen} />
    </AccountStackNav.Navigator>
  );
}

function MainTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="ActivityTab"
        component={ActivityStackNavigator}
        options={{ title: 'Activity' }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStackNavigator}
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
}

// ===== Root Navigator =====
export default function AppNavigator() {
  const { authStatus, isInitialized, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!['guest', 'authenticated'].includes(authStatus) ? (
          <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
