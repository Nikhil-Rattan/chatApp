module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-screens|react-native-safe-area-context|@shopify/flash-list|@tanstack/react-query|zustand)/)',
  ],
  moduleNameMapper: {
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    '^@react-native-vector-icons/ionicons$':
      '<rootDir>/__mocks__/vector-icons.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
