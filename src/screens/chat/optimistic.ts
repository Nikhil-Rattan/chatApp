import type { Message } from '@/types/models';

export const createOptimisticMessage = (
  userId: number,
  body: string,
  timestamp = Date.now(),
): Message => ({
  id: -timestamp,
  userId,
  title: '',
  body,
  direction: 'outgoing',
  pending: true,
});

export const replaceOptimisticMessage = (
  messages: Message[],
  optimisticId: number,
  confirmed: Message,
) =>
  messages.map(message =>
    message.id === optimisticId
      ? { ...confirmed, id: optimisticId, pending: false }
      : message,
  );
