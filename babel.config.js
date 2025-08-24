module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@/assets': './src/assets',
          '@/constants': './src/app/constants',
          '@/features': './src/app/features',
          '@/navigation': './src/app/navigation',
          '@/providers': './src/app/providers',
          '@/state': './src/app/state',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
