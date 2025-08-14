// types/navigation.ts
import { NavigatorScreenParams } from '@react-navigation/native';

// --- Stacks internos ---
export type HomeStackParamList = {
  Home: undefined;
  Stats: undefined;
};

export type ActivityStackParamList = {
  Activity: undefined;
};

export type AccountStackParamList = {
  Account: undefined;
};

// --- Tabs principales ---
export type MainTabsParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ActivityStack: NavigatorScreenParams<ActivityStackParamList>;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
};

// --- Onboarding stack ---
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CodeVerification: { email: string };
  Register: undefined;
};

// --- Root stack ---
export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};
