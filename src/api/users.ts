import { request } from '@/api/client';
import type { Page, User } from '@/types/models';

type ApiUser = {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

type UsersResponse = {
  total: number;
  limit: number;
  offset: number;
  results: ApiUser[];
};

type FetchUsersOptions = {
  offset?: number;
  limit?: number;
  query?: string;
  signal?: AbortSignal;
};

const toUser = (user: ApiUser): User => ({
  id: user.id,
  name:
    user.name ??
    ([user.first_name, user.last_name].filter(Boolean).join(' ') ||
      `User ${user.id}`),
  email: user.email ?? 'Email unavailable',
  phone: user.phone ?? 'Phone unavailable',
  avatar: user.avatar ?? `https://i.pravatar.cc/160?img=${(user.id % 70) + 1}`,
});

export async function fetchUsers({
  offset = 0,
  limit = 12,
  query,
  signal,
}: FetchUsersOptions = {}): Promise<Page<User>> {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (query?.trim()) searchParams.set('q', query.trim());

  const payload = await request<UsersResponse>(
    `/users?${searchParams.toString()}`,
    { signal },
  );
  const nextOffset = payload.offset + payload.results.length;

  return {
    items: payload.results.map(toUser),
    nextOffset: nextOffset < payload.total ? nextOffset : undefined,
  };
}

export async function fetchUser(
  userId: number,
  signal?: AbortSignal,
): Promise<User> {
  const payload = await request<ApiUser | { data: ApiUser }>(
    `/users/${userId}`,
    { signal },
  );
  return toUser('data' in payload ? payload.data : payload);
}
