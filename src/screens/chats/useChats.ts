import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { fetchUsers } from '@/api/users';
import type { RootStackParamList } from '@/types/navigation';
import type { User } from '@/types/models';

export const useChats = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const query = useInfiniteQuery({
    queryKey: ['users'],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) =>
      fetchUsers({ offset: pageParam, limit: 12, signal }),
    getNextPageParam: (lastPage, pages) => {
      const previousIds = new Set(
        pages.slice(0, -1).flatMap(page => page.items.map(user => user.id)),
      );
      const repeatedPage =
        !!lastPage.items.length &&
        lastPage.items.every(user => previousIds.has(user.id));
      return repeatedPage ? undefined : lastPage.nextOffset;
    },
  });

  const contacts = useMemo(() => {
    const unique = new Map(
      query.data?.pages
        .flatMap(page => page.items)
        .map(user => [user.id, user]),
    );
    return [...unique.values()];
  }, [query.data]);
  const openChat = useCallback(
    (user: User) => navigation.navigate('Chat', { user }),
    [navigation],
  );
  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
  }, [query]);

  return { ...query, contacts, openChat, loadMore };
};
