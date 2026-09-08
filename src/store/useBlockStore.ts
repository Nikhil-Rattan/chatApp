import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BlockState = {
  blockedUserIds: Record<number, true>;
  toggleBlocked: (userId: number) => void;
};

export const useBlockStore = create<BlockState>()(
  persist(
    set => ({
      blockedUserIds: {},
      toggleBlocked: userId =>
        set(state => {
          const next = { ...state.blockedUserIds };
          if (next[userId]) delete next[userId];
          else next[userId] = true;
          return { blockedUserIds: next };
        }),
    }),
    {
      name: 'blocked-contacts',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ blockedUserIds: state.blockedUserIds }),
    },
  ),
);
