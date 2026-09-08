import { useEffect } from 'react';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';

export const QueryLifecycle = () => {
  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', status => {
      focusManager.setFocused(status === 'active');
    });
    const networkSubscription = NetInfo.addEventListener(state => {
      onlineManager.setOnline(state.isConnected === true);
    });

    return () => {
      appStateSubscription.remove();
      networkSubscription();
    };
  }, []);

  return null;
};
