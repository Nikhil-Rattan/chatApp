import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from '@/navigation/AppNavigator';
import { navigationTheme } from '@/theme/theme';
import { queryClient } from '@/api/queryClient';
import { QueryLifecycle } from '@/api/QueryLifecycle';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';

const App = () => (
  <AppErrorBoundary>
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <QueryLifecycle />
        <NavigationContainer theme={navigationTheme}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  </AppErrorBoundary>
);

export default App;
