import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const customTheme: ThemeProp = {
  
  ...DefaultTheme,
  // Specify custom property
  // myOwnProperty: true,
  // Specify custom property in nested object
  // mode: 
  colors: {
    ...DefaultTheme.colors,
    primary: '#D9D9D9'
    // myOwnColor: '#BADA55',
  },
};
