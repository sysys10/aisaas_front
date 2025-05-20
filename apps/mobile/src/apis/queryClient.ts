import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0
    },
    mutations: {
      onError: (error) => {
        throw error
      },
      retry: 0
    }
  }
})
