import {
  QueryKey,
  UseMutateFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { DefaultResponse } from './domain'

// 기본 응답 타입 정의
export type APIResponse<T = unknown> = DefaultResponse & {
  body: T
}

// Mutation 결과 타입
export type MutationResult<TData, TVariables = void> = {
  mutate: UseMutateFunction<TData, AxiosError, TVariables>
  isLoading: boolean
  isError: boolean
  error: AxiosError | null
  isSuccess: boolean
  data: TData | undefined
}

// Mutation 옵션 타입
export type MutationOptions<TData, TVariables = void> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables, unknown>,
  'mutationFn'
> & {
  mutationKey?: QueryKey
}

// API 요청 함수 타입
export type MutationFunction<TData, TVariables> = (
  variables: TVariables
) => Promise<TData>

// 최종 Mutation 타입
export type AICFOMutation<TData = unknown, TVariables = void> = ReturnType<
  typeof useMutation<TData, AxiosError, TVariables, unknown>
>

// Mutation 설정 타입 (createMutation 유틸리티용)
export type CreateMutationOptions<TData, TVariables = void> = {
  mutationFn: MutationFunction<TData, TVariables>
  options?: MutationOptions<TData, TVariables>
}

// Query 관련 타입들도 추가
export type QueryOptions<TData, TVariables = void> = Omit<
  UseQueryOptions<TData, AxiosError, TVariables>,
  'queryKey' | 'queryFn'
> & {
  queryKey: QueryKey
}

// 이전 타입과의 호환성을 위한 타입
export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = void
> = MutationOptions<TData, TVariables>
