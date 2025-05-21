import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { AICFOMutation } from '@types'

export const handleGlobalError = (error: AxiosError) => {
  if (error.status === 401) {
    window.location.href = '/pc/logout/redirect'
    return
  }
}

export type MutationConfig<TData = unknown, TVariables = void> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
> & {
  mutationFn: (variables: TVariables) => Promise<TData>
}

export const createMutation = <TData = unknown, TVariables = void>(
  config: MutationConfig<TData, TVariables>
): AICFOMutation<TData, TVariables> => {
  // const queryClient = useQueryClient()

  return useMutation({
    ...config,
    onError: (error: AxiosError, variables: TVariables, context: unknown) => {
      handleGlobalError(error)
      config.onError?.(error, variables, context)
    },
    onSuccess: (data: TData, variables: TVariables, context: unknown) => {
      // if (config.mutationKey) {
      //   queryClient.invalidateQueries({ queryKey: config.mutationKey })
      // }
      config.onSuccess?.(data, variables, context)
    }
  }) as AICFOMutation<TData, TVariables>
}
