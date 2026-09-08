import React from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';

import { QueryLifecycle } from '@/api/QueryLifecycle';

describe('React Query native lifecycle', () => {
  it('tracks app focus, connectivity, and removes subscriptions', async () => {
    let appStateListener: (status: AppStateStatus) => void = () => undefined;
    let networkListener: (state: { isConnected: boolean }) => void = () =>
      undefined;
    const removeAppState = jest.fn();
    const removeNetwork = jest.fn();
    jest
      .spyOn(AppState, 'addEventListener')
      .mockImplementation((_type, listener) => {
        appStateListener = listener;
        return { remove: removeAppState };
      });
    jest.mocked(NetInfo.addEventListener).mockImplementation(listener => {
      networkListener = listener as typeof networkListener;
      return removeNetwork;
    });
    const setFocused = jest.spyOn(focusManager, 'setFocused');
    const setOnline = jest.spyOn(onlineManager, 'setOnline');

    const screen = await render(<QueryLifecycle />);
    appStateListener('background');
    networkListener({ isConnected: false });
    expect(setFocused).toHaveBeenLastCalledWith(false);
    expect(setOnline).toHaveBeenLastCalledWith(false);

    await screen.unmount();
    expect(removeAppState).toHaveBeenCalledTimes(1);
    expect(removeNetwork).toHaveBeenCalledTimes(1);
  });
});
