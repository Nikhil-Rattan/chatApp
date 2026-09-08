import Config from 'react-native-config';
import { useMemo } from 'react';
import { useBlockStore } from '@/store/useBlockStore';

export const useSettings = () => {
  const blockedUserIds = useBlockStore(state => state.blockedUserIds);
  const blockedCount = useMemo(
    () => Object.keys(blockedUserIds).length,
    [blockedUserIds],
  );

  return {
    appName: Config.APP_NAME || 'Relay Chat',
    version: Config.APP_VERSION || '1.0.0',
    blockedCount,
  };
};
