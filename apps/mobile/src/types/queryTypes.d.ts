import { UseMutateFunction, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { SearchAnswerResponse } from './search'

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, unknown, TVariables, unknown>,
  'mutationFn'
>

type searchMutationType = UseMutateFunction<
  SearchAnswerResponse,
  AxiosError<AxiosError<unknown, any>, any>,
  string,
  unknown
>
export type { UseMutationCustomOptions, searchMutationType }
