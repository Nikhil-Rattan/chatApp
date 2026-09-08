import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchUser } from '@/api/users';
import { useBlockStore } from '@/store/useBlockStore';
import type { RootStackParamList } from '@/types/navigation';

export const useProfile = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Profile'>) => {
  const { userId, initialUser } = route.params;
  const isBlocked = useBlockStore(state => !!state.blockedUserIds[userId]);
  const toggleBlocked = useBlockStore(state => state.toggleBlocked);
  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: ({ signal }) => fetchUser(userId, signal),
    placeholderData: initialUser,
  });

  return {
    ...query,
    user: query.data,
    isBlocked,
    toggleBlocked: () => toggleBlocked(userId),
  };
};
