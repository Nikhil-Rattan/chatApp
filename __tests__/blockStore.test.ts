import AsyncStorage from '@react-native-async-storage/async-storage';

import { useBlockStore } from '@/store/useBlockStore';

beforeEach(() => {
  jest.clearAllMocks();
  useBlockStore.setState({ blockedUserIds: {} });
});

describe('block store', () => {
  it('blocks and unblocks contacts independently', () => {
    const { toggleBlocked } = useBlockStore.getState();
    toggleBlocked(3);
    toggleBlocked(8);
    expect(useBlockStore.getState().blockedUserIds).toEqual({
      3: true,
      8: true,
    });

    toggleBlocked(3);
    expect(useBlockStore.getState().blockedUserIds).toEqual({ 8: true });
  });

  it('does not mutate the previous state object', () => {
    const previous = useBlockStore.getState().blockedUserIds;
    useBlockStore.getState().toggleBlocked(5);
    expect(useBlockStore.getState().blockedUserIds).not.toBe(previous);
  });

  it('persists blocked contacts to device storage', async () => {
    useBlockStore.getState().toggleBlocked(5);
    await Promise.resolve();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'blocked-contacts',
      JSON.stringify({ state: { blockedUserIds: { 5: true } }, version: 0 }),
    );
  });
});
