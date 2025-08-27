import type { SvgProps as DefaultSvgProps } from 'react-native-svg';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare module 'react-native-svg' {
  interface SvgProps extends DefaultSvgProps {
    className?: string;
  }
}