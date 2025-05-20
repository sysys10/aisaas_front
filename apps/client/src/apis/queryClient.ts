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
        if (data.status === 999 || data.status === 401) {
          window.location.href = '/logout/redirect'
        }
      },
      retry: 0
    }
  }
})
