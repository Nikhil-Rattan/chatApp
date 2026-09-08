import {
  createOptimisticMessage,
  replaceOptimisticMessage,
} from '@/screens/chat/optimistic';
import type { Message } from '@/types/models';

describe('optimistic chat messages', () => {
  it('creates a stable temporary outgoing message', () => {
    expect(createOptimisticMessage(4, 'On my way', 123)).toEqual({
      id: -123,
      userId: 4,
      title: '',
      body: 'On my way',
      direction: 'outgoing',
      pending: true,
    });
  });

  it('replaces only the confirmed optimistic message', () => {
    const pending = createOptimisticMessage(4, 'Hello', 123);
    const existing: Message = { id: 1, userId: 4, title: '', body: 'Earlier' };
    const confirmed: Message = {
      id: 44,
      userId: 4,
      title: '',
      body: 'Hello',
      direction: 'outgoing',
    };

    expect(
      replaceOptimisticMessage([existing, pending], pending.id, confirmed),
    ).toEqual([existing, { ...confirmed, id: pending.id, pending: false }]);
  });

  it('keeps distinct row keys when the mock API reuses its response id', () => {
    const first = createOptimisticMessage(4, 'First', 123);
    const second = createOptimisticMessage(4, 'Second', 124);
    const repeatedApiResponse: Message = {
      id: 101,
      userId: 4,
      title: 'Message',
      body: 'First',
      direction: 'outgoing',
    };

    const afterFirst = replaceOptimisticMessage(
      [first, second],
      first.id,
      repeatedApiResponse,
    );
    const afterSecond = replaceOptimisticMessage(afterFirst, second.id, {
      ...repeatedApiResponse,
      body: 'Second',
    });

    expect(afterSecond.map(message => message.id)).toEqual([-123, -124]);
    expect(afterSecond.map(message => message.body)).toEqual([
      'First',
      'Second',
    ]);
  });
});
