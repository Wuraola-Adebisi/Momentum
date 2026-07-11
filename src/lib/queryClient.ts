// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

/**
 * Single QueryClient instance for the app. Server state (applications,
 * notes, interviews, activity log) is cached and synced through this.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
    },
  },
});