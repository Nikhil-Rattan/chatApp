import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { ProfileScreen } from '@/screens/profile/profile';
import { SettingsScreen } from '@/screens/settings/settings';
import { useProfile } from '@/screens/profile/useProfile';
import { useSettings } from '@/screens/settings/useSettings';

jest.mock('@/screens/profile/useProfile');
jest.mock('@/screens/settings/useSettings');

const mockedUseProfile = jest.mocked(useProfile);
const mockedUseSettings = jest.mocked(useSettings);

describe('profile screen', () => {
  const props = {} as React.ComponentProps<typeof ProfileScreen>;

  it('renders contact details and toggles blocking', async () => {
    const toggleBlocked = jest.fn();
    mockedUseProfile.mockReturnValue({
      user: {
        id: 2,
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        phone: '+1 555',
        avatar: '',
      },
      isLoading: false,
      isError: false,
      isBlocked: false,
      toggleBlocked,
      refetch: jest.fn(),
    } as never);

    const screen = await render(<ProfileScreen {...props} />);
    expect(screen.getByText('Ada Lovelace')).toBeTruthy();
    expect(screen.getByText('ada@example.com')).toBeTruthy();
    await fireEvent.press(
      screen.getByRole('button', { name: 'Block Ada Lovelace' }),
    );
    expect(toggleBlocked).toHaveBeenCalledTimes(1);
  });

  it('shows a retry state when the profile request fails', async () => {
    const refetch = jest.fn();
    mockedUseProfile.mockReturnValue({
      isLoading: false,
      isError: true,
      refetch,
    } as never);
    const screen = await render(<ProfileScreen {...props} />);
    await fireEvent.press(screen.getByText('Try again'));
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});

describe('settings screen', () => {
  it('shows app metadata and the global blocked count', async () => {
    mockedUseSettings.mockReturnValue({
      appName: 'Relay Chat',
      version: '1.4.0',
      blockedCount: 3,
    });
    const screen = await render(<SettingsScreen />);
    expect(screen.getByText('Relay Chat')).toBeTruthy();
    expect(screen.getByText('1.4.0')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });
});
