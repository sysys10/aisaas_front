// apps/client/src/apis/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1
    },
    mutations: {
      onSuccess: (data: any) => {
        // 400 unauthorized
        if (data.status === 999 || data.status === 400) {
          window.location.href = '/pc/logout/redirect'
        }
      },
      retry: 0
    }
  }
})
