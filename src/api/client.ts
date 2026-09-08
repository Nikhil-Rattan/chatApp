import Config from 'react-native-config';

const baseUrl = Config.API_BASE_URL?.replace(/\/$/, '');

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!baseUrl) {
    throw new Error('API_BASE_URL is missing. Add it to the .env file.');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}
