import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const primaryColor = '#68B766';
export const secondaryColor = '#1B545A';
export const tertiaryColor = '#EC6231';

export const darkColor = '#1A203D';
export const lightColor = '#F5F5F5';
export const errorColor = '#B00020';
export const warningColor = '#F9A825';
export const successColor = '#4CAF50';
export const infoColor = '#2196F3';
export const greyColor = '#C5C5C5';
export const darkGreyColor = '#9f9f9fff';

export const customTheme: ThemeProp = {
  ...DefaultTheme,
  // Specify custom property
  // myOwnProperty: true,
  // Specify custom property in nested object
  // mode:
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    // myOwnColor: '#BADA55',
  },
};

export const tabBarActiveColor = secondaryColor;
export const tabBarInactiveColor = darkGreyColor;
