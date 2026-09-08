import { fetchMessages, sendMessage } from '@/api/messages';
import { fetchUser, fetchUsers } from '@/api/users';

const mockFetch = jest.fn();

beforeAll(() => {
  globalThis.fetch = mockFetch as typeof fetch;
});

beforeEach(() => mockFetch.mockReset());

const response = (body: unknown, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response);

describe('users API', () => {
  it('normalizes an offset-paginated users response', async () => {
    mockFetch.mockReturnValue(
      response({
        total: 3,
        limit: 1,
        offset: 1,
        results: [
          {
            id: 7,
            first_name: 'Ada',
            last_name: 'Lovelace',
            email: 'ada@example.com',
            avatar: 'avatar',
          },
        ],
      }),
    );

    await expect(fetchUsers({ offset: 1, limit: 1 })).resolves.toEqual({
      items: [
        {
          id: 7,
          name: 'Ada Lovelace',
          email: 'ada@example.com',
          phone: 'Phone unavailable',
          avatar: 'avatar',
        },
      ],
      nextOffset: 2,
    });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.test/api/users?limit=1&offset=1',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('stops pagination after the final result', async () => {
    mockFetch.mockReturnValue(
      response({
        total: 3,
        limit: 1,
        offset: 2,
        results: [{ id: 9, name: 'Final user' }],
      }),
    );

    await expect(fetchUsers({ offset: 2, limit: 1 })).resolves.toMatchObject({
      nextOffset: undefined,
    });
  });

  it('encodes the documented search query parameter', async () => {
    mockFetch.mockReturnValue(
      response({ total: 0, limit: 12, offset: 0, results: [] }),
    );

    await fetchUsers({ query: 'Ada Lovelace' });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.test/api/users?limit=12&offset=0&q=Ada+Lovelace',
      expect.any(Object),
    );
  });

  it('supports a wrapped profile response', async () => {
    mockFetch.mockReturnValue(
      response({ data: { id: 4, name: 'Grace Hopper', phone: '+1 555' } }),
    );
    const user = await fetchUser(4);
    expect(user).toMatchObject({
      id: 4,
      name: 'Grace Hopper',
      phone: '+1 555',
    });
  });

  it('throws a typed error for non-success responses', async () => {
    mockFetch.mockReturnValue(response({}, 503));
    await expect(fetchUsers()).rejects.toEqual(
      expect.objectContaining({ status: 503 }),
    );
  });
});

describe('messages API', () => {
  it('reads the documented posts results and requests the full user history', async () => {
    mockFetch.mockReturnValue(
      response({
        total: 2,
        limit: 100,
        offset: 0,
        results: [
          { id: 1, userId: 2, title: 'Hello', body: 'First' },
          { id: 2, userId: 2, title: 'Again', body: 'Second' },
        ],
      }),
    );

    await expect(fetchMessages(2)).resolves.toHaveLength(2);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.test/api/posts?userId=2&limit=100&offset=0',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('posts a message and marks the confirmed result outgoing', async () => {
    mockFetch.mockReturnValue(response({ id: 101, userId: 2, body: 'Hi' }));
    const message = await sendMessage(2, 'Hi');

    expect(message).toMatchObject({
      id: 101,
      userId: 2,
      body: 'Hi',
      direction: 'outgoing',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.test/api/posts',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ userId: 2, title: 'Message', body: 'Hi' }),
      }),
    );
  });
});
