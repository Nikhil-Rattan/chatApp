import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchMessages, sendMessage } from '@/api/messages';
import { useBlockStore } from '@/store/useBlockStore';
import {
  createOptimisticMessage,
  replaceOptimisticMessage,
} from '@/screens/chat/optimistic';
import type { Message } from '@/types/models';
import type { RootStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const useChat = ({ route, navigation }: Props) => {
  const user = route.params.user;
  const [text, setText] = useState('');
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => ['messages', user.id] as const, [user.id]);
  const isBlocked = useBlockStore(state => !!state.blockedUserIds[user.id]);

  const query = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchMessages(user.id, signal),
  });
  const mutation = useMutation({
    mutationFn: (body: string) => sendMessage(user.id, body),
    onMutate: async body => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Message[]>(queryKey) ?? [];
      const optimistic = createOptimisticMessage(user.id, body);
      queryClient.setQueryData<Message[]>(queryKey, [...previous, optimistic]);
      return { previous, optimisticId: optimistic.id };
    },
    onError: (_error, _body, context) =>
      queryClient.setQueryData(queryKey, context?.previous),
    onSuccess: (message, _body, context) => {
      queryClient.setQueryData<Message[]>(queryKey, old =>
        replaceOptimisticMessage(old ?? [], context.optimisticId, message),
      );
    },
  });

  const submit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isBlocked || mutation.isPending) return;
    setText('');
    mutation.mutate(trimmed);
  }, [isBlocked, mutation, text]);
  const openProfile = useCallback(
    () =>
      navigation.navigate('Profile', { userId: user.id, initialUser: user }),
    [navigation, user],
  );

  return {
    ...query,
    user,
    text,
    setText,
    submit,
    openProfile,
    isBlocked,
    isSending: mutation.isPending,
  };
};
