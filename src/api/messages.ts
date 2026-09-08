import { request } from '@/api/client';
import type { Message } from '@/types/models';

type ApiMessage = {
  id: number;
  userId?: number;
  user_id?: number;
  title?: string;
  body?: string;
};
type PostsResponse = {
  total: number;
  limit: number;
  offset: number;
  results: ApiMessage[];
};

const toMessage = (post: ApiMessage): Message => ({
  id: post.id,
  userId: post.userId ?? post.user_id ?? 0,
  title: post.title ?? '',
  body: post.body ?? post.title ?? '',
  direction: 'incoming',
});

export async function fetchMessages(
  userId: number,
  signal?: AbortSignal,
): Promise<Message[]> {
  const searchParams = new URLSearchParams({
    userId: String(userId),
    limit: '100',
    offset: '0',
  });
  const payload = await request<PostsResponse>(
    `/posts?${searchParams.toString()}`,
    { signal },
  );

  return payload.results.map(toMessage);
}

export async function sendMessage(
  userId: number,
  body: string,
): Promise<Message> {
  const payload = await request<ApiMessage>('/posts', {
    method: 'POST',
    body: JSON.stringify({ userId, title: 'Message', body }),
  });
  return { ...toMessage({ ...payload, userId, body }), direction: 'outgoing' };
}
