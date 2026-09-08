import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/api/client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      retry: (failureCount, error) => {
        const isClientError =
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500;
        return !isClientError && failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});
