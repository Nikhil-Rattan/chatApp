import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { AnimatedEntrance } from '@/components/AnimatedEntrance';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';
import { ScreenState } from '@/components/ScreenState';

describe('shared components', () => {
  it('runs a retry action from an error state', async () => {
    const retry = jest.fn();
    const screen = await render(
      <ScreenState
        title="Offline"
        message="Reconnect to continue"
        onRetry={retry}
      />,
    );

    expect(screen.getByText('Offline')).toBeTruthy();
    expect(screen.getByText('Reconnect to continue')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button'));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('renders loading without an actionable retry', async () => {
    const screen = await render(<ScreenState loading onRetry={jest.fn()} />);
    expect(screen.getByText('Loading…')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('recovers from an unexpected render error', async () => {
    let shouldThrow = true;
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const RecoverableChild = () => {
      if (shouldThrow) throw new Error('Render failed');
      return <Text>Recovered content</Text>;
    };

    const screen = await render(
      <AppErrorBoundary>
        <RecoverableChild />
      </AppErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeTruthy();

    shouldThrow = false;
    await fireEvent.press(screen.getByText('Recover'));
    expect(await screen.findByText('Recovered content')).toBeTruthy();
    consoleError.mockRestore();
  });

  it('keeps content visible when Reduce Motion is enabled', async () => {
    const screen = await render(
      <AnimatedEntrance>
        <Text>Accessible motion</Text>
      </AnimatedEntrance>,
    );
    await waitFor(() =>
      expect(screen.getByText('Accessible motion')).toBeTruthy(),
    );
  });
});
