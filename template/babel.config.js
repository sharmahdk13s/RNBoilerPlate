module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
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
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@redux': './src/redux',
          '@constants': './src/constants',
          '@navigations': './src/navigations',
          '@hooks': './src/hooks',
          '@models': './src/models',
        },
      },
      'react-native-worklets/plugin',
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
