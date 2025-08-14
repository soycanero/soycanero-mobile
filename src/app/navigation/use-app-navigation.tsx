import {
  NavigationProp,
  useNavigation as useNativeNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from './types';

export const useAppNavigation = () =>
  useNativeNavigation<NavigationProp<RootStackParamList>>();
